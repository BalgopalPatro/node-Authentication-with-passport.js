const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { authenticate } = require('passport');


router.post('/login', function (req, res, next) {

    passport.authenticate('local', { session: false }, (err, user, info) => {

        console.log(user);
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: true }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, 'helloBg');
            //    req.session.token = token ; 
            res.header.token = token;
            console.log(req.isAuthenticated());
            console.log(req.user);
            return res.render('home', { token: token })
            // res.redirect('/user/')
        });
    })(req, res);
});

//Facebook Authentication

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/success');
    });

module.exports = router;