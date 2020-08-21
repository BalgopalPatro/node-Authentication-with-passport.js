module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');
    }
  };
  
  
//Facebook Authentication

// router.get('/facebook',
//     passport.authenticate('facebook'));

// router.get('/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/success');
//     });

// module.exports = router;