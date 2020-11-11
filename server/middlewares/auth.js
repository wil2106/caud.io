const jwt = require('jsonwebtoken');
const config =  require('../config');

const checkAuth = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (!bearerHeader)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, config.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user = {
            login: decoded.login,
            id: decoded.id
        };
        next();
    });
}
module.exports = {
    checkAuth
}