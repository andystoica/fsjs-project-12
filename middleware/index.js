function loggedOut(req, res, next) {
    
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    
    } else {
        return next();
    }
}

function requiresLogin(req, res, next) {
    
    if (!req.session.userId) {
        return res.redirect('/login');
    } else {
        return next();
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;