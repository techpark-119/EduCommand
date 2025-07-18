const rememberMeMiddleware = (req, res, next) => {
    if (req.cookies.rememberMe) {
        const adminCredentials = JSON.parse(req.cookies.rememberMe);
        req.session.user = adminCredentials;
    }
    next();
};

module.exports = rememberMeMiddleware;