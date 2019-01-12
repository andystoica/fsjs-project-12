var express = require('express');
var router = express.Router();
var mw = require('../middleware');
var User = require('../models/user');


/** 
 * General pages available to all users
 */

// GET /
router.get('/', function (req, res, next) {
    return res.render('home', { pageTitle: 'Home' });
});
  
// GET /about
router.get('/about', function (req, res, next) {
    return res.render('about', { pageTitle: 'About' });
});



/**
 * User registration, loggin in and out
 */

// GET /signup
router.get('/signup', function (req, res, next) {
    return res.render('signup', { pageTitle: 'Register and account' });
});

// POST /signup
router.post('/signup', function (req, res, next) {

    if (req.body.email &&
        req.body.name &&
        req.body.password &&
        req.body.confirmPassword) {
      
    // Confirm password has been entered correclty twice
    if (req.body.password !== req.body.confirmPassword) {
        // ERROR 400: Passwords don't match
        let err = new Error('Passwords don\'t match.');
        err.status = 400;
        return next(err);
    }
  
    // Create the user data object
    let datetime = new Date();

    let userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        newsletter: req.body.newsletter ? true : false,
        registered: datetime.toISOString()
    }

    // Check if the user already exists first
    User.findOne({ email: req.body.email }, function (err, user) {
        
        if (err) {    
            // ERROR 500: Database system error.
            err.message = 'Database system error.'
            err.status = 500;
            return next(err);
        
        } else if (user !== null) {
            // ERROR 400: User already exists.
            err = new Error('User already registered.');
            err.status = 400;
            return next(err);
        
        } else {
            // Enter the user credentials into the database
            User.create(userData, function (err, user) {
                if (err) {
                    // ERROR 500: Database system error.
                    err.message = 'Database system error.'
                    err.status = 500;
                    return next(err);
                } else {
                    // Automatically login user and redirect to profile page
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });
        }
    });
  
    } else {
        // ERROR 400: All fields are required.
        var err = new Error('All fields are required.');
        err.status = 400;
        return next(err);
    }
});

// GET /login
router.get('/login', function (req, res, next) {
    return res.render('login', { pageTitle: 'Log in'});
});

// POST /login
router.post('/login', function (req, res, next) {
    
    if (!req.body.email || !req.body.password) {
        // ERROR 401: Both fields are required
        let err = new Error('Email and password fields are both required.');
        err.status = 401;
        return next(err);
    
    } else {
        User.authenticate(req.body.email, req.body.password, function (err, user) {
            
            if (err || !user) {
                // ERROR 401: Wrong email or password
                let err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            
            } else {
                // User has been authenticated, create a session
                req.session.userId = user._id;
                res.redirect('/tracker')
            }
        });
    }
});

// GET /logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                // ERROR 500: Session error.
                err.message = 'Unknow server error.'
                err.status = 500;
                return next(err);
            } else {
                res.redirect('/');
            }
        });
    }
});



/**
 * Restricted pages, only available to registered users
 */

// GET /tracker
router.get('/tracker', mw.requiresLogin, function (req, res, next) {
    return res.render('tracker', { pageTitle: 'Tracker' });
});

// GET /profile
router.get('/profile', mw.requiresLogin, function (req, res, next) {
    // Retreive user information
    User.findById(req.session.userId)
            .exec(function (err, user) {       
            if (err) {
                // ERROR 500: Database system error.
                err.message = 'Database system error.'
                err.status = 500;
                return next(err);
            } else {
                let date = new Date(user.registered);
                return res.render('profile', {
                    title: 'Profile',
                    name: user.name,
                    email: user.email,
                    registered: date.toUTCString(),
                    newsletter: user.newsletter ? 'Yes' : 'No'
              });
            }
    });
});

module.exports = router;
