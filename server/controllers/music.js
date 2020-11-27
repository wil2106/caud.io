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

module.exports = {
    createMusic
}
