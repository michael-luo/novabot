const passport = require('passport')
const TwitchStrategy = require('passport-twitch').Strategy

// Retrieve our encrypted secrets depending on the environment
const config = require('config')

// Postgresql connection
var knex = require('knex')({
  client: 'pg',
  connection: config.get('postgres')
});

passport.use(new TwitchStrategy({
  clientID: config.get('twitch.clientID'),
  clientSecret: config.get('twitch.clientSecret'),
  callbackURL: config.get('twitch.authCallbackURL'),
  scope: 'user_read'
}, (accessToken, refreshToken, profile, done) => {
  // Upsert into users table
  knex.raw(`
    INSERT INTO users
      (twitch_id)
    VALUES
      (${profile.id})
    ON CONFLICT (twitch_id) DO UPDATE SET
      updated_at = now() at time zone 'utc'
    WHERE users.twitch_id = '${profile.id}'
    RETURNING *`)
  .then((rows, err) => {
    return done(err, profile)
  })
}))

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport