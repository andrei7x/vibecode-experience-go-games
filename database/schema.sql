-- Public, curated teaching content only. No visitor writes or personal data.
create table public.vibecode_catalog (
  slug text primary key,
  category text not null check (category in ('Games', 'Aplicativos', 'Criação')),
  title text not null,
  summary text not null,
  kind text not null,
  prototype text not null,
  next_step text not null,
  review text not null,
  prompt text not null,
  sort_order integer not null,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.vibecode_catalog enable row level security;
revoke all on public.vibecode_catalog from anon, authenticated;
grant select on public.vibecode_catalog to anon, authenticated;
create policy "Published Vibecode catalogue is readable" on public.vibecode_catalog
  for select to anon, authenticated using (published = true);
comment on table public.vibecode_catalog is 'Curated GO Games workshop catalogue. Public read only for published entries.';
