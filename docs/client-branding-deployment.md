# Client Branding Deployment Guide

This guide explains how to run a customized Dify build that includes client-specific frontend branding changes such as logo, title, and theme styling.

## What this branch customizes

The `feature/client-branding` branch adds a branding layer in the web app so a deployment can define:

- fallback application title
- default logo and dark-mode logo paths
- site mark assets
- global branded accent styles

The main frontend files involved are:

- `web/app/branding.ts`
- `web/app/styles/branding.css`
- `web/app/layout.tsx`
- `web/app/components/base/logo/dify-logo.tsx`
- `web/app/components/base/logo/logo-site.tsx`
- `web/app/components/header/index.tsx`

## Deployment options

Use one of these paths depending on whether you want to preview local frontend changes or run the full Docker stack.

### Option 1: Run the customized frontend from source

Use this when you want to preview branding changes directly from the local `web` source code.

#### Prerequisites

- Node.js
- Corepack or pnpm
- local Dify backend available at `http://localhost`

#### Install dependencies

```bash
cd web
corepack enable
corepack pnpm install
```

#### Create frontend env file

```bash
cp .env.example .env.local
```

Set these values in `web/.env.local`:

```bash
NEXT_PUBLIC_DEPLOY_ENV=DEVELOPMENT
NEXT_PUBLIC_EDITION=SELF_HOSTED
NEXT_PUBLIC_API_PREFIX=http://localhost/console/api
NEXT_PUBLIC_PUBLIC_API_PREFIX=http://localhost/api
NEXT_PUBLIC_COOKIE_DOMAIN=
```

Notes:

- `NEXT_PUBLIC_API_PREFIX` must point to the console API.
- `NEXT_PUBLIC_PUBLIC_API_PREFIX` must point to the public app API.
- If frontend and backend are hosted on different subdomains, set `NEXT_PUBLIC_COOKIE_DOMAIN=1` and keep both apps under the same top-level domain.

#### Start the frontend

```bash
corepack pnpm run dev
```

Open:

- `http://localhost:3000/install` to validate the customized install page
- `http://localhost:3000` for the local web app root

This path is the best choice when reviewing logo, theme, and other visual changes before release.

### Option 2: Run Dify with Docker Compose

Use this when you want a full self-hosted stack with the standard Dify deployment flow.

#### Bootstrap Docker env

```bash
cd docker
cp .env.example .env
```

Review these fields in `docker/.env` before starting:

- `CONSOLE_API_URL`
- `CONSOLE_WEB_URL`
- `SERVICE_API_URL`
- `APP_API_URL`
- `APP_WEB_URL`
- `COOKIE_DOMAIN`
- `NEXT_PUBLIC_COOKIE_DOMAIN`

Recommended rules:

- Leave the URL variables empty when everything is served from the same domain.
- Set the URL variables explicitly when console, API, or app are hosted on different domains.
- Set `COOKIE_DOMAIN` and `NEXT_PUBLIC_COOKIE_DOMAIN` when frontend and backend use different subdomains.

#### Start the stack

```bash
docker compose up -d
```

Open:

- `http://localhost/install` for first-time initialization

#### Important branding note

The default Docker `web` service uses the published Dify web image. If you need to verify local branding code before building your own image, use Option 1 instead.

## Replacing client assets

For client-specific delivery, replace the assets referenced by `web/app/branding.ts`.

Default paths currently used by the branding layer:

- `/logo/logo.svg`
- `/logo/logo-monochrome-white.svg`
- `/logo/logo-site.png`
- `/logo/logo-site-dark.png`

Keep the file names stable if you want a simple asset swap. If you need different names or additional metadata, update `web/app/branding.ts` to match.

## Recommended delivery workflow

1. Apply the client logos and branding values in `web/app/branding.ts`.
2. Verify the visual result locally with `corepack pnpm run dev`.
3. Run the web checks before release:
   - `corepack pnpm type-check:tsgo`
   - `corepack pnpm test app/components/base/logo/__tests__/dify-logo.spec.tsx app/components/base/logo/__tests__/logo-site.spec.tsx`
4. Deploy the full stack with Docker Compose after visual validation is complete.

## Troubleshooting

- If the Docker stack is up but your branding changes are not visible, you are likely looking at the published Docker web image instead of the local source frontend.
- If login cookies do not persist across subdomains, verify `COOKIE_DOMAIN` and `NEXT_PUBLIC_COOKIE_DOMAIN`.
- If the frontend cannot load data, verify `NEXT_PUBLIC_API_PREFIX` and `NEXT_PUBLIC_PUBLIC_API_PREFIX` first.
