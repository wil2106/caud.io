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
    image: req.body.image
  }
  musicService.add(music).then(data => res.send(data));
};
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
module.exports = {
    createMusic, like
}
