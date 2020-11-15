const musicService = require('../services/music');

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
    image: null
  }
  musicService.add(music).then(data => res.send(data));
};

function like(req, res) {
  musicService.like(req.body.id).then(data => {
    if(data==0) {
      return res.status(404).send({error: 'No music with this id'});
    }
    res.status(204).send();
  });
}

function listen(req, res) {
  musicService.listen(req.body.id).then(data => {
    if (data==0) {
     return res.status(404).send({error: 'No music with this id'});
    }
    res.status(204).send();
   });
}

function deleteMusic(req, res) {
  musicService.deleteMusic(parseInt(req.body.id, 10)).then(count => {
    if (!count) {
     return res.status(404).send({error: 'No music with this id'});
    }
    res.status(204).send();
   });
}

function topLike(req, res) {
  musicService.topLike().then(data => res.send(data));
}
module.exports = {
    createMusic,
    like,
    listen,
    deleteMusic,
    topLike
}