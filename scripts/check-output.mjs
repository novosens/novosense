import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(join(dir, entry.name))
          : join(dir, entry.name),
      ),
    )
  ).flat();
}
const files = (await walk('dist')).filter((file) => file.endsWith('.html'));
assert.equal(files.length, 19, '18 content pages, 1 not-found page');
let contentPages = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  assert.match(html, /<html lang="(?:cs|en)"/);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${file}: exactly one h1`,
  );
  const notFound = file === 'dist/404.html';
  if (!notFound) {
    contentPages++;
    assert.match(html, /rel="canonical"/);
    for (const lang of ['cs', 'en', 'x-default'])
      assert.ok(
        html.includes(`hreflang="${lang}"`),
        `${file}: alternate ${lang}`,
      );
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /property="og:image"/);
    assert.ok(
      !html.includes('data-measurement-id'),
      'Default build must have analytics disabled',
    );
  }
  if (notFound) assert.match(html, /name="robots" content="noindex"/);
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (!value.startsWith('/') && !value.startsWith('https://novosense.cz/'))
      continue;
    const url = new URL(value, 'https://novosense.cz');
    const target = join(
      'dist',
      decodeURIComponent(url.pathname),
      url.pathname.endsWith('/') ? 'index.html' : '',
    );
    assert.ok(
      await stat(target).catch(() => false),
      `${file}: missing ${target}`,
    );
  }
}
assert.equal(contentPages, 18);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<url>/g) ?? []).length, 18);
assert.ok(!sitemap.includes('/404'));
assert.equal((await readFile('dist/CNAME', 'utf8')).trim(), 'novosense.cz');
console.log(
  'Static output verified: 18 localized pages, metadata, sitemap, local links and assets.',
);
