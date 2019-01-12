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

// GET /profile
router.get('/profile', function (req, res, next) {
    return res.render('profile', { pageTitle: 'Profile' });
});

module.exports = router;
