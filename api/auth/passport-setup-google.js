require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  console.log('serialize');
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log('deserialize');
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
  console.log('Use GoogleStrategy');
  //console.log(profile.user);

  //Setting particular
  const profileCustom = {
        email: profile._json.email,
        username: profile._json.email,
        name: profile._json.name,
        password: ''};

  return done(null, profileCustom);
}
));
