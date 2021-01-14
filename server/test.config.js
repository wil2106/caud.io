const { Client } = require('pg')
var fs = require('fs');
const app = require('./App')
const supertest = require('supertest')
const request = supertest(app)

var sql = fs.readFileSync('init_database.sql').toString();

const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

/*
client.connect()
client.query(sql, (err, res) => {
  if (err) throw err
  console.log(res)
  client.end()
})
*/

module.exports = {
  Client: client,
  Request: request,
}
