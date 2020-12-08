const musicService = require('../services/music');
const libraryService = require('../services/library');
const sampleService = require('../services/sample');
const {
  getPagination,
  getPaginationData,
} = require('./../middlewares/pagination')

function createMusic(req, res) {
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
      sampleService.add(sample).then((sampleData) => {
        libraryService.add({ musicId: musicData.id, sampleId: sampleData.id })
      })
    })
  })
  .then(data => res.send(data))
  .catch(err => {
    console.log('**********ERROR RESULT****************');
    console.log(err);
  });
}


function deleteMusic(req, res) {
  libraryService.getUniqueSampleForMusic(parseInt(req.params.id))
  .then(result => {
    result[0].forEach(sample => {
      sampleService.deleteSample(sample.sampleId)
    });
  })
  .then(musicService.deleteMusic(req.params.id))
  .then(libraryService.deleteLibraryForMusic(req.params.id))
  .then(data => res.send(data));
}

function updateMusic(req, res) {
  let music = {
    title: req.body.title,
    setup_code: req.body.setup_code,
    step_code: req.body.step_code,
    can_fork: req.body.can_fork,
    private: req.body.private,
    image: req.body.image
  }
  musicService.updateMusic(music, req.params.id).then(data => res.send(data));

  req.body.samples.forEach(sample => {
    sampleService.update(
      {
      title: sample.title,
      file:  sample.file
      },
      sample.id)    
  });

function like(req, res) {
  let notification = {
    action: req.body.action,
    fk_user: req.body.fk_user,
    fk_emitter: req.body.fk_emitter,
    fk_music: req.body.id

  }
  musicService.like(req.body.id).then(data => {
    if(data==0) {
      return res.status(404).send({error: 'No music with this id'});
    }
  });
  musicService.notify(notification).then(data => res.send(data));
}

function fork(req, res) {
  let notification = {
    action: req.body.action,
    fk_user: req.body.fk_user,
    fk_emitter: req.body.fk_emitter,
    fk_music: req.body.id

  }
  musicService.fork(req.body.id).then(data => {
    if(data==0) {
      return res.status(404).send({error: 'No music with this id'});
    }
  });
  musicService.notify(notification).then(data => res.send(data));
}

function listen(req, res) {
  musicService.listen(req.body.id).then(data => {
    if (data==0) {
     return res.status(404).send({error: 'No music with this id'});
    }
    res.status(204).send();
   });
}

function mostLike(req, res) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostLike(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  })
}

function mostRecent(req, res) {
  musicService.mostRecent().then(data => res.send(data));
}

function mostFork(req, res) {
  musicService.mostFork().then(data => res.send(data));
}

function mostListen(req, res) {
  musicService.mostListen().then(data => res.send(data));
}

function getFullMusic(req, res) {
  let fullMusic = {
    music: null,
    samples: []
  }
  Promise.all([musicService.fullMusic(req.params.id), libraryService.getSamplesForMusic(req.params.id)])
  .then(data => {
    fullMusic.music = data[0];
    Promise.all(data[1].map(x => x.dataValues.sampleId).map(s => {
      return sampleService.getById(s);
    }))
    .then(samplesData => {
      samplesData.forEach(sampleData => {
        fullMusic.samples.push(sampleData);
      })
      res.send(fullMusic);
    });
  });
}

function getMusicContent(req, res) {
  let musicContent = {
    music: null,
    samples: []
  }
  Promise.all([musicService.musicContent(req.params.id), libraryService.getSamplesForMusic(req.params.id)])
  .then(data => {
    musicContent.music = data[0];
    Promise.all(data[1].map(x => x.dataValues.sampleId).map(s => {
      return sampleService.getById(s);
    }))
    .then(samplesData => {
      samplesData.forEach(sampleData => {
        musicContent.samples.push(sampleData);
      })
      res.send(musicContent);
    });
  });
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
    getFullMusic,
    getMusicContent,
    deleteMusic
}
