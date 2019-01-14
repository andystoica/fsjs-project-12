/**
 * Custom middleware to redirect logged in users
 * to their profile page when trying to access pages only
 * available to logged out users
 */
const loggedOut = (req, res, next) => {
    
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    
    } else {
        return next();
    }
}


/**
 * Custom middleware to check if a user is logged in or not
 * Responds with JSON for API calls or redirects to /login
 */
const requiresLogin = (req, res, next) => {

    if (!req.session.userId) {
        res.status(401);
        if (req.url.split('/')[1] == 'api') {
            // Return JSON if is an API call
            return res.json({ 
                error: {
                    status: 401,
                    message: 'User authentication required.'
                }
            });

        } else {
            // Return 401 and redirect to login otherwise
            return res.redirect('/login');
        }

    } else {
        return next();
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;