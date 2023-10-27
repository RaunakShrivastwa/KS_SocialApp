// const passport = require('passport');
// const LinkedInStrategy = require('passport-facebook').Strategy;
// const crypto = require('crypto');
// const User = require('../model/user');

// passport.use(new LinkedInStrategy({
//     clientID: '800085881897378',
//     clientSecret: '802c99df445f330196bee1b7f888721b',
//     callbackURL: 'https://localhost:8000/user/auth/facebook/callback'
// }, function (token, tokenSecret, profile, done) {
//     User.findOne({ email: profile.emails[0].value }).then(user => {
//         console.log(profile);
//         console.log(profile.photos[0].value);
//         if (user) {
//             return done(null, user);
//         } else {
//             User.create({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 password: crypto.randomBytes(20).toString('hex'),
//                 avatar: User.avatarPath + '/' + profile.photos[0].value
//             }).then(newUser => {
//                 return done(null, newUser);
//             }).catch(err => {
//                 console.log("There is a problem with creating a new user", err);
//                 return done(err);
//             });
//         }
//     }).catch(err => {
//         console.log("There is a problem with finding the user in LinkedIn authentication", err);
//         return done(err);
//     });
// }));
