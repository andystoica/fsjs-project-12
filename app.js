var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();



/**
 * Database and session management
 */

// mongodb connection
mongoose.connect("mongodb://localhost:27017/isstrack", { useNewUrlParser: true });
var db = mongoose.connection;

// mongodb error handling
db.on('error', console.error.bind(console, 'connection: error:'));

// use sessions for tracking logins
app.use(session({
  secret: 'super secret passphrase',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// make user ID available globally
app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
  });



/**
 * Static content and default routes
 */
  
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');



/**
 * Error handling
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// catch all error handler, the last middleware
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.status + ' - ' + err.message,
        error: {}
    });
});


/**
 * Fire up the Express server on port 8000
 */
app.listen(8000, function () {
    console.log('ISS Tracker server listening on port 8000');
});