const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dotenv = require('dotenv').config();

// Load environment variables and tnitialise application
const app = express();
const port = process.env.PORT || 8000;


/**
 * Database and session management
 */

// mongodb connection
mongoose.connect("mongodb://localhost:27017/isstrack", { useNewUrlParser: true });
const db = mongoose.connection;

// mongodb error handling
db.on('error', console.error.bind(console, 'connection: error:'));

// use sessions for tracking logins
app.use(session({
    secret: 'super secret passphrase',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
}));

// make user ID available globally
app.use((req, res, next) => {
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
const routes = require('./routes/main');
const api = require('./routes/api');
app.use('/', routes, api);

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');



/**
 * Error handling
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// catch all error handler, thsese last middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        pageTitle: 'Oops ...',
        error: err
    });
});



/**
 * Fire up the Express server on port 8000
 */
app.listen(port, () => {
    console.log('ISS Tracker server listening on port ' + port + ' ...');
});