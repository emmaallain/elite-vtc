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
2. In Supabase SQL Editor, create the tables:

```sql
create table if not exists public.elite_app_state (
	id text primary key,
	payload jsonb not null default '[]'::jsonb,
	updated_at timestamptz not null default now()
);

create table if not exists public.elite_reviews (
	id text primary key,
	name text not null,
	message text not null,
	rating integer not null check (rating between 1 and 5),
	created_at timestamptz not null default now()
);

insert into public.elite_reviews (id, name, message, rating, created_at)
values
	('default-review-1', 'Sophie M.', 'Service impeccable, chauffeur ponctuel et tres professionnel.', 5, '2026-04-12T10:30:00.000Z'),
	('default-review-2', 'Karim A.', 'Reservation tres fluide et excellente communication avant la course.', 5, '2026-04-25T14:10:00.000Z'),
	('default-review-3', 'Elena R.', 'Vehicule confortable et accueil premium du debut a la fin.', 4, '2026-05-02T09:00:00.000Z')
on conflict (id) do nothing;
```

3. Add RLS policies. Shared admin content remains admin-only. Reviews are public for creation, but only admins can delete them:

```sql
alter table public.elite_app_state enable row level security;
alter table public.elite_reviews enable row level security;

create policy "Allow read app state"
on public.elite_app_state
for select
to public
using (true);

create policy "Allow read reviews"
on public.elite_reviews
for select
to public
using (true);

create policy "Allow public create reviews"
on public.elite_reviews
for insert
to public
with check (true);

create policy "Allow admin delete reviews"
on public.elite_reviews
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'your-admin@email.com');

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

If you want instant cross-device updates without waiting for the polling interval, enable Realtime for `public.elite_app_state` in the Supabase dashboard.
Also enable Realtime for `public.elite_reviews` if you want avis to update instantly across devices.

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
