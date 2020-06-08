const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const users = [{ "user": { email: "patrobg18@gmail.com", password: "1234" } }, { "user": { email: "bg@123.com", password: "1234" } }];

passport.use(new LocalStratergy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {

    // if (email != "bg@123.com" && password != "1234") {
    //     return cb(null, false, { message: 'Incorrest Details' })
    // }
    return cb(null, { email: "bg@123.com", password: "1234" } , { message: 'loged in successfully ' });

}));

function findUser(email, password) {
    return (users.filter(function (chain) {
        return chain.user.email === email && chain.user.password === password;
    })[0].user).then((user) => { return user });
}

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'helloBg'
},
function (jwtPayload, cb) {
    console.log(jwtPayload);
    return cb(null,  { email: "patrobg18@gmail.com", password: "1234" });
}
));

module.exports = passport;