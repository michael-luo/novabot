create table if not exists users
(
  id serial not null
    constraint users_pkey
      primary key,
  twitch_id text not null,
  updated_at timestamp,
  twitch_username text,
  created_at timestamp default now() not null,
  bot_enabled boolean default false not null
);

create unique index if not exists users_twitch_id_uindex
  on users (twitch_id);

create unique index if not exists users_twitch_username_uindex
  on users (twitch_username);

create table if not exists balances
(
  id serial not null
    constraint balances_pkey
      primary key,
  twitch_id text not null
    constraint balances_users_twitch_id_fk
      references users (twitch_id)
        on update cascade on delete cascade,
  amount bigint default 0 not null,
  currency text not null,
  updated_at timestamp
);

create unique index if not exists balances_twitch_id_currency_uindex
  on balances (twitch_id, currency);
