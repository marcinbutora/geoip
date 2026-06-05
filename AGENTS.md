# AGENTS.md

## Quick commands

```bash
npm start          # dev server on :4200
npm run build      # production build to dist/geoip
npm test           # unit tests (Karma + Jasmine, Chrome)
npm run e2e        # E2E tests (Nightwatch + Cucumber, Chrome)
```

## Setup & install

- **Always use `npm install`** — there is no lockfile regeneration command.
- `.npmrc` sets `legacy-peer-deps=true` (keep it).
- Node version is pinned via `.nvmrc` (currently `18`). Netlify reads this file automatically.

## Architecture

- Single-project Angular 17.3 CLI workspace (NgModule-based, **not standalone**)
- Source root: `src/`, output: `dist/geoip/`
- Styles: **SCSS only** (inline style language is SCSS in angular.json)
- TypeScript 5.4.5, strict mode enabled (strict templates, strict injection, strict null checks)
- Prefix for generated components: `app`
- The app is a GeoIP lookup tool that queries external APIs

### Component tree

```
AppComponent
├── <router-outlet>
│   ├── /              → HomeComponent (layout/home)
│   └── /ip/:ip/:city/:country → IpInfoComponent (pages/ip/ip-info)
├── FooterComponent (layout/footer)
└── CookieConsentComponent (shared/cookie-consent)
```

### Key shared modules

| Directory | Purpose |
|-----------|---------|
| `shared/translate/` | Custom i18n (`TranslatePipe`, `TranslateService`) — Polish/English toggle |
| `shared/map/` | Mapbox/Leaflet map display |
| `shared/weather/` | OpenWeatherMap integration |
| `shared/timezone/` | TimeZoneDB integration |
| `shared/data/` | IP data display component |

### Routing

- Route params use the `RoutesLinks` enum from `app-routing.module.ts`
- IP route pattern: `ip/:ip/:city/:country`
- Wildcard (`**`) redirects to home

### API keys

API keys for ipapi.co, OpenWeatherMap, TimeZoneDB, and Mapbox are hardcoded in both `environment.ts` and `environment.prod.ts`. Never commit new keys to these files without encryption.

### External dependencies

- `mapbox-gl` is listed in `allowedCommonJsDependencies` — it's a CJS module that Angular must handle
- Bootstrap 5 via ng-bootstrap, Angular Material (purple-green theme), Leaflet
- GSAP for animations, moment.js for dates

## Testing

- **Unit tests**: `npm test` (Karma + Jasmine, Chrome). Test entries are specified via `include` in `angular.json` (not `require.context`, since the Karma builder uses esbuild).
- **E2E tests**: `npm run e2e` (Nightwatch with Cucumber runner). Source: `nightwatch/src/`, compiled to `out-tsc/nightwatch/`. Feature files: `tests/*.feature`.
- E2E `src_folders` in nightwatch config points to compiled output (`./out-tsc/nightwatch`), so Nightwatch e2e requires a prior TypeScript compilation step.
- Nightwatch `test_runner.type` is `cucumber`, not the default Nightwatch test runner.

## Deployment

- Hosted on **Netlify** with SPA redirect: all routes → `/index.html` (see `netlify.toml`)
- CI via GitHub Actions (`.github/workflows/main.yml`), branches: `master`
- CI uses Node 18.x

## Style conventions

- 2-space indentation, single quotes in TypeScript, trailing whitespace trimmed (`.editorconfig`)
- No existing linter or formatter configured beyond editorconfig — ask before adding one
