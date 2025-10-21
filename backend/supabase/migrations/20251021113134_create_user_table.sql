create table users (
  id uuid primary key default gen_random_uuid(),
  anonymous_id text not null unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  deleted_at timestamp with time zone default null
);

create index idx_users_anonymous_id on users(anonymous_id);
