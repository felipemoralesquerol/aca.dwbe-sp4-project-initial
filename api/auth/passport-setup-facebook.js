require('dotenv').config();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  //passReqToCallback:true,
  profileFields: ['id', 'emails', 'name'] 
},
function (accessToken, refreshToken, profile, done) {
  console.log('Use Facebook Strategy');
  
  //Setting particular
  const profileCustom = {
        email: profile._json.email,
        username: profile._json.email,
        name: profile._json.first_name + ' ' + profile._json.last_name,
        password: ''};

  return done(null, profileCustom);
}
));
