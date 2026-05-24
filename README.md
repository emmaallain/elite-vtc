# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Optional CDN for Photos (Cloudinary)

The project supports Cloudinary for faster image delivery with a local fallback.

1. In `.env`, fill `VITE_CLOUDINARY_CLOUD_NAME` with your Cloudinary cloud name.
2. Keep `VITE_CLOUDINARY_FOLDER` aligned with your upload folder (default: `elite-vtc`).
3. For homepage random banner slides, set `VITE_HOMEPAGE_CAROUSEL_IMAGES` with comma-separated filenames (example: `slide-1.jpg,slide-2.jpg,slide-3.jpg`).
4. Upload those files to your Cloudinary folder: `elite-vtc/homepage-carousel/`.
5. Optional: set direct image sources for drivers and vehicles. Each variable accepts either a full URL (`https://...`) or a Cloudinary ID/path.
	- `VITE_DRIVER_YANNICK_IMAGE`
	- `VITE_DRIVER_CHRISTELLE_IMAGE`
	- `VITE_VEHICLE_EXTERIOR_IMAGE`
	- `VITE_VEHICLE_INTERIOR_IMAGE`

If `VITE_CLOUDINARY_CLOUD_NAME` is empty, the app automatically uses local images from `public/photos`.

## Cross-Device Persistence (Supabase)

Admin content and reviews can be shared across devices through Supabase.

1. Add these variables to your `.env`:
	 - `VITE_SUPABASE_URL`
	 - `VITE_SUPABASE_ANON_KEY`
	 - `VITE_ADMIN_EMAIL` (optional, recommended)
2. In Supabase SQL Editor, create the table:

```sql
create table if not exists public.elite_app_state (
	id text primary key,
	payload jsonb not null default '[]'::jsonb,
	updated_at timestamptz not null default now()
);
```

3. Add RLS policies (admin-only writes):

```sql
alter table public.elite_app_state enable row level security;

create policy "Allow read app state"
on public.elite_app_state
for select
to anon
using (true);

create policy "Allow insert app state for admin"
on public.elite_app_state
for insert
to authenticated
with check (auth.jwt() ->> 'email' = 'your-admin@email.com');

create policy "Allow update app state for admin"
on public.elite_app_state
for update
to authenticated
using (auth.jwt() ->> 'email' = 'your-admin@email.com')
with check (auth.jwt() ->> 'email' = 'your-admin@email.com');

create policy "Allow delete app state for admin"
on public.elite_app_state
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'your-admin@email.com');
```

Without Supabase variables, the app falls back to local browser storage only.

## Secure Admin Login (Supabase Auth)

The hidden admin mode can use Supabase email/password authentication.

1. In Supabase Dashboard, open Authentication > Providers.
2. Enable Email provider.
3. Create an admin user in Authentication > Users.
4. In `.env`, set `VITE_ADMIN_EMAIL` to that admin email (recommended to restrict admin access).
5. Restart the app.

Behavior:
- If Supabase is configured, admin login uses email/password.
- If Supabase is not configured, admin falls back to local code mode.
