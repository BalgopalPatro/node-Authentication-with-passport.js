const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
FacebookStrategy = require('passport-facebook');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const user = { email: "bg@123.com", password: "1234" };

passport.use(new LocalStratergy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    console.log(email, password);
    if (email == "bg@123.com") {
        if (password == "1234") {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } else {
        return done(null, false, { message: 'Incorrect username.' });
    }

}));

//Facebook statergy
passport.use(new FacebookStrategy({
    clientID: 254188742649333,
    clientSecret: "c6fc8df3302c4e0e104fde6ee1e26f6d",
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken, profile)
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(null, profile);
    // });
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'helloBg'
},
    function (jwtPayload, done) {
        console.log(jwtPayload);
        return done(null, { email: "bg@123.com", password: "1234" });
    }
));

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {
    console.log(id);  
    done(null, { email: "bg@123.com", password: "1234" });
  });

module.exports = passport;

