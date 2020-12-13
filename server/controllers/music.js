const musicService = require('../services/music');
const libraryService = require('../services/library');
const sampleService = require('../services/sample');
const userService = require('../services/user');

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
}

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
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostRecent(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  })
}

function mostFork(req, res) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostFork(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  })
}

function mostListen(req, res) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  musicService.mostListen(limit, offset).then((data) => {
    const response = getPaginationData(data, page, limit)
    res.send(response)
  })
}

function searchTitle(req, res) {
  Promise.all([musicService.searchTitle(req.params.search)])
  .then(data => res.send(data));
}

function getFullMusic(req, res) {
  let fullMusic = {
    music: null,
    samples: []
  }
  Promise.all([musicService.fullMusic(req.params.id), libraryService.getSamplesForMusic(req.params.id)])
  .then(data => {
    if(data[0].length == 0) {
      return res.status(404).send({error: 'the music is either non-existent or private'});
    }
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
    if(data[0].length == 0) {
      return res.status(404).send({error: 'the music is either non-existent or private'});
    }
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

function getListOfMusic(req, res) {
  listMusic = []
  if(req.body.ids.length == 0) { return res.status(404).send("no id provided") }
  Promise.all(req.body.ids.map( id => {
    musicService.fullMusic(id)
    .then(music => {
      if(music.length == 0) {
        return res.status(404).send("one of the musics is either non-existent or private")
      }
      if(music[0].dataValues.fk_author == null) {
        return res.status(404).send("author of one of the music is not specified")
      }
      userService.getUserLoginById(music[0].dataValues.fk_author)
      .then(login => {
        music[0].dataValues.authorLogin = login.login
        listMusic.push(music[0])
        if( listMusic.length == req.body.ids.length ) {
          return res.send(listMusic)
        } 
      })
      .catch(error => res.send(error));
    })
    .catch(error => res.send(error));
  }))
  .catch(error => res.send(error));
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
