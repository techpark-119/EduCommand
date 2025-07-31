const fs = require('fs');

const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
};

module.exports = authMiddleware;