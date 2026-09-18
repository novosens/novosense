import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  CONSENT_KEY,
  CONSENT_LIFETIME,
  parseConsent,
} from '../src/scripts/consent';

async function interceptGoogle(page: Page) {
  const requests: string[] = [];
  await page.route(
    /https:\/\/(?:www\.)?(?:googletagmanager\.com|google-analytics\.com)\//,
    async (route) => {
      requests.push(route.request().url());
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: '',
      });
    },
  );
  return requests;
}
test('stored consent is validated conservatively', () => {
  const now = 1000;
  for (const value of [
    null,
    '',
    '{}',
    'broken',
    '{"choice":"accepted","expires":999}',
    '{"choice":"accepted","expires":"99999"}',
    JSON.stringify({ choice: 'accepted', expires: now + CONSENT_LIFETIME + 1 }),
  ])
    expect(parseConsent(value, now)).toBeNull();
  expect(
    parseConsent(JSON.stringify({ choice: 'accepted', expires: 2000 }), now)
      ?.choice,
  ).toBe('accepted');
});
test('no request before consent, rejection persists across languages', async ({
  page,
}) => {
  const requests = await interceptGoogle(page);
  await page.goto('/');
  await expect(page.locator('[data-consent-panel]')).toBeVisible();
  expect(requests).toEqual([]);
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.locator('[data-consent-choice="rejected"]').click();
  await page.goto('/en/products/datahub/');
  await expect(page.locator('[data-consent-panel]')).toBeHidden();
  expect(requests).toEqual([]);
});
test('acceptance loads once, strips URL details, withdrawal removes cookies and survives reload', async ({
  page,
}) => {
  const requests = await interceptGoogle(page);
  await page.goto('/?email=private@example.test#secret');
  await page.locator('[data-consent-choice="accepted"]').click();
  await expect.poll(() => requests.length).toBe(1);
  const configuration = await page.evaluate(() =>
    Array.from(
      (window as unknown as { dataLayer: IArguments[] }).dataLayer.find(
        (entry) => entry[0] === 'config',
      )!,
    ),
  );
  expect(configuration[2]).toMatchObject({
    page_location: 'http://127.0.0.1:4322/',
    allow_google_signals: false,
    cookie_update: false,
  });
  await page.locator('[data-consent-open]').first().click();
  await page.locator('[data-consent-choice="accepted"]').click();
  expect(requests).toHaveLength(1);
  await page.evaluate(() => {
    document.cookie = '_ga=sample; Path=/';
    document.cookie = '_ga_TEST=sample; Path=/';
  });
  await page.locator('[data-consent-open]').first().click();
  await page.locator('[data-consent-choice="rejected"]').click();
  await page.waitForLoadState('load');
  await expect
    .poll(() => page.locator('script[data-analytics]').count())
    .toBe(0);
  expect(await page.evaluate(() => document.cookie)).not.toContain('_ga');
  await page.reload();
  await expect(page.locator('[data-consent-panel]')).toBeHidden();
  expect(requests).toHaveLength(1);
});
test('accepted consent persists; expired consent does not load analytics', async ({
  page,
}) => {
  const requests = await interceptGoogle(page);
  await page.goto('/');
  await page.locator('[data-consent-choice="accepted"]').click();
  await expect.poll(() => requests.length).toBe(1);
  await page.goto('/en/');
  await expect.poll(() => requests.length).toBe(2);
  await expect(page.locator('[data-consent-panel]')).toBeHidden();
  await page.evaluate(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({ choice: 'accepted', expires: Date.now() - 1 }),
      ),
    CONSENT_KEY,
  );
  await page.reload();
  await expect(page.locator('[data-consent-panel]')).toBeVisible();
  expect(requests).toHaveLength(2);
});
test('close does not grant consent and keyboard can reopen settings', async ({
  page,
}) => {
  const requests = await interceptGoogle(page);
  await page.goto('/en/');
  await page.locator('[data-consent-close]').click();
  expect(requests).toEqual([]);
  await expect(page.locator('[data-consent-panel]')).toBeHidden();
  await page.locator('[data-consent-open]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-consent-choice="accepted"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-consent-open]')).toBeFocused();
});
test('blocked storage fails safely', async ({ page }) => {
  const requests = await interceptGoogle(page);
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('blocked', 'SecurityError');
      },
    }),
  );
  await page.goto('/');
  await expect(page.locator('[data-consent-panel]')).toBeVisible();
  expect(requests).toEqual([]);
  await page.locator('[data-consent-choice="accepted"]').click();
  await expect.poll(() => requests.length).toBe(1);
  await page.reload();
  await expect(page.locator('[data-consent-panel]')).toBeVisible();
  expect(requests).toHaveLength(1);
});
test('withdrawal in another tab stops an already active page', async ({
  page,
  context,
}) => {
  await interceptGoogle(page);
  await page.goto('/');
  await page.locator('[data-consent-choice="accepted"]').click();
  const second = await context.newPage();
  const secondRequests = await interceptGoogle(second);
  await second.goto('/en/');
  await expect.poll(() => secondRequests.length).toBe(1);
  await page.locator('[data-consent-open]').click();
  await page.locator('[data-consent-choice="rejected"]').click();
  await expect
    .poll(() => second.locator('script[data-analytics]').count())
    .toBe(0);
  await expect(second.locator('[data-consent-panel]')).toBeHidden();
});
