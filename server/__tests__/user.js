// Constants
const { Client, Request: request } = require('./../test.config')
const userData = {
  id: 1,
  login: 'email@email.fr',
  description: 'email',
}

let token
let id

beforeAll(async () => {
  Client.connect()

  Client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })

  const res = await request.post('/api/login').send({
    login: 'email@email.fr',
    password: 'secret',
  })

  token = res.body.data.token
  id = res.body.data.id
})

// Test no token
it('Route not accessible without token', async (done) => {
  const req = await Promise.all([
    request.get('/api/user/' + id),
    request.get(`/api/user/${id}/musicIDs`),
    request.delete(`/api/user/delete/${id}`),
    request.put(`/api/user/update/${id}`),
  ])

  req.forEach((response) => {
    if (response.body.auth) {
      return
    }
  })

  return done()
})

it('GET /api/user/:id', async (done) => {
  const req = await request
    .get(`/api/user/${id}`)
    .set('Authorization', `bearer ${token}`)

  const { id: reqID, login, description } = req.body

  if (
    reqID === userData.id &&
    login === userData.login &&
    description === userData.description
  ) {
    return done()
  } else {
    return false
  }
})

it('GET /api/user/:id/musicIDs', async (done) => {
  const req = await request
    .get(`/api/user/${id}/musicIDs`)
    .set('Authorization', `bearer ${token}`)

  // Assert

  done()
})

// it('DELETE /user/delete/:id', async (done) => {})

// it('PUT /user/update/:id', async (done) => {})
