const express = require('express');
const router = express.Router();
const request = require('request-promise-native');
const moment = require('moment');
const mw = require('../middleware');
const User = require('../models/user');


// GET /api/location
router.get('/api/location', mw.requiresLogin, function (req, res, next) {

    const issAPI = 'http://api.open-notify.org/iss-now.json';
    const darkSkyAPI = 'https://api.darksky.net/forecast';
    const darkSkyOptions = 'exclude=minutely,hourly,daily,flags,alerts&units=si';
    
    async function getMarker() {
        // Obtain ISS location coordinates
        let iss = JSON.parse(await request(issAPI));
        
        // Obtain local weather information
        let darkSkyEndPoint = darkSkyAPI + '/' +
                process.env.DARKSKY_API_KEY + '/' +
                iss.iss_position.latitude + ',' + iss.iss_position.longitude + '?' +
                darkSkyOptions;
        let weather = JSON.parse(await request(darkSkyEndPoint));
    
        // Build marker object with relevant information
        let marker = {
            weather: weather.currently.temperature.toFixed(1) + '˚C ' + weather.currently.summary,
            timestamp: iss.timestamp.toString(),
            date: moment(iss.timestamp.toString(), 'X').format('D MMM YYYY'),
            time: moment(iss.timestamp.toString(), 'X').format('k:mm'),
            lat: parseFloat(iss.iss_position.latitude),
            lng: parseFloat(iss.iss_position.longitude),
        }
        return marker;
    }
    
    getMarker()
        .then((marker) => {

            User.updateOne({ _id: req.session.userId }, { lastTracked: marker }, function(err) {
                if (err) {
                    // ERROR 500: Database system error.
                    err.message = 'Database system error.';
                    err.status= 500;
                    return next(err);
                } else {
                    return res.json(marker);
                }
            });
        })
        .catch((err) => {
            // Handle all HTTP client errors with 500
            res.status(500);   
            return res.json({ error: 'Can not locate the ISS at the moment. Please try again later.' });
        });
});

module.exports = router;