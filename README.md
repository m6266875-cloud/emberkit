# Emberkit

Two applications live in this repository:

- **[`saas-starter-kit`](saas-starter-kit/README.md)** — the updated PostgreSQL + Prisma edition, with a redesigned website, email/password authentication, and a connected project workspace. **Open this folder in VS Code.**
- **`emberkit-release`** — the original Supabase edition, kept unchanged as a reference.

For the updated app, follow the Windows/hosted PostgreSQL setup in `saas-starter-kit/README.md`. Real credentials belong in its ignored `.env.local`, never GitHub. The two apps have separate dependencies and configuration; do not run `npm install` from the repository root.
