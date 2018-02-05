-- Users
create table if not exists users
(
  id serial not null
    constraint users_pkey
      primary key,
  twitch_id text not null,
  updated_at timestamp
  created_at timestamp default now() not null
  twitch_username text not null
);

create unique index if not exists users_twitch_id_uindex
  on users (twitch_id);

create unique index if not exists users_twitch_username_uindex
  on users (twitch_username);

-- Settings
create table if not exists settings
(
  id serial not null
    constraint settings_pkey
      primary key,
  user_id integer not null
    constraint settings_users_id_fk
      references users
        on update cascade on delete cascade,
  twitch_id text
    constraint settings_users_twitch_id_fk
      references users (twitch_id)
        on update cascade on delete cascade,
  bot_enabled boolean default false not null
  created_at timestamp default now() not null
);

create unique index if not exists settings_user_id_uindex
  on settings (user_id);

create unique index if not exists settings_twitch_id_uindex
  on settings (twitch_id);

-- Balances
create table if not exists balances
(
  id serial not null
    constraint balances_pkey
      primary key,
  twitch_id text not null,
  amount bigint default 0 not null,
  currency text not null,
  updated_at timestamp
);

create unique index if not exists balances_twitch_id_currency_uindex
  on balances (twitch_id, currency);
