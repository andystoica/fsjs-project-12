function loggedOut(req, res, next) {
    
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    
    } else {
        return next();
    }
}

function requiresLogin(req, res, next) {
    
    if (!req.session.userId) {
        // ERROR 403: Not authorized
        var err = new Error('You are not authorized to view this page.');
        err.status = 403;
        return next(err);
    
    } else {
        return next();
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;