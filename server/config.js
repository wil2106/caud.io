require('dotenv').config()
module.exports = {
  port: 5000,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: 2,
  tokenExpireTime: '1h',
}
