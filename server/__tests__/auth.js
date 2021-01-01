const app = require('./../App')
const supertest = require('supertest')
const request = supertest(app)

it('Gets the test endpoint', async (done) => {
  const res = await request.get('/api/test')

  if (res.text === 'hello world') done()
})

// Success case
it('Auth with good credentials', async (done) => {
  const res = await request.post('/api/login').send({
    login: 'email@email.fr',
    password: 'secret',
  })
  if (res.body.data.token) done()
})

it('Register success', async (done) => {
  const res = await request.post('/api/register').send({
    login: 'positiveTest@email.fr',
    password: 'Secret123',
  })

  if (res.body.success) done()
})

// Negative case
it('Auth with empty password', async (done) => {
  const res = await request.post('/api/login').send({
    login: 'test',
    password: '',
  })
  if (res.body.status === 'error') done()
})

it('Auth with empty login', async (done) => {
  const res = await request.post('/api/login').send({
    login: '',
    password: 'secret',
  })
  if (res.body.status === 'error') done()
})

it('Auth with wrong credentials', async (done) => {
  const res = await request.post('/api/login').send({
    login: 'positiveTest@email.fr',
    password: 'wrongPassword',
  })
  if (!res.body.success) done()
})

it('Register with empty login', async (done) => {
  const res = await request.post('/api/login').send({
    login: '',
    password: '',
  })

  if (!res.body.success) done()
})

it('Register with empty login', async (done) => {
  const res = await request.post('/api/login').send({
    login: '',
    password: 'secret',
  })

  if (!res.body.success) done()
})

it('Register with registered login', async (done) => {
  const res = await request.post('/api/register').send({
    login: '',
    password: '',
  })

  if (!res.body.success) done()
})

// Test password validation
it('Register with incorrect password without digits', async (done) => {
  const res = await request.post('/api/register').send({
    login: 'testPassword@test.fr',
    password: 'secretpassword',
  })

  if (!res.body.success) done()
})

it('Register with incorrect password length', async (done) => {
  const res = await request.post('/api/register').send({
    login: 'testPassword@test.fr',
    password: 'secret',
  })

  if (!res.body.success) done()
})

it('Register with incorrect password without uppercase', async (done) => {
  const res = await request.post('/api/register').send({
    login: 'testPassword@test.fr',
    password: 'secreted',
  })

  if (!res.body.success) done()
})

it('Register with incorrect password without lower', async (done) => {
  const res = await request.post('/api/register').send({
    login: 'testPassword@test.fr',
    password: 'SECRETED',
  })

  if (!res.body.success) done()
})