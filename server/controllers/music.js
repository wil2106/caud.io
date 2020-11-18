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

module.exports = {
    createMusic
}