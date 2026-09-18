import { routes, pages, locales } from '../lib/routes';
export function GET() {
  const origin = 'https://novosense.cz';
  const entries = pages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${origin}${routes[page][locale]}</loc>${locales.map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${origin}${routes[page][lang]}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${origin}${routes[page].cs}"/></url>`,
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
