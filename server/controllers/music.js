const musicService = require('../services/music');

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
    like
}
