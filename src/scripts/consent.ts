// Basic consent mode: no Google script or requests before affirmative consent.
export const CONSENT_KEY = 'novosense.analytics-consent.v1';
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
type Choice = 'accepted' | 'rejected';
type Consent = { choice: Choice; expires: number };
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean;
};

export function parseConsent(
  raw: string | null,
  now = Date.now(),
): Consent | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (
      (value?.choice === 'accepted' || value?.choice === 'rejected') &&
      Number.isFinite(value.expires) &&
      value.expires > now &&
      value.expires <= now + CONSENT_LIFETIME
    )
      return value;
  } catch {
    /* Invalid or blocked storage must never imply consent. */
  }
  return null;
}

export function initializeConsent() {
  const panel = document.querySelector<HTMLElement>('[data-consent-panel]');
  if (!panel) return;
  const id = panel.dataset.measurementId;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;
  const win = window as unknown as AnalyticsWindow;
  let loaded = false;
  let expiresTimer: ReturnType<typeof setTimeout> | undefined;
  let returnFocus: HTMLElement | null = null;
  let current: Consent | null = null;

  function read() {
    try {
      return parseConsent(localStorage.getItem(CONSENT_KEY));
    } catch {
      return null;
    }
  }
  function clearCookies() {
    const parts = location.hostname.split('.');
    const domains = [
      '',
      ...parts
        .map((_, i) => parts.slice(i).join('.'))
        .filter((value) => value.includes('.')),
    ];
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ''} SameSite=Lax`;
      }
    }
  }
  function stop() {
    win[`ga-disable-${id}`] = true;
    clearCookies();
    // Reload unloads the Google library and any handlers/timers it installed.
    // Do not send a consent-update ping when consent has been withdrawn.
    if (loaded) location.reload();
  }
  function start() {
    if (loaded || current?.choice !== 'accepted') return;
    loaded = true;
    win[`ga-disable-${id}`] = false;
    win.dataLayer = win.dataLayer || [];
    win.gtag = function () {
      win.dataLayer!.push(arguments);
    };
    win.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    win.gtag('js', new Date());
    win.gtag('config', id, {
      // Exclude query strings, fragments and external referrer paths from collection.
      page_location: `${location.origin}${location.pathname}`,
      page_referrer: document.referrer ? new URL(document.referrer).origin : '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 180 * 24 * 60 * 60,
      cookie_update: false,
      cookie_path: '/',
      cookie_flags: 'SameSite=Lax;Secure',
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id!)}`;
    script.dataset.analytics = 'true';
    document.head.append(script);
  }
  function expire() {
    current = null;
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      /* Storage is optional. */
    }
    panel!.hidden = false;
    stop();
  }
  function scheduleExpiry() {
    clearTimeout(expiresTimer);
    if (!current) return;
    const remaining = current.expires - Date.now();
    if (remaining <= 0) {
      expire();
      return;
    }
    expiresTimer = setTimeout(
      scheduleExpiry,
      Math.min(remaining, 2_147_483_647),
    );
  }
  function hide() {
    const focusWasInside = panel!.contains(document.activeElement);
    panel!.hidden = true;
    if (focusWasInside)
      (
        returnFocus ??
        document.querySelector<HTMLElement>('[data-consent-open]')
      )?.focus();
  }
  function choose(choice: Choice) {
    current = { choice, expires: Date.now() + CONSENT_LIFETIME };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(current));
    } catch {
      /* In-memory consent remains valid for this page only. */
    }
    hide();
    scheduleExpiry();
    if (choice === 'accepted') start();
    else stop();
  }
  document
    .querySelectorAll<HTMLElement>('[data-consent-open]')
    .forEach((button) =>
      button.addEventListener('click', () => {
        returnFocus = button;
        panel.hidden = false;
        panel.querySelector<HTMLButtonElement>('button')?.focus();
      }),
    );
  panel
    .querySelectorAll<HTMLElement>('[data-consent-choice]')
    .forEach((button) =>
      button.addEventListener('click', () =>
        choose(button.dataset.consentChoice as Choice),
      ),
    );
  panel.querySelector('[data-consent-close]')?.addEventListener('click', hide);
  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide();
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    current = read();
    panel.hidden = !!current;
    scheduleExpiry();
    if (current?.choice === 'accepted') start();
    else stop();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && current && current.expires <= Date.now()) expire();
  });
  current = read();
  panel.hidden = !!current;
  scheduleExpiry();
  if (current?.choice === 'accepted') start();
  else stop();
}
