const musicService = require('../services/music')
const libraryService = require('../services/library')
const sampleService = require('../services/sample')
const { GeneralError, NotFound } = require('../middlewares/errorClass')

const {
  getPagination,
  getPaginationData,
} = require('./../middlewares/pagination')

/**
 * @function createMusic
 * @description Création d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
async function createMusic(req, res, next) {
  const {
    title,
    setup_code,
    step_code,
    can_fork,
    private: isPrivate,
    image,
    fk_author,
    samples,
    bpm,
    nb_steps,
  } = req.body

  let imageBuffer = Buffer.from(image,"base64");

  let music = {
    title,
    nb_likes: 0,
    nb_forks: 0,
    nb_listen: 0,
    setup_code,
    step_code,
    can_fork,
    private: isPrivate,
    image: imageBuffer,
    fk_author,
    bpm,
    nb_steps,
  }

  let libraryData = []
  try {
    const data = await Promise.all([
      musicService.add(music),
      sampleService.addMultiple(samples),
    ])

    const musicData = data[0]
    const samplesData = data[1]

    samplesData.forEach(sample => {
      libraryData.push({musicId: musicData.id, sampleId: sample.dataValues.id })        
    });
    await libraryService.addMultiple(libraryData)
    .then( _ => {res.send("music added successfully")})
  } catch(err) {
    next(new GeneralError('Internal Error'))
  }
}

/**
 * @function deleteMusic
 * @description Suppression d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
async function deleteMusic(req, res, next) {
  let listSampleId = []
  const result = await libraryService.getUniqueSampleForMusic(req.params.id)
  result.forEach((sample) => {
    listSampleId.push(sample.sampleId)
  })
  Promise.all([
    sampleService.deleteSamples(listSampleId),
    musicService.deleteMusic(req.params.id), // automatically delete from libraries because tables are linked   
  ])
  .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function updateMusic
 * @descriptionMise à jour d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function updateMusic(req, res, next) {
  let music = {
    title: req.body.title,
    setup_code: req.body.setup_code,
    step_code: req.body.step_code,
    can_fork: req.body.can_fork,
    private: req.body.private,
    image: Buffer.from(req.body.image,"base64"),
    bpm: req.body.bpm,
    nb_steps: req.body.nb_steps
  }
  musicService.updateMusic(music, req.params.id)
  .then(data => res.send(data))
  .catch(err => {
    console.log(err)
    next(new GeneralError('Internal Error'))
  }
 );
  /*
  req.body.samples.forEach(sample => {
    sampleService.update(
      {
      title: sample.title,
      file:  sample.file
      },
      sample.id)
    .catch(err => next(new GeneralError('Internal Error')));    
  });
  */
}

/**
 * @function like
 * @description Ajout d'une mention "J'aime" à une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function like(req, res, next) {
  let notification = {
    action: req.body.action,
    fk_user: req.body.fk_user,
    fk_emitter: req.body.fk_emitter,
    fk_music: req.body.id,
  }
  musicService
    .like(req.body.id)
    .then((data) => {
      if (data === 0) return next(new NotFound('No music with this id'))
    })
    .catch((err) => next(new GeneralError('Internal Error')))
  musicService
    .notify(notification)
    .then((data) => res.send(data))
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function fork
 * @description Fork d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function fork(req, res, next) {
  let notification = {
    action: req.body.action,
    fk_user: req.body.fk_user,
    fk_emitter: req.body.fk_emitter,
    fk_music: req.body.id,
  }
  musicService
    .fork(req.body.id)
    .then((data) => {
      if (data === 0) return next(new NotFound('No music with this id'))
    })
    .catch((err) => next(new GeneralError('Internal Error')))
  musicService
    .notify(notification)
    .then((data) => res.send(data))
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function listen
 * @description Écoute d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function listen(req, res, next) {
  musicService
    .listen(req.body.id)
    .then((data) => {
      if (data === 0) {
        return res.status(404).send({ error: 'No music with this id' })
      }
      res.status(204).send()
    })
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function mostLike
 * @description Récupère les musiques les plus aimées
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostLike(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService
    .mostLike(limit, offset)
    .then((data) => {
      const response = getPaginationData(data, page, limit)
      res.send(response)
    })
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function mostRecent
 * @description Récupère les musiques les plus récentes
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostRecent(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService
    .mostRecent(limit, offset)
    .then((data) => {
      const response = getPaginationData(data, page, limit)
      res.send(response)
    })
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function mostFork
 * @description Récupère les musiques les plus Fork
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostFork(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService
    .mostFork(limit, offset)
    .then((data) => {
      const response = getPaginationData(data, page, limit)
      res.send(response)
    })
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function mostListen
 * @description Récupère les musiques les plus écoutées
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostListen(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService
    .mostListen(limit, offset)
    .then((data) => {
      const response = getPaginationData(data, page, limit)
      res.send(response)
    })
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function
 * @description Recherche de musiques par titre
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function searchTitle(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)

  musicService.searchTitle(req.params.search, limit, offset).then((data) => {
    let formatedList = data.map(((music)=>({...music.dataValues, image: Buffer.from(music.image).toString('base64')})))
    //const response = getPaginationData(formatedList, page, limit)
    res.send(formatedList)
  })
  .catch((err) => next(new GeneralError('Internal Error')))   
}

/**
 * @function getFullMusic
 * @description Récupère une musique complète
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getFullMusic(req, res, next) {
  let fullMusic = {
    music: null,
    samples: [],
  }
  Promise.all([
    musicService.fullMusic(req.params.id),
    libraryService.getSamplesForMusic(req.params.id),
  ])
    .then((data) => {
      if (data[0].length === 0)
        return next(new NotFound('the music is either non-existent or private'))

      fullMusic.music = data[0]
      sampleService.getByIds(data[1].map((x) => x.dataValues.sampleId))
      .then((samplesData) => {
        samplesData.forEach((sampleData) => {
          fullMusic.samples.push(sampleData)
        })
        res.send(fullMusic)
      })
      .catch((err) => next(new GeneralError('Internal Error')))
    })
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function
 * @description Récupère le contenue d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getMusicContent(req, res, next) {
  let musicContent = {
    music: null,
    samples: [],
  }
  Promise.all([
    musicService.musicContent(req.params.id),
    libraryService.getSamplesForMusic(req.params.id),
  ])
    .then((data) => {
      if (data[0].length === 0)
        return next(new NotFound('the music is either non-existent or private'))

      musicContent.music = data[0]
      Promise.all(
        data[1]
          .map((x) => x.dataValues.sampleId)
          .map((s) => {
            return sampleService.getById(s)
          })
      )
        .then((samplesData) => {
          samplesData.forEach((sampleData) => {
            musicContent.samples.push(sampleData)
          })
          res.send(musicContent)
        })
        .catch((err) => next(new GeneralError('Internal Error')))
    })
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function
 * @description Récupère plusieurs musiques dans une liste
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 * @async
 */
async function getListOfMusic(req, res, next) {
  if(!req.body.ids || req.body.ids.length === 0) { return res.status(404).send("no id provided") }
  try {
    const data = await musicService.fullMusics(req.body.ids)
    if (!data || !data.length) next(new NotFound('Empty result'))
    return res.status(200).send({
      data: data,
    })
  } catch (err) {
    console.log(err)
    return next(new GeneralError('Unknown'))
  }
}

/**
 * @exports
 */
module.exports = {
  createMusic,
  updateMusic,
  like,
  listen,
  fork,
  mostLike,
  mostRecent,
  mostFork,
  mostListen,
  searchTitle,
  getFullMusic,
  getMusicContent,
  deleteMusic,
  getListOfMusic,
}
