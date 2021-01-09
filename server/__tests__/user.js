// Constants
const { Client, Request: request } = require('./../test.config')
const bcrypt = require('bcrypt')

let token
let id

// Test setup
beforeAll(async () => {
  Client.connect()

  Promise.all([
    Client.query(
      `INSERT INTO public.users (id, login, password, description, "createdAt", "updatedAt") VALUES (1, 'email@email.fr', '$2b$04$M7vb/5cyQBDibj5eD/9nP.t3E4culxDwaoYZN2s4XR64SbrtADeIq', 'email', '2020-12-08 11:03:37.849000', '2020-12-08 11:03:37.849000');`
    ),
    Client.query(
      `INSERT INTO public.music (id, title, nb_likes, nb_forks, nb_listen, setup_code, step_code, can_fork, private, image, "createdAt", "updatedAt", fk_author) VALUES (100, 'test', 0, 0, 0, '123', '123', true, false, null, '2020-12-08 11:51:42.255000', '2020-12-08 11:51:42.255000', 1);`
    ),
  ])

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

  const dbQuery = await Client.query(`SELECT * FROM Users WHERE id=${id}`)

  const {
    login: testLogin,
    id: testID,
    description: testDescription,
  } = dbQuery.rows[0]

  if (
    reqID === testID &&
    login === testLogin &&
    description === testDescription
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

  const {
    title,
    nb_likes,
    nb_forks,
    nb_listen,
    setup_code,
    step_code,
    can_fork,
    private: reqPrivate,
    fk_author,
  } = req.body

  // Assert
  const dbQuery = await Client.query(`SELECT * FROM Users WHERE id=${id}`)

  const {
    title: dbTitle,
    nb_likes: dbLikes,
    nb_forks: dbForks,
    nb_listen: dbListens,
    setup_code: dbSetupCode,
    step_code: dbStepCode,
    can_fork: dbCanFork,
    private: dbPrivate,
    fk_author: dbFkAuthor,
  } = dbQuery.rows[0]

  if (
    title === dbTitle &&
    nb_likes === dbLikes &&
    nb_forks === dbForks &&
    nb_listen === dbListens &&
    setup_code === dbSetupCode &&
    step_code === dbStepCode &&
    can_fork === dbCanFork &&
    reqPrivate === dbPrivate &&
    fk_author === dbFkAuthor
  ) {
    done()
  }
})

it('DELETE /user/delete', async (done) => {
  await request
    .del(`/api/user/delete`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const dbQuery = await Client.query(`SELECT * FROM Users WHERE id=${id}`)

  if (!dbQuery.rows || !dbQuery.rows.length) done()
})

// it('PUT /user/update/:id', async (done) => {
//   await Client.query(
//     `INSERT INTO public.users (id, login, password, description, "createdAt", "updatedAt") VALUES (102, 'email@email.fr', '$2b$04$M7vb/5cyQBDibj5eD/9nP.t3E4culxDwaoYZN2s4XR64SbrtADeIq', 'email', '2020-12-08 11:03:37.849000', '2020-12-08 11:03:37.849000');`
//   )

//   await request
//     .del(`/api/user/102`)
// })


// Security test
// TODO: deleting another user than current one
// Clean up
afterAll(() => {
  Promise.all([

    // Client.query(`DELETE FROM Users WHERE id=${id}`),
    Client.query(`DELETE FROM Music WHERE id=100`),
  ]).then(() => Client.end())
})
