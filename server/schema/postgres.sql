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
);

create unique index if not exists settings_user_id_uindex
  on settings (user_id);

create unique index if not exists settings_twitch_id_uindex
  on settings (twitch_id);

-- Add twitch username to users table
alter table users ADD twitch_username text;
create unique index if not exists users_twitch_username_uindex
  on users (twitch_username);