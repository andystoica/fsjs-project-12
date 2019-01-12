var express = require('express');
var router = express.Router();
var mw = require('../middleware');
var User = require('../models/user');


/** 
 * General pages available to all users
 */

// GET /
router.get('/', function (req, res, next) {
    return res.render('index', { title: 'Home' });
});
  
// GET /about
router.get('/about', function (req, res, next) {
    return res.render('about', { title: 'About' });
});

module.exports = router;
