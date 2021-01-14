const { Client, Request: request } = require('./../test.config')
  
  let token

beforeAll(async () => {
  await Client.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('connected')
      }
    }
  )

  await Client.query(
    `INSERT INTO public.users (id, login, password, description, "createdAt", "updatedAt") 
    VALUES (1, 'testEmail@email.io', '$2b$04$M7vb/5cyQBDibj5eD/9nP.t3E4culxDwaoYZN2s4XR64SbrtADeIq', null, '2020-12-08 17:03:08.350000', '2020-12-08 17:03:08.350000');`
  )

  const res = await request.post('/api/login').send({
    login: 'testEmail@email.io',
    password: 'secret',
  })

  token = res.body.data.token
})

beforeEach(async () => {
    await Client.query(
        `
        INSERT INTO public.music(
            id, title, nb_likes, nb_forks, nb_listen, setup_code, step_code, can_fork, private, image, "createdAt", "updatedAt", fk_author)
            VALUES (1, 'newtest', 0, 1, 2,'setup_code', 'step_code', true, false, E'\\001','2020-12-08 17:03:08.350000', '2020-12-08 17:03:08.350000', 1);
        INSERT INTO public.music(
            id, title, nb_likes, nb_forks, nb_listen, setup_code, step_code, can_fork, private, image, "createdAt", "updatedAt", fk_author)
            VALUES (2, 'test', 2, 0, 0, 'setup_code', 'step_code', true, false, E'\\001','2004-12-08 17:03:08.350000', '2004-12-08 17:03:08.350000', 1);
        INSERT INTO public.music(
            id, title, nb_likes, nb_forks, nb_listen, setup_code, step_code, can_fork, private, image, "createdAt", "updatedAt", fk_author)
            VALUES (3, 'oldtest', 1, 2, 1, 'setup_code', 'step_code', true, false, E'\\001','2002-12-08 17:03:08.350000', '2002-12-08 17:03:08.350000', 1);
        INSERT INTO public.samples(
            id, title, file, "createdAt", "updatedAt")
            VALUES (1, 'sampleTest', E'\\001', '2004-12-08 17:03:08.350000', '2004-12-08 17:03:08.350000');
        INSERT INTO public.samples(
            id, title, file, "createdAt", "updatedAt")
            VALUES (2, 'bestSample', E'\\001', '2005-12-08 17:03:08.350000', '2005-12-08 17:03:08.350000');
        INSERT INTO public.libraries(
            "createdAt", "updatedAt", "musicId", "sampleId")
            VALUES ('2004-12-08 17:03:08.350000', '2004-12-08 17:03:08.350000', 2, 1);
        INSERT INTO public.libraries(
            "createdAt", "updatedAt", "musicId", "sampleId")
            VALUES ('2004-12-08 17:03:08.350000', '2004-12-08 17:03:08.350000', 1, 2);
        `
      )
})

afterEach(async () => {
    await Client.query(
        `Truncate music Cascade; Truncate samples Cascade;`
      )
})

afterAll(async () => {
    await Client.query(
        `Truncate users Cascade;`
      )
    await Client.end()
})

it('GET /api/libraries', async (done) => {
    const req = await request
      .get(`/api/libraries`)
  
    const data = req.body
    if (data.length === 2) {
      return done()
    }
})

it('POST /api/library', async (done) => {
    await request
      .post(`/api/library`)
      .send({musicId: 1, sampleId: 1})
      .set('Authorization', `bearer ${token}`)
  
    const data = await Client.query(`SELECT * FROM public.libraries WHERE "musicId"=1 AND "sampleId"=1;`)
    if (data.rowCount === 1) {
      return done()
    }
})