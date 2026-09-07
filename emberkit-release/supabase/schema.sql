-- Run this in your Supabase project's SQL Editor (Database -> SQL Editor)

-- Table to track subscription status per user
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  is_subscribed boolean default false,
  stripe_customer_id text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
