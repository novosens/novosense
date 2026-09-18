import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { copy } from '../src/content/site';
import { routes, pages, locales } from '../src/lib/routes';

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, shape(item)]),
    );
  expect(typeof value).toBe('string');
  expect(value).not.toBe('');
  return typeof value;
}
test('translations have equivalent complete structures', () => {
  expect(shape(copy.cs)).toEqual(shape(copy.en));
});

for (const locale of locales) {
  test(`${locale}: every content page is accessible, local, and switches to its counterpart`, async ({
    page,
  }) => {
    const externalRequests: string[] = [];
    page.on('request', (request) => {
      if (!request.url().startsWith('http://127.0.0.1:4321/'))
        externalRequests.push(request.url());
    });
    for (const key of pages) {
      await page.goto(routes[key][locale]);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.language-switch')).toHaveAttribute(
        'href',
        routes[key][locale === 'cs' ? 'en' : 'cs'],
      );
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect
        .soft(
          results.violations.map((item) => ({
            id: item.id,
            nodes: item.nodes.map((node) => ({
              target: node.target,
              summary: node.failureSummary,
            })),
          })),
          `${locale}/${key}: accessibility`,
        )
        .toEqual([]);
      await expect(page.locator('[data-consent-panel]')).toHaveCount(0);
    }
    expect(externalRequests).toEqual([]);
  });
}
test('mobile pages fit, menu works and language switch preserves product', async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of locales) {
      for (const key of pages) {
        await page.goto(routes[key][locale]);
        if (
          locale === 'cs' &&
          [390, 1440].includes(width) &&
          ['home', 'datahub', 'tickets', 'about'].includes(key)
        ) {
          await page.screenshot({
            path: `test-results/previews/${key}-${width}.png`,
            fullPage: true,
          });
        }
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${width}px ${locale}/${key}: overflow`,
        ).toBe(true);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/produkty/datahub/');
  await page.locator('.mobile-nav summary').click();
  await expect(page.locator('.mobile-nav nav')).toBeVisible();
  await page.locator('.language-switch').click();
  await expect(page).toHaveURL(/\/en\/products\/datahub\/$/);
  await page.locator('.mobile-nav summary').click();
  await page
    .locator('.mobile-nav nav')
    .getByRole('link', { name: 'Contact', exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/contact\/$/);
});
test('core navigation works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await page.locator('.mobile-nav summary').click();
  await page
    .locator('.mobile-nav nav')
    .getByRole('link', { name: 'Produkty', exact: true })
    .click();
  await expect(page).toHaveURL(/\/produkty\/$/);
  await page.locator('.product-link').first().click();
  await expect(page).toHaveURL(/\/produkty\/datahub\/$/);
  await context.close();
});
test('not-found, skip link and contact invitations', async ({ page }) => {
  await page.goto('/404.html');
  await expect(
    page.getByRole('heading', { name: 'Page not found.' }),
  ).toBeVisible();
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.goto('/kontakt/');
  await expect(page.locator('.contact-topics a').first()).toHaveAttribute(
    'href',
    /mailto:info@novosense.cz\?subject=.+/,
  );
});
