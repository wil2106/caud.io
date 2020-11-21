const musicService = require('../services/music');

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
    mostLike,
    mostRecent,
    mostFork,
    mostListen
}