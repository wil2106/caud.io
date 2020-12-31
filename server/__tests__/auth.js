const app = require('./../App')
const supertest = require('supertest')
const request = supertest(app)

it('Gets the test endpoint', async (done) => {
  const res = await request.get('/api/test')

  if (res.text === 'hello world') done()
})

// Success case
it('Test auth with good credentials', async (done) => {
  const res = await request.post('/api/login').send({
    login: 'email@email.fr',
    password: 'secret',
  })
  if (res.body.data.token) done()
})

// Negative case
it('Test auth with bad credentials', async (done) => {
  const res = await request.post('/api/login').send({
    login: '',
    password: '',
  })
  if (res.body.status === 'error') done()
})
