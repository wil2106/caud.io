const config = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authService = require('../services/auth')
const userService = require('../services/user')
const { GeneralError, BadRequest } = require('../middlewares/errorClass')

const SAFEPASSWORDREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g

/**
 * @function login
 * @description connecte un utilisateur
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function login(req, res, next) {
  const { login, password } = req.body
  // Upon empty body, return error to middleware
  if (!req.body || !login || !password)
    return next(new BadRequest('Incomplete credentials.'))
  return authService
    .authenticate(req.body)
    .then(({ token, id }) => {
      res.send({
        success: true,
        data: { token, id },
      })
    })
    .catch((err) => {
      res.status(401).send({
        success: false,
        message: err.message,
      })
    })
}

/**
 * @function register
 * @description crée un compte utilisateur
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function register(req, res, next) {
  const { login, password } = req.body
  if (!req.body || !login || !password)
    return next(new BadRequest('Incomplete credentials.'))
  return userService
    .getUserByLogin(req.body.login)
    .then((exists) => {
      if (exists) {
        return res.status(409).send({
          success: false,
          message:
            'Registration failed. User with this login already registered.',
        })
      }

      if (!password.match(SAFEPASSWORDREGEX)) {
        return res.status(409).send({
          success: false,
          message:
            'Registration failed. Password should contain at least 1 digit, one lower case, one upper case and 8 characters',
        })
      }

      let user = {
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, config.saltRounds),
      }
      return userService
        .addUser(user)
        .then(() => res.send({ success: true }))
        .catch((err) => {
          next(new GeneralError('Internal Error'))
        })
    })
    .catch((err) => {
      next(new GeneralError('Internal Error'))
    })
}

/**
 * @exports
 */
module.exports = {
  login,
  register,
}
