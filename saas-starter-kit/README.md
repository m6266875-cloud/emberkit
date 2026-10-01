# Emberkit — PostgreSQL edition

A redesigned, responsive SaaS foundation built with Next.js 16, React 19, TypeScript,
Tailwind CSS, **PostgreSQL + Prisma**, and Auth.js / NextAuth email/password login.
Stripe subscription billing is optional.

This is the updated **`saas-starter-kit`** application. The repository's
`emberkit-release` folder remains the original Supabase version.

## What changed

- New landing page, auth layouts, app shell, dashboard, project views, profile,
  settings, mobile navigation, and persistent light/dark/system themes.
- Supabase clients, middleware, schema, auth callback, and dependencies removed.
- Fresh PostgreSQL tables for users, projects, persistent auth rate limits, and
  idempotent Stripe webhook events. Versioned Prisma migration included.
- Email/password signup and login with bcrypt (cost 12), signed HTTP-only JWT
  sessions, server-side account checks, and password-change session revocation.
- Create/read/update/delete projects through owner-scoped server APIs.
- Profile updates and password changes; optional Stripe checkout/customer portal.
- `/preview` is an explicitly labeled sample workspace. Its project changes are
  **in-memory only** and never write to the real database.
- `/guide` provides a readable Windows/hosted-database setup guide.

**Fresh start:** existing Supabase users, passwords, projects, and subscriptions
are not imported. This application never connects to your old Supabase project.
Use a new, empty PostgreSQL database.

## Windows setup (PowerShell)

### 1. Open the right application

Install **Node.js 22.19+ or a newer LTS**. Extract or clone into a permanent local
folder (not inside a ZIP or a temporary folder). In VS Code, open:

```text
C:\Users\YOUR_NAME\Projects\emberkit-recovered\saas-starter-kit
```

The selected folder must contain `package.json`, `.env.example`, and `prisma/`.
Open **Terminal → New Terminal → PowerShell**:

```powershell
node --version
npm install
```

### 2. Create hosted PostgreSQL

Neon or another standard PostgreSQL provider works. Create a **new database** and
obtain its connection strings privately from the provider dashboard.

- `DATABASE_URL`: pooled URL for application queries (when available).
- `DIRECT_URL`: direct/unpooled URL for Prisma migrations.
- Without pooling, set both to the same connection URL.
- Preserve the provider's SSL settings, such as `sslmode=require`.
- URL-encode special characters if constructing a password-bearing URL yourself.
- Keep these URLs private. Never paste them into chat or commit them.

Prisma uses its engine-free PostgreSQL driver adapter (`@prisma/adapter-pg`), so
runtime queries use the standard `pg` driver, not a platform-specific native
query-engine binary. Prisma CLI still manages schema migrations.

### 3. Configure `.env.local`

Do not overwrite an existing file containing credentials. Create it if missing:

```powershell
if (-not (Test-Path .env.local)) {
    Copy-Item .env.example .env.local
}
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Open `.env.local` and fill in your own values. The command generates the auth
secret; it is not a database password.

| Variable                | Purpose                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| `DATABASE_URL`          | Private application PostgreSQL connection string                  |
| `DIRECT_URL`            | Private direct connection for schema migrations                   |
| `NEXTAUTH_SECRET`       | Random secret, at least 32 characters; do not use the placeholder |
| `NEXTAUTH_URL`          | `http://localhost:3000` on your Windows computer                  |
| `NEXT_PUBLIC_SITE_URL`  | Same local URL; used for optional Stripe return URLs              |
| `STRIPE_SECRET_KEY`     | Optional server-only Stripe key                                   |
| `STRIPE_PRICE_ID`       | Optional recurring Stripe Price ID                                |
| `STRIPE_WEBHOOK_SECRET` | Optional signed webhook secret                                    |

Old `NEXT_PUBLIC_SUPABASE_*` variables are no longer used. No PostgreSQL URL or
private key should have a `NEXT_PUBLIC_` prefix. Stripe publishable keys are not
needed because this app redirects to Stripe-hosted Checkout.

### 4. Apply the included migration and run

```powershell
npm run db:deploy
npm run dev
```

Open `http://localhost:3000`, create an account, and add a project. There is no
email-confirmation step in this implementation. Restart the server after
changing `.env.local`.

The database scripts explicitly load `.env.local`; Prisma's default `.env`
loading alone would not find that file.

For future schema changes in development:

```powershell
npm run db:migrate -- --name describe_your_change
npm run db:studio
```

Commit reviewed migrations, not `.env.local`. Do **not** run `prisma migrate
reset` against a database with data you need.

## Optional Stripe subscriptions

The core workspace does not require Stripe. Checkout is disabled without a
secret key, recurring Price ID, and webhook signing secret; it does not pretend to charge or upgrade.

1. Use Stripe **test mode** during development.
2. Create a product and a recurring Price. Set `STRIPE_SECRET_KEY` and
   `STRIPE_PRICE_ID` in `.env.local`.
3. Enable the Stripe customer portal in your Stripe dashboard.
4. Install the Stripe CLI and forward local signed events:

   ```powershell
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

5. Put the printed signing secret in `STRIPE_WEBHOOK_SECRET` and restart Next.js.
6. For deployment, register `https://YOUR_DOMAIN/api/stripe/webhook` and subscribe
   to `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, and `customer.subscription.deleted`.
7. Configure the webhook with the API version used by your installed Stripe SDK.

Verified events update PostgreSQL subscription state; duplicate event IDs are
recorded atomically. Subscription events fetch current Stripe state to avoid
applying stale statuses. Checkout uses an idempotency key and refuses already
subscribed accounts. Portal links require a saved Stripe customer.

The landing page's **$49 one-time kit price is template marketing copy**, preserved
from the original kit. Signup is free. This application implements recurring
app subscriptions—not a one-time source-code purchase flow. Configure your own
pricing and copy before selling a product.

## Routes and ownership

| Route                                                                | Behavior                                                  |
| -------------------------------------------------------------------- | --------------------------------------------------------- |
| `/`, `/guide`                                                        | Public website and setup guide                            |
| `/preview`                                                           | Public, labeled demonstration with sample data            |
| `/login`, `/signup`                                                  | Email/password authentication                             |
| `/dashboard`, `/projects`, `/projects/[id]`, `/profile`, `/settings` | Protected server-rendered workspace                       |
| `POST /api/auth/register`                                            | Validated signup; hashes the password                     |
| `/api/auth/*`                                                        | NextAuth login/session/CSRF/sign-out endpoints            |
| `GET/POST /api/projects`                                             | List/create projects for the signed-in user               |
| `GET/PATCH/DELETE /api/projects/[id]`                                | Owner-scoped project operations                           |
| `PATCH /api/profile`                                                 | Update the signed-in user's name/username/website         |
| `PATCH /api/account/password`                                        | Verify current password, change hash, revoke old sessions |
| `POST /api/stripe/checkout`                                          | Optional hosted subscription checkout                     |
| `POST /api/stripe/portal`                                            | Optional Stripe customer portal                           |
| `POST /api/stripe/webhook`                                           | Signature-verified external Stripe events                 |

All data access runs on the Node.js server. Authenticated operations obtain user
IDs from verified sessions; the browser cannot choose an owner. Project writes
include both project ID and user ID. Unknown input fields are rejected.

Application mutation APIs require same-origin requests; JSON mutations also
check content type and cap JSON bodies at 16 KiB. NextAuth uses its own CSRF
protection. Passwords are limited to 72 UTF-8 bytes to prevent bcrypt truncation.
Website links only accept `http:` or `https:`.

Rate limits are atomic PostgreSQL upserts, not per-process memory. Client IP
headers must come from a **trusted reverse proxy** that replaces client-supplied
`X-Forwarded-*` headers. Prune expired buckets periodically, for example:

```sql
DELETE FROM rate_limits WHERE expires_at < NOW() - INTERVAL '7 days';
```

## Production checklist

- Add private environment values through your deployment provider, never Git.
- Set both site URLs to your real **HTTPS** domain and use a fresh production
  auth secret. Keep pool sizes appropriate to the database plan (5 per instance).
- Apply `npm run db:deploy` as a deployment/release step before serving the app.
- Run `npm run build`, then `npm start`, or use a Next.js-compatible host.
- Set up database backups, monitoring, and dependency update checks.
- Email verification, email password recovery, OAuth, account deletion, and
  managed-auth features are **not implemented**. Add an email delivery/verification
  and recovery flow before depending on them for a public product.
- There is no browser database client or Supabase RLS here. Ownership is enforced
  in server code. Never expose direct database access to end users.
- Do not put a production database URL into automated browser test runs.

## Verification

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

For browser checks, start the app in one terminal, then in another:

```powershell
npx playwright install chromium
npm run test:e2e
```

By default, browser tests cover public pages and the in-memory demo. To run real
signup, project isolation/CRUD, profile, and password/session tests, point the
running app and test environment at the **same disposable PostgreSQL database**,
apply the migration, and set:

```powershell
$env:E2E_DATABASE_READY = "1"
$env:E2E_BASE_URL = "http://localhost:3000"
npm run test:e2e
```

These integration tests create synthetic `example.test` accounts and clean up
only the user IDs they created. Use a disposable database anyway. A custom
Chromium path can be set with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` for CI.

## Troubleshooting

- **VS Code opens empty:** check the folder in Windows File Explorer. Reopen
  `saas-starter-kit` with File → Open Folder. Set Window: Restore Windows to `all`.
  If files are missing from disk too, check ZIP extraction, Recycle Bin, backups,
  and cloud sync; closing VS Code should not delete saved files.
- **Sign-in disabled:** confirm `DATABASE_URL` and a real, random `NEXTAUTH_SECRET`
  of at least 32 characters exist in `.env.local`, then restart the server.
- **Table does not exist:** run `npm run db:deploy` against the new database.
- **Migration cannot connect:** check `DIRECT_URL`, SSL options, firewall access,
  and whether you selected an unpooled connection.
- **Wrong user cannot see a project:** expected; project IDs do not grant access.
- **Auth secret changed:** old sessions become invalid. Sign in again.
- **Port 3000 is occupied:** stop the other server or run `npm run dev -- --port 3001`
  and update both local site URLs to match.
- **Stripe is disabled:** this is expected until your own billing keys and Price
  are configured. The rest of the workspace still works.

## Structure

```text
app/
  (workspace)/       Protected pages and app shell
  api/               Auth, project, profile, password, and billing APIs
  guide/             Public setup guide
  preview/           Explicitly labeled sample workspace
components/          Shared UI and forms
lib/                 Auth, Prisma, validation, rate limits, and API helpers
prisma/
  schema.prisma      PostgreSQL models
  migrations/        Initial versioned schema
tests/              Unit and browser/integration checks
```
