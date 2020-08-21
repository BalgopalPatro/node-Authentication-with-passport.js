const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors')({ origin: true });
const app = express();
const bodyparser = require('body-parser');

const flash = require('connect-flash');

require('./db/connect');

const passport = require('./passport');
const auth = require('./routes/auth');
const user = require('./routes/user');

app.use(session({
    secret: "helloBg",
    resave: true,
    saveUninitialized: true
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(cors);

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

// app.use('/user', passport.authenticate('jwt', { session: true }), user);
// app.use('/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})