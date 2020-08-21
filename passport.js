const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
FacebookStrategy = require('passport-facebook');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require('bcryptjs');

const User = require('./models/User')

passport.use(new LocalStratergy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {

    User.findOne({
        email: email
    }).then((user) => {
        if (!user) {
            return done(null, false, { message: 'That email is not registered' });
        }

        console.log(user);
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                console.log(err);
            }
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect Password' })
            }
        })
    });

}));

//Facebook statergy
// passport.use(new FacebookStrategy({
//     clientID: 254188742649333,
//     clientSecret: "c6fc8df3302c4e0e104fde6ee1e26f6d",
//     callbackURL: "/auth/facebook/callback"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         console.log(accessToken, refreshToken, profile)
//         // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(null, profile);
//         // });
//     }
// ));

// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'helloBg'
// },
//     function (jwtPayload, done) {
//         console.log(jwtPayload);
//         return done(null, { email: "bg@123.com", password: "1234" });
//     }
// ));

passport.serializeUser(function (user, done) {
    console.log("During serialize ", user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log("During deserialize ", id);
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;

