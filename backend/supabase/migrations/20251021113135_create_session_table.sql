create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text,
  metadata jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  deleted_at timestamp with time zone default null
);

create index idx_sessions_user_id on sessions(user_id);
create index idx_sessions_created_at on sessions(created_at);
