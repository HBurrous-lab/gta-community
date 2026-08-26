create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'member' check (role in ('member','staff','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published boolean not null default true,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  location text,
  published boolean not null default true,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null,
  department text not null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending','reviewing','accepted','denied')),
  reviewer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  body text not null,
  status text not null default 'open' check (status in ('open','closed')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'display_name',split_part(new.email,'@',1))); return new; end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role in ('admin','staff'));
$$;

alter table public.profiles enable row level security;
alter table public.announcements enable row level security;
alter table public.events enable row level security;
alter table public.applications enable row level security;
alter table public.tickets enable row level security;

create policy "Public can read published announcements" on public.announcements for select using (published=true or public.is_admin());
create policy "Staff manage announcements" on public.announcements for all using (public.is_admin()) with check (public.is_admin());
create policy "Public can read published events" on public.events for select using (published=true or public.is_admin());
create policy "Staff manage events" on public.events for all using (public.is_admin()) with check (public.is_admin());
create policy "Members read own profile" on public.profiles for select using (id=auth.uid() or public.is_admin());
create policy "Members update own profile" on public.profiles for update using (id=auth.uid()) with check (id=auth.uid());
create policy "Staff manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Members read own applications" on public.applications for select using (user_id=auth.uid() or public.is_admin());
create policy "Members submit applications" on public.applications for insert with check (user_id=auth.uid());
create policy "Staff manage applications" on public.applications for update using (public.is_admin()) with check (public.is_admin());
create policy "Members read own tickets" on public.tickets for select using (user_id=auth.uid() or public.is_admin());
create policy "Members create tickets" on public.tickets for insert with check (user_id=auth.uid());
create policy "Staff manage tickets" on public.tickets for update using (public.is_admin()) with check (public.is_admin());

insert into public.announcements(title,body) values
('Welcome to Coastal Horizon RolePlay','The Community Hub is officially online. Explore departments, events, applications, and community resources.'),
('Community Hub Launch','Applications, events, announcements, and member tools are being brought together in one place.'),
('The Horizon Is Growing','Our goal is simple: immersive roleplay, organized departments, and a community people want to return to.');

insert into public.events(title,description,starts_at,location) values
('Community Launch Night','Meet the staff, tour the Hub, and learn what is coming next.',now()+interval '3 days','Discord'),
('Staff & Department Q&A','Ask questions about departments, applications, and community standards.',now()+interval '7 days','Discord');
