const { Client } = require('pg')
const app = require('./App')
const supertest = require('supertest')
const request = supertest(app)

const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

module.exports = {
  Client: client,
  Request: request,
}
