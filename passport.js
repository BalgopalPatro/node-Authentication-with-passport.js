const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
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

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'helloBg'
},
    function (jwtPayload, done) {
        console.log(jwtPayload);
        return done(null, { email: "patrobg18@gmail.com", password: "1234" });
    }
));

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {
    console.log(id);  
    done(null, { email: "patrobg18@gmail.com", password: "1234" });
  });

module.exports = passport;

