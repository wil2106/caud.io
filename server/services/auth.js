const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models').User
const config = require('../config')

/**
 * @function authenticate
 * @description Check login and password validation
 * @param {Object} params params
 * @returns
 */
const authenticate = (params) => {
  // Find login row
  return Users.findOne({
    where: {
      login: params.login,
    },
    raw: true,
  }).then(async (user) => {
    if (!user) throw new Error('Authentication failed. User not found.')
    // Validate password
    let isPasswordValid = !(await bcrypt.compare(
      params.password || '',
      user.password
    ))
    if (isPasswordValid)
      throw new Error('Authentication failed. Wrong password.')
    const payload = {
      login: user.login,
      id: user.id,
      time: new Date(),
    }
    let token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpireTime,
    })
    return { token, id: user.id }
  })
}

/**
 * Export
 */
module.exports = {
  authenticate,
}
