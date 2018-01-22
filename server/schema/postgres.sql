create table if not exists users
(
  id serial not null
    constraint users_pkey
      primary key,
  twitch_id text not null,
  updated_at timestamp
);

create unique index if not exists users_twitch_id_uindex
  on users (twitch_id);

