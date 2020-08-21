const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('./auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;

// app.get('/', (req, res) => {
//     console.log(req.isAuthenticated());
//     // console.log(req.user);
//     if(req.isAuthenticated()){
//         // res.redirect('/success');
//         res.render('home')
//     }
//     res.render('index');
// })
// app.get('/success', (req, res) => {
//     res.json({ message: "You Are Already Logged in" });
// })
