# ISS Location and Weather Tracker TODOs

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
- [ ] Mockup API and front end implementations of Google Maps
    - [x] Obtain Google API Key
    - [x] Build login restricted API call to return ISS coordinates
    - [x] Place single marker on Google Maps
    - [x] Place a series of markers on Google Maps
- [x] Implement ISS location tracking
    - [x] Save coordinates to db after every successful request
    - [ ] Display tracking history under user profile
- [x] Implement GoogleMaps location marker
    - [ ] Display all coordinate history for the currently logged user
- [x] Implement Weather information at marker
    - [x] Obtain weather information on that location and save to db
## External Hosting and Testing
- [ ] Test app with JSHint
- [ ] Heroku application hosting
- [ ] mLab application hosting
