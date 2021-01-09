const { Client, Request: request } = require('./../test.config')

beforeAll(() => {
  Client.connect()

  Client.query(
    `INSERT INTO public.users (id, login, password, description, "createdAt", "updatedAt") 
    VALUES (100, 'testEmail@email.io', '$2b$04$M7vb/5cyQBDibj5eD/9nP.t3E4culxDwaoYZN2s4XR64SbrtADeIq', null, '2020-12-08 17:03:08.350000', '2020-12-08 17:03:08.350000');`,
    (err, res) => {
      console.log(err)
    }
  )
})

// Success case
it('Auth with good credentials', async (done) => {
  const res = await request.post('/api/login').send({
    login: 'testEmail@email.io',
    password: 'secret',
  })
  if (res.body.data.token) done()
})

it('Register success', async (done) => {
  const res = await request.post('/api/register').send({
    login: 'registerTest@email.io',
    password: 'Secret123',
  })
  const dbQuery = await Client.query(
    `SELECT * FROM Users WHERE login='registerTest@email.io'`
  )
  if (dbQuery.rows[0] && res.body.success) return done()
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

// Clean up

afterAll(() => {
  Promise.all([
    Client.query(`DELETE FROM Users WHERE id=100`),
    Client.query(`DELETE FROM Users WHERE login='registerTest@email.io'`),
  ]).then(() => Client.end())
})