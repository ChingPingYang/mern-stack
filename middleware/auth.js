const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    // grab token from header
    const token = req.header('auth-token');
    if(!token) {
        return res.status(403).json({msg: 'No token provided'});
    }
    // use try and catch to write callback in jwt.veriy
    try {
        const decoded = jwt.verify(token, config.get('JWT'));
        req.userId = decoded._id;
        next()
    } catch(err) {
        if(err) return res.status(403);
    }
}
module.exports = auth;
