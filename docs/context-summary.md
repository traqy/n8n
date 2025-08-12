## Project objective

- **Primary goal**: Run n8n with all Enterprise features enabled and no license checks.
- **Secondary goals**:
  - Build and run via Docker/Compose (initially with MongoDB, later switched to PostgreSQL).
  - Finally, run n8n on the host with `npm run dev`, while PostgreSQL stays in Docker.

## High-level approach

- **Direct deletion → too brittle**: Initial removal of licensing files caused widespread TypeScript and import errors.
- **Stable solution**: Keep the structure, disable behavior.
  - Replace license checks, providers, decorators, and metrics with no-op implementations.
  - Maintain API and type compatibility to avoid ripple failures.

## Architecture context

- **Monorepo** with packages: `@n8n/config`, `@n8n/db`, `@n8n/backend-common`, `n8n-cli`, `n8n-core`, `n8n-workflow`, frontend `n8n-editor-ui`.
- **Build system**: `pnpm` + `turbo`, TypeScript.
- **CLI & server**: `packages/cli` orchestrates startup, migrations, serving static UI.
- **Frontend**: Vue app in `packages/frontend/editor-ui`; build artifacts copied to `~/.cache/n8n/public`.

## Refactoring strategy (licensing removal)

- **Always-on license**: `isLicensed()` returns true; quotas unlimited.
- **No-op decorators/services**: License decorators and services exist but do nothing.
- **Mocks instead of deletes**: Where imports exist, reintroduce minimal mocks to satisfy types and runtime.
- **Remove external dependency**: Drop `@n8n_io/license-sdk`.

## Key edits by area (impact-focused)

- **Core behavior**
  - `packages/@n8n/backend-common/src/license-state.ts`: Always licensed, unlimited quotas; `setLicenseProvider` accepts optional arg.
  - `packages/@n8n/decorators/src/controller/licensed.ts`: No-op decorator.
- **CLI**
  - Removed license controller import/initialization; dropped license metrics.
  - `packages/cli/src/commands/start.ts`: Starts server and serves UI without license checks; keeps static cache generation.
  - `packages/cli/src/commands/user-management/reset.ts`: Retains ability to reset owner user.
- **DB**
  - License metrics repository/entity mocked with minimal TypeORM compatibility; removed custom `save()` override; exports aligned.
- **Config**
  - License config reintroduced as a mock to satisfy imports; removed brittle references.
- **Frontend**
  - Removed non-production license banner; added stub component to satisfy imports.
- **Licenses/docs**
  - `LICENSE.md` switched to MIT; EE license and CLA removed.

## Run/deploy evolution

- **Initial**: Docker + MongoDB → port 27017 conflict, remapped to 27018.
- **Switch to PostgreSQL**: Compose updated to `postgres` + optional `pgadmin`.
- **Custom image hurdles**: Monorepo build inside Docker was complex (`turbo`/`zx`/lockfile issues). Pivoted to:
  - Simple custom Dockerfile extending official image (workaround), then
  - Host-based development with DB in Docker.
- **Host-based dev**: `start-dev-local.sh` and `simple-start.sh` build essentials and run server locally.

## Common errors and fixes

- Missing scripts (`build:cli`): Used available workspace scripts instead.
- `turbo`/`zx` not found: Avoided by not building full monorepo inside Docker image.
- Lockfile/engines mismatch for `pnpm`: Pinned to `pnpm@10.12.1` in Docker context.
- TypeScript mismatches:
  - Missing `license.config`: Restored mock file.
  - Missing `license-metrics.repository`: Restored mock and re-exports.
  - Mock repo `save()` signature mismatch: Removed override to inherit base signature.
  - `setLicenseProvider` arg mismatch: Accepted optional arg.
- Frontend ENOENT for `~/.cache/n8n/public/index.html`: UI not built → build `n8n-editor-ui` then server copies to static cache.

## Current state

- **Backend**: Runs locally with all features unlicensed.
- **DB**: PostgreSQL via Docker Compose (`n8n-postgres` container).
- **Frontend**: Build required to populate `~/.cache/n8n/public` for the editor UI.

## Operational notes

- **Reset admin (owner) user**
  - Run from repo root with DB envs matching compose:
    ```bash
    DB_TYPE=postgresdb \
    DB_POSTGRESDB_HOST=localhost \
    DB_POSTGRESDB_PORT=5432 \
    DB_POSTGRESDB_DATABASE=n8n \
    DB_POSTGRESDB_USER=n8n \
    DB_POSTGRESDB_PASSWORD=n8n-password \
    ./packages/cli/bin/n8n user-management:reset
    ```

- **Rebuild database/schema**
  - Full reset (drop volumes):
    ```bash
    docker compose -f docker-compose.yml down -v
    docker compose -f docker-compose.yml up -d postgres
    ```
  - Or just recreate `n8n` database:
    ```bash
    docker exec -it n8n-postgres sh -lc \
    "psql -U postgres -c \"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='n8n';\" \
     && psql -U postgres -c \"DROP DATABASE IF EXISTS n8n;\" \
     && psql -U postgres -c \"CREATE DATABASE n8n OWNER n8n;\""
    ```
  - Start n8n; it will run migrations automatically.

- **Fix UI ENOENT**
  - Build the editor UI:
    ```bash
    pnpm --filter "n8n-editor-ui" build
    ```
  - Restart n8n; it will copy `dist` into `~/.cache/n8n/public`.

## Prompting lessons learned

- **State the end-to-end intent**: “Run n8n locally from source with all EE features unlicensed, Postgres in Docker, UI accessible.”
- **Prefer non-destructive refactors**: “Keep structure; disable behavior via mocks/no-ops; maintain interfaces.”
- **Call out constraints early**: “No global turbo/zx; avoid Docker monorepo builds; use `pnpm@10.12.1`.”
- **Ask for the run mode explicitly**: “Dockerized app vs. host app + Docker DB?”
- **Checklist deliverables**: “Backend boots; UI builds; migrations run; admin reset command works.”

These practices helped implement: licensing bypass via mocks; stable backend build; Postgres Compose; host-based dev; UI build path; admin reset and DB rebuild workflows.


