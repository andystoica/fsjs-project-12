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

// GET /login
router.get('/login', function (req, res, next) {
    return res.render('login', { pageTitle: 'Log in' });
});

// GET /logout
router.get('/logout', function (req, res, next) {
    return res.send('Logged out ...');
});



/**
 * Restricted pages, only available to registered users
 */

// GET /profile
router.get('/profile', function (req, res, next) {
    return res.render('profile', { pageTitle: 'Profile' });
});


module.exports = router;
