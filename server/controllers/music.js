const musicService = require('../services/music');
const libraryService = require('../services/library');
const sampleService = require('../services/sample');
const userService = require('../services/user');
const { GeneralError, BadRequest, NotFound } = require('../middlewares/errorClass');

const {
  getPagination,
  getPaginationData,
} = require('./../middlewares/pagination')


/**
 * Création d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function createMusic(req, res, next) {
  const {
    title,
    setup_code,
    step_code,
    can_fork,
    private,
    image,
    fk_author,
    samples,
  } = req.body

  let music = {
    title,
    nb_likes: 0,
    nb_forks: 0,
    nb_listen: 0,
    setup_code,
    step_code,
    can_fork,
    private,
    image,
    fk_author,
  }

  musicService.add(music)
  .then(musicData => {
    samples.forEach((sample) => {
      sampleService.add(sample)
      .then((sampleData) => {
        libraryService.add({ musicId: musicData.id, sampleId: sampleData.id })
        .catch(err => next(new GeneralError('Internal Error')));
      })
      .catch(err => next(new GeneralError('Internal Error')));
    })
  })
  .then(data => res.send(data))
  .catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Suppression d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function deleteMusic(req, res, next) {
  libraryService.getUniqueSampleForMusic(parseInt(req.params.id))
  .then(result => {
    result[0].forEach(sample => {
      sampleService.deleteSample(sample.sampleId)
      .catch(err => next(new GeneralError('Internal Error')));
    });
  })
  .then(musicService.deleteMusic(req.params.id).catch(err => next(new GeneralError('Internal Error'))))
  .then(libraryService.deleteLibraryForMusic(req.params.id).catch(err => next(new GeneralError('Internal Error'))))
  .then(data => res.send(data))
  .catch(err => next(new GeneralError('Internal Error')));
}


/**
 * Mise à jour d'une musique
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
    image: req.body.image
  }
  musicService.updateMusic(music, req.params.id)
  .then(data => res.send(data))
  .catch(err => next(new GeneralError('Internal Error')));

  req.body.samples.forEach(sample => {
    sampleService.update(
      {
      title: sample.title,
      file:  sample.file
      },
      sample.id)
    .catch(err => next(new GeneralError('Internal Error')));    
  });
}

/**
 * Ajout d'une mention "J'aime" à une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function like(req, res, next) {
  let notification = {
    action: req.body.action,
    fk_user: req.body.fk_user,
    fk_emitter: req.body.fk_emitter,
    fk_music: req.body.id

  }
  musicService.like(req.body.id).then(data => {
    if(data==0)
      return next(new NotFound('No music with this id'))
    
  })
  .catch(err => next(new GeneralError('Internal Error')));
  musicService.notify(notification).then(data => res.send(data))
  .catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Fork d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function fork(req, res, next) {
  let notification = {
    action: req.body.action,
    fk_user: req.body.fk_user,
    fk_emitter: req.body.fk_emitter,
    fk_music: req.body.id

  }
  musicService.fork(req.body.id).then(data => {
    if(data==0)
      return next(new NotFound('No music with this id'))
  })
  .catch(err => next(new GeneralError('Internal Error')));
  musicService.notify(notification).then(data => res.send(data))
  .catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Écoute d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function listen(req, res, next) {
  musicService.listen(req.body.id).then(data => {
    if (data==0) {
     return res.status(404).send({error: 'No music with this id'});
    }
    res.status(204).send();
   })
   .catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Récupère les musiques les plus aimées
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostLike(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostLike(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  }).catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Récupère les musiques les plus récentes
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostRecent(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostRecent(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  }).catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Récupère les musiques les plus Fork
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostFork(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostFork(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  }).catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Récupère les musiques les plus écoutées
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function mostListen(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostListen(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  }).catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Recherche de musiques par titre
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function searchTitle(req, res, next) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  Promise.all([
    musicService.searchTitle(req.params.search, limit, offset),
  ]).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  }).catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Récupère une musique complète
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getFullMusic(req, res, next) {
  let fullMusic = {
    music: null,
    samples: []
  }
  Promise.all([musicService.fullMusic(req.params.id), libraryService.getSamplesForMusic(req.params.id)])
  .then(data => {
    if(data[0].length == 0) 
      return next(new NotFound('the music is either non-existent or private'))
      
    fullMusic.music = data[0];
    Promise.all(data[1].map(x => x.dataValues.sampleId).map(s => {
      return sampleService.getById(s);
    }))
    .then(samplesData => {
      samplesData.forEach(sampleData => {
        fullMusic.samples.push(sampleData);
      })
      res.send(fullMusic);
    }).catch(err => next(new GeneralError('Internal Error')));
  }).catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Récupère le contenue d'une musique
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getMusicContent(req, res, next) {
  let musicContent = {
    music: null,
    samples: []
  }
  Promise.all([musicService.musicContent(req.params.id), libraryService.getSamplesForMusic(req.params.id)])
  .then(data => {
    if(data[0].length == 0)
      return next(new NotFound('the music is either non-existent or private'))

    musicContent.music = data[0];
    Promise.all(data[1].map(x => x.dataValues.sampleId).map(s => {
      return sampleService.getById(s);
    }))
    .then(samplesData => {
      samplesData.forEach(sampleData => {
        musicContent.samples.push(sampleData);
      })
      res.send(musicContent);
    }).catch(err => next(new GeneralError('Internal Error')));
  }).catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Récupère plusieurs musiques dans une liste
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getListOfMusic(req, res, next) {
  listMusic = []
  if(req.body.ids.length == 0) { return res.status(404).send("no id provided") }
  Promise.all(req.body.ids.map( id => {
    musicService.fullMusic(id)
    .then(music => {
      if(music.length == 0)
        return next(new NotFound('one of the musics is either non-existent or private'))

      if(music[0].dataValues.fk_author == null)
        return next(new NotFound('author of one of the music is not specified'))

      userService.getUserLoginById(music[0].dataValues.fk_author)
      .then(login => {
        music[0].dataValues.authorLogin = login.login
        listMusic.push(music[0])
        if( listMusic.length == req.body.ids.length ) {
          return res.send(listMusic)
        } 
      })
      .catch(err => next(new GeneralError('Internal Error')));
    })
    .catch(err => next(new GeneralError('Internal Error')));
  }))
  .catch(err => next(new GeneralError('Internal Error')));
}


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
    getListOfMusic
}
