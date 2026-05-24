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

alter table public.elite_app_state enable row level security;
alter table public.elite_reviews enable row level security;

create policy "Allow read app state"
on public.elite_app_state
for select
to public
using (true);

create policy "Allow insert app state for admin"
on public.elite_app_state
for insert
to authenticated
with check (auth.jwt() ->> 'email' = 'emma.allain06@gmail.com');

create policy "Allow update app state for admin"
on public.elite_app_state
for update
to authenticated
using (auth.jwt() ->> 'email' = 'emma.allain06@gmail.com')
with check (auth.jwt() ->> 'email' = 'emma.allain06@gmail.com');

create policy "Allow delete app state for admin"
on public.elite_app_state
for delete
to authenticated
using (auth.jwt() ->> 'email' = 'emma.allain06@gmail.com');

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
using (auth.jwt() ->> 'email' = 'emma.allain06@gmail.com');