create table chat_history (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  role text not null,
  content text not null,
  parts jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  deleted_at timestamp with time zone default null
);

create index idx_chat_history_session_id on chat_history(session_id);