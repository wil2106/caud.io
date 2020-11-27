const musicService = require('../services/music');
const libraryService = require('../services/library');
const sampleService = require('../services/sample');

function createMusic(req, res) {
  let music = {
    title: req.body.title,
    nb_likes: 0,
    nb_forks: 0,
    nb_listen: 0,
    setup_code: req.body.setup_code,
    step_code: req.body.step_code,
    can_fork: req.body.can_fork,
    private: req.body.private,
    image: req.body.image,
    fk_author: req.body.fk_author
  }

  musicService.add(music)
  .then(musicData => {
    req.body.samples.forEach(sample => {
      sampleService.add(sample)
      .then(sampleData => {
        libraryService.add({musicId: musicData.id, sampleId: sampleData.id })
      });    
    });
  })
  .then(data => res.send(data))
  .catch(err => {
    console.log('**********ERROR RESULT****************');
    console.log(err);
  });
}

function like(req, res) {
  let notification = {
    action: req.body.action,
    fk_user: req.body.fk_user,
    fk_emitter: req.body.fk_emmiter,
    fk_music: req.body.id

  }
  musicService.like(req.body.id).then(data => {
    if(data==0) {
      return res.status(404).send({error: 'No music with this id'});
    }
    res.status(204).send();
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
  musicService.mostLike().then(data => res.send(data));
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

module.exports = {
    createMusic,
    like,
    listen,
    mostLike,
    mostRecent,
    mostFork,
    mostListen
}
