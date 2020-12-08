const config =  require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authService = require('../services/auth');
const userService = require('../services/user');
const { GeneralError, BadRequest } = require('../middlewares/errorClass');

function login(req, res, next){
     const { login, password } = req.body
     if (!req.body || !login || !password) return next(new BadRequest('Incomplete credentials.'))
    return authService.authenticate(req.body)
    .then(token => {
         res.send({
              success: true,
              data: { token }
         });
    })
    .catch(err => {
         res.status(401).send({
              success: false,
              message: err.message 
         });
    })
};

function register(req, res, next){
     const { login, password } = req.body
     if (!req.body || !login || !password ) return next(new BadRequest('Incomplete credentials.'))
    return userService.getUserByLogin(req.body.login || '')
    .then(exists => {
         if (exists){
              return res.status(409).send({
                  success: false,
                  message: 'Registration failed. User with this login already registered.'
              });
         }
         let user = {
              login: req.body.login,
              password: bcrypt.hashSync(req.body.password, config.saltRounds)
          }
         return userService.addUser(user)
         .then(() => res.send({success: true}))
         .catch(err => next(new GeneralError('Internal Error')));
    })
    .catch(err => next(new GeneralError('Internal Error')));
};

module.exports = {
    login,
    register
}