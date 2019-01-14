# ISS Location and Weather Tracker TODOs

ISS Tracker is a simple demonstrative app created in node.js for the Treehouse Full Stack Techdegree.

It uses a variety of technologies covered in numerous web development courses in this techdegree, including Express for routing, Pug as a templating engine as well Mongodb and mongoose for database storage.

The responsive front end has been built on a customised version of popular Bootstrap 4 framework. The application features a complete user registration / login system implemented with express-session and allows different levels of access to public and registered users.

ISS tracker uses the open-notify.org API to track the position of the ISS, fetches ground level weather data from the Dark Sky API and displays that information using markers and information windows through the Google Map Javascript API.

## HTML Templates
- [x] Design master template using bootstrap
- [x] Navigtation elements
- [x] Main page area and footer
- [x] Custom styling

## node.js and Express
- [x] Convert templates to PUG
- [x] Create routes and implement main templates

## User authentication
- [x] Implement MongoDB / mongoose to save user account information
- [x] Implement user registration
- [x] Implement user profile
- [x] Implement user logout
- [x] Implement user login
- [x] Implement user delete account
- [x] Implement session store with MongoDB

## External APIs
- [x] Mockup API and front end implementations of Google Maps
    - [x] Obtain Google API Key
    - [x] Build login restricted API call to return ISS coordinates
    - [x] Place single marker on Google Maps
    - [x] Place a series of markers on Google Maps
- [x] Implement ISS location tracking
    - [x] Save coordinates to db after every successful request
- [x] Implement GoogleMaps location marker
- [x] Implement Weather information at marker
    - [x] Obtain weather information on that location and save to db

## External Hosting and Testing
- [x] Test app with JSHint
- [x] Heroku application hosting
- [x] mLab application hosting

## Bug fixes and maintenance
- [x] Icon size on mobile devices is too large and popups don't show up
- [x] Adjust font size in information windows on small screens
- [x] Data / Time information doesn't format correctly in user profile
- [x] maxZoom level adjusted to 8
- [x] Generate Production Google Map Key 
- [x] Add about us content
- [x] Greate github repository and upload project online