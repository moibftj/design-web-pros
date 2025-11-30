# Supabase + Next.js + Tailwind + NextAuth (Dev Container)

A complete, containerized setup with Dev Containers (Dockerfile + devcontainer.json), Tailwind CSS, NextAuth credentials auth using Supabase, environment variables, and minimal pages to test.

## Project Structure

```
├── .devcontainer/
│   ├── devcontainer.json
│   └── Dockerfile
├── pages/
│   ├── _app.js
│   ├── index.js
│   ├── protected.js
│   └── api/
│       └── auth/
│           └── [...nextauth].js
├── components/
│   └── Navbar.js
├── lib/
│   └── supabaseClient.js
├── styles/
│   └── globals.css
├── public/
│   └── favicon.ico
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.local.example
└── README.md
```

## Quick Start

1. **Create environment file:**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase URL and anon key from your Supabase project settings.

2. **Open in Dev Container:**
   In VS Code: Command Palette → "Dev Containers: Reopen in Container"

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Visit the app:**
   Open [http://localhost:3000](http://localhost:3000)

## Supabase Setup

### Create the Example Table

Run this SQL in your Supabase SQL Editor:

```sql
create table if not exists public.examples (
  id bigint generated always as identity primary key,
  title text not null,
  created_at timestamptz default now()
);
```

### Enable Row Level Security (RLS)

```sql
alter table public.examples enable row level security;

create policy "read examples for all"
  on public.examples for select
  using (true);
```

### Insert Sample Data

```sql
insert into public.examples (title) values
  ('First example'),
  ('Second example'),
  ('Third example');
```

## Authentication

- Sign-in uses NextAuth Credentials provider with Supabase Auth under the hood.
- Create a user in Supabase Auth (email/password) via the Supabase Dashboard.
- Use the navbar "Sign in" button to authenticate.
- Visit `/protected` to verify the protected SSR route.

## Optional: Local Supabase (Docker)

If you prefer local Supabase for development:

1. **Initialize:**
   ```bash
   supabase init
   ```

2. **Start:**
   ```bash
   supabase start
   ```
   (This runs Postgres, Auth, Storage locally)

3. **Update environment:**
   Set `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321` and use the local `anon` key printed by the CLI.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Dev Container Details

- **Node version:** 20
- **Ports:**
  - Next.js: 3000
  - Supabase local: 54321 (forwarded)
- **Extensions included:**
  - Prettier
  - Tailwind CSS IntelliSense
  - Supabase
  - ESLint

## Security Notes

- Never commit `.env.local` to version control.
- Generate a strong `NEXTAUTH_SECRET` (use `openssl rand -base64 32`).
- The anon key is safe to expose client-side; use service role key only server-side.

## Extending the App

### Adding OAuth Providers

You can add Google/GitHub via NextAuth providers or Supabase OAuth:

1. Configure callback URLs and client secrets in your provider's console.
2. Extend the `providers` array in `pages/api/auth/[...nextauth].js`.

### Using App Router

This template uses Pages Router. To migrate to App Router:

1. Create an `app/` directory.
2. Move pages to `app/` with proper folder structure.
3. Update `_app.js` logic to `layout.js`.

## License

MIT
