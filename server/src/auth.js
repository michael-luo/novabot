const passport = require('passport')
const TwitchStrategy = require('passport-twitch').Strategy

// Postgresql connection
var knex = require('./knex')

passport.use(new TwitchStrategy({
  clientID: process.env.TWITCH_CLIENT_ID,
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
  callbackURL: process.env.TWITCH_CALLBACK_URL,
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