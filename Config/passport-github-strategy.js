const passport = require('passport');
const GithubStratgey = require('passport-github2').Strategy;
const crypto = require('crypto');
const User = require('../model/user');

passport.use(new GithubStratgey({
    clientID: '90f197eb90f33e494494',
    clientSecret: 'fc15d2456786087d3697caacab380abb15eca2be',
    callbackURL: 'http://localhost:8000/user/auth/github/callback',
    scope: ['user:email'],

},
function (accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value }).then(user => {
        
        console.log(profile)
        console.log(profile.photos[0].value)
        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                avtar: profile.photos[0].value
                
            }).then(user => {
                return done(null, user);
            }).catch(err => {
                console.log("There is problem with Creation User", err);
                return;
            })
        }
    }).catch(err => {
        console.log("there is problem with finding user in google oauth", err);
        return;
    })
}
))


module.exports= passport;
