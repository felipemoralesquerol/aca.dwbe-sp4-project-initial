require('dotenv').config();

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  scope: ['r_emailaddress', 'r_basicprofile', 'rw_nus'],
  profileFields: ['id', 'first-name', 'last-name', 'email-address','public-profile-url']
   
},
function (accessToken, refreshToken, profile, done) {
  console.log('Use LinkedIn Strategy');

  //Setting particular
  const profileCustom = {
        email:profile.emails[0].value,
        username: profile.emails[0].value,
        name: profile.displayName,
        password: ''};


  return done(null, profileCustom);
}
));
