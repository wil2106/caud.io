const { Client, Request: request } = require('./../test.config')
  
  let token

beforeAll(async () => {
  await Client.connect()

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
        INSERT INTO public.libraries(
            "createdAt", "updatedAt", "musicId", "sampleId")
            VALUES ('2004-12-08 17:03:08.350000', '2004-12-08 17:03:08.350000', 2, 1);
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

it('GET /api/music/list', async (done) => {
    const req = await request
      .get(`/api/music/list`)
      .send({'ids': [1, 2]})
  
    const data = req.body.data;
    if ((data[0].id === 1 && data[1].id === 2) || (data[0].id === 2 && data[1].id === 1)) {
      return done()
    }
})

it('GET /api/music/full/:id', async (done) => {
    const req = await request
      .get(`/api/music/full/3`)
  
    const data = req.body.music[0];
    if (data.id === 3) {
      return done()
    }
})

it('GET /api/music/mostLike', async (done) => {
    const req = await request
      .get(`/api/music/mostLike`)
  
    const data = req.body.data;
    if (data[0].id === 2 && data[1].id === 3) {
      return done()
    }
})

it('GET /api/music/mostRecent', async (done) => {
    const req = await request
      .get(`/api/music/mostRecent`)
  
    const data = req.body.data;
    if (data[0].id === 1 && data[1].id === 2) {
      return done()
    }
})

it('GET /api/music/mostFork', async (done) => {
    const req = await request
      .get(`/api/music/mostFork`)
  
    const data = req.body.data;
    if (data[0].id === 3 && data[1].id === 1) {
      return done()
    }
})

it('GET /api/music/mostListen', async (done) => {
    const req = await request
      .get(`/api/music/mostListen`)
  
    const data = req.body.data;
    if (data[0].id === 1 && data[1].id === 3) {
      return done()
    }
})

it('GET /api/music/content/:id', async (done) => {
    const req = await request
      .get(`/api/music/content/2`)
  
    const data = req.body;
    if (data.samples[0].id === 1 && !data.music[0].id) {
      return done()
    }
})

it('GET /api/music/searchTitle/:search', async (done) => {
    const req = await request
      .get(`/api/music/searchTitle/new`)
  
    const data = req.body[0];
    if (data.id === 1) {
      return done()
    }
})

it('POST /api/music/like', async (done) => {
    await request
      .post(`/api/music/like`)
      .send({
                'id': 2,
                'action': "action",
                'fk_user': 1,
                'fk_emitter': 1
            })
      .set('Authorization', `bearer ${token}`)

    const result = await Client.query('SELECT * FROM music WHERE id=2')
    if(result.rows[0].nb_likes === 3)
        return done()
})

it('POST /api/music/fork', async (done) => {
    await request
      .post(`/api/music/fork`)
      .send({
                'id': 3,
                'action': "action",
                'fk_user': 1,
                'fk_emitter': 1
            })
      .set('Authorization', `bearer ${token}`)

    const result = await Client.query('SELECT * FROM music WHERE id=3')
    if(result.rows[0].nb_forks === 3)
        return done()
})

it('POST /api/music', async (done) => {
    await request
      .post(`/api/music`)
      .send({
        title: "mamusique",
        setup_code: "monconde",
        step_code: "moncode",
        can_fork: true,
        private: false,
        image: "E'\\001'",
        fk_author: 1,
        samples: [],
        bpm: 90,
        nb_steps: 30,
            })
      .set('Authorization', `bearer ${token}`)

    const result = await Client.query('SELECT * FROM music WHERE title=\'mamusique\'')
    if(result.rows[0].title === 'mamusique')
        return done()
})

it('POST /api/music/listen', async (done) => {
    await request
      .post(`/api/music/listen`)
      .send({'id': 1})
      .set('Authorization', `bearer ${token}`)

    const result = await Client.query('SELECT * FROM music WHERE id=1')
    if(result.rows[0].nb_listen === 3)
        return done()
})

it('PUT /api/music/update/:id', async (done) => {
    await request
      .put(`/api/music/update/1`)
      .send({
        title: "mamusique",
        setup_code: "monconde",
        step_code: "moncode",
        can_fork: true,
        private: false,
        image: "E'\\001'",
        fk_author: 1,
        samples: [],
        bpm: 90,
        nb_steps: 30,
            })
      .set('Authorization', `bearer ${token}`)

    const result = await Client.query('SELECT * FROM music WHERE id=1')
    if(result.rows[0].title === 'mamusique')
        return done()
})

/*it('DELETE /api/music/delete/:id', async (done) => {
    const req = await request
      .del(`/api/music/delete/1`)
      .set('Authorization', `bearer ${token}`)

    const result = await Client.query('SELECT * FROM music WHERE id=1')
    console.log(result.rows)
        return done()
})*/