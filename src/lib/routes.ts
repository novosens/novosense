export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];
export const routes = {
  home: { cs: '/', en: '/en/' },
  products: { cs: '/produkty/', en: '/en/products/' },
  datahub: { cs: '/produkty/datahub/', en: '/en/products/datahub/' },
  tickets: { cs: '/produkty/dame-listky/', en: '/en/products/dame-listky/' },
  about: { cs: '/o-nas/', en: '/en/about/' },
  contact: { cs: '/kontakt/', en: '/en/contact/' },
  legal: { cs: '/pravni-informace/', en: '/en/legal/' },
  privacy: { cs: '/ochrana-osobnich-udaju/', en: '/en/privacy/' },
  cookies: { cs: '/cookies/', en: '/en/cookies/' },
} as const;
export type Page = keyof typeof routes;
export const pages = Object.keys(routes) as Page[];
export const href = (page: Page, locale: Locale) => routes[page][locale];
export const otherLocale = (locale: Locale): Locale =>
  locale === 'cs' ? 'en' : 'cs';
