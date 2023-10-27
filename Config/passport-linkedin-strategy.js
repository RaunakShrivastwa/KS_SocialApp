// const passport = require('passport');
// const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
// const crypto = require('crypto');
// const User = require('../model/user');
// passport.use(new LinkedInStrategy({
//     clientID: '776ip5ddlsbpiq',
//     clientSecret: 'xtVMf27qakaxM8MT',
//     callbackURL: 'http://localhost:8000/user/auth1/linkedin/callback',
//     scope: ['r_emailaddress', 'r_liteprofile'],
// }, function (token, tokenSecret, profile, done) {
//     console.log(profile)
//     return;
    // User.findOne({ email: profile.emails[0].value }).then(user => {
    //     console.log(profile);
    //     console.log(profile.photos[0].value);
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         User.create({
    //             name: profile.displayName,
    //             email: profile.emails[0].value,
    //             password: crypto.randomBytes(20).toString('hex'),
    //             avatar: User.avatarPath + '/' + profile.photos[0].value
    //         }).then(newUser => {
    //             return done(null, newUser);
    //         }).catch(err => {
    //             console.log("There is a problem with creating a new user", err);
    //             return done(err);
    //         });
    //     }
    // }).catch(err => {
    //     console.log("There is a problem with finding the user in LinkedIn authentication", err);
    //     return done(err);
    // });
//}));

var LinkedInStrategy = require('passport-linkedin-oauth2').OAuth2Strategy;
const passport= require('passport')


passport.serializeUser(function(user,done){
    return done(null,user);
})

passport.deserializeUser(function(user,done){
    return done(null,user);
});

passport.use(new LinkedInStrategy({
  clientID: '77swx09f118q81',
  clientSecret: '29KezAToPv4iiEYD',
  callbackURL: "http://localhost:8000/user/auth/linkedin/callback",
  scope: ['openid', 'profile','email'],
  state: true, // Enable state parameter to receive the access token
  profileFields: ['id', 'first-name', 'last-name', 'email-address'],// Define the profile fields you want to retrieve
  
}, function(accessToken, refreshToken, profile, done) {
  console.log("inside here")
  process.nextTick(function () {
    console.log(profile)
    return done(null, profile);
  });
}));

module.exports= passport;