# NOVOSense website

Czech-first corporate site for NOVOSense, DataHub and Dáme lístky. Astro generates static HTML for GitHub Pages at https://novosense.cz. English pages live under `/en/`.

## Development

Use mise as the development entrypoint. `mise.toml` and `mise.lock` pin Node 24.19.0, pnpm 10.34.5 and actionlint, matching the ticketing repository. Run `mise tasks` to discover the project workflows.

```sh
mise trust
mise install
mise run setup
mise run dev
mise run check
mise run build
mise run preview
```

Content, navigation, language switching, email/telephone links and the mobile menu work without JavaScript. Optional analytics consent is the only client-side application script. Fonts and visual assets are local; product previews are illustrative SVG/CSS graphics with sample data, not live product embeds.

## Content and routes

- `src/content/site.ts`: complete, typed Czech and English marketing copy. Keep both locale structures aligned. Product brand names remain DataHub and Dáme lístky in both languages.
- `src/content/company.ts`: company/contact details sourced from the ticketing repository. The About page presents Vojtěch Giesl and Noe Švanda using supplied biographies and portraits in `public/team/`; portrait display sizes stay at 112px or smaller. No customer references or VAT details are assumed.
- `src/lib/routes.ts`: page identities and corresponding localized URLs. `src/pages/[...path].astro` renders the content pages using shared components. Legal/privacy/cookie copy lives in `src/components/LegalContent.astro`.

Czech uses `/`, `/produkty/`, `/produkty/datahub/`, `/produkty/dame-listky/`, `/o-nas/`, `/kontakt/`, `/pravni-informace/`, `/ochrana-osobnich-udaju/`, `/cookies/`. English equivalents are under `/en/`. The sitemap includes only canonical content pages.

The company identity remains blue, DataHub takes its green/parchment palette from the product's public interface, and Dáme lístky takes its plum/magenta palette and icon from the ticketing product. `public/brand/dame-listky.svg` was copied from that company's product repository. Social sharing PNGs have editable SVG source files beside them. No sibling repository is needed to build this site.

## Verification

```sh
mise run browser:install
mise run check
mise run format:check
mise run test
```

`mise run test` builds an analytics-disabled site in `dist/` and a separate analytics-enabled fixture in `dist-analytics/` using a dummy measurement ID. It checks generated links/assets, routes and metadata, then runs browser checks covering both languages, 320/390/768/1440px widths, WCAG A/AA checks, no-JavaScript navigation and analytics consent. Google requests are intercepted in tests; no test traffic is sent to Google.

For an installed system Chromium:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium mise run test
```

Browser traces for failures appear in `test-results/`. To format sources, run `mise run format`. TypeScript is pinned to the 5.9 line because the Astro checker requires its JavaScript API, which TypeScript 7 does not expose.

## Google Analytics: prepared, disabled by default

Copy `.env.example` to `.env` for local configuration. Production uses GitHub Actions repository variables:

| Variable                   | Default | Purpose                                       |
| -------------------------- | ------- | --------------------------------------------- |
| `PUBLIC_ANALYTICS_ENABLED` | `false` | Explicit opt-in to making analytics available |
| `PUBLIC_GA_MEASUREMENT_ID` | empty   | GA4 measurement ID, e.g. `G-XXXXXXXXXX`       |

The measurement ID is public configuration, not a secret. Enabling analytics without a valid ID fails the build. A valid ID alone does not enable tracking. Both values are baked into the static site; changes require a new deployment.

Before enabling:

1. Supply the real GA4 property ID. Configure the property for analytics only: disable Google Signals, advertising features, enhanced measurement and user-provided data collection. The site records ordinary page views only; there are no custom contact/click events.
2. Set and document the property's user/event retention (start with 2 months). Confirm processor and international transfer details for the actual account. Update both language versions of the privacy notice to describe the final configuration and any actual email-provider details you want to publish. The current production notice accurately describes analytics as disabled.
3. Set the two repository variables and deploy. Verify the enabled consent flow on the real domain before using the reports.

The implementation uses basic consent behavior: no Google script, preconnect or analytics request before acceptance. Advertising consent remains denied. Query strings and fragments are excluded from page locations, and referrers are reduced to their origin. Consent is stored in `localStorage` for 180 days; analytics cookies have a maximum 180-day lifetime without renewal. Cookie settings are available in the footer and cookie page. Rejecting after acceptance disables collection, removes accessible `_ga` cookies, and reloads to unload Google's code. Revocation is synchronized across tabs. Blocking storage never implies consent.

If analytics is turned off again, no Google code loads. Existing cookies can be removed through the browser's site-data controls. Hosting security logs are separate: GitHub Pages logs visitor IP addresses as explained in the privacy notice.

## Deployment

The existing workflow checks types, formatting, generated output, accessibility and browser behavior before building the production artifact and deploying it. Publishing is triggered by a push to `main` or manual workflow dispatch. No deployment is performed by local build/test commands.

`public/CNAME` preserves `novosense.cz`; keep the repository's GitHub Pages custom domain and DNS settings aligned. No server, database, CMS, API keys or product backend connections are required. The Dáme lístky product page links to its public app at `https://damelistky.cz/`. Product contact invitations go to `info@novosense.cz` with localized subjects.
