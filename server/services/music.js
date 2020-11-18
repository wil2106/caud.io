const { Music } = require('../models');
const sequelize = require('../db');

const Musics = require('../models').Music;

const add = music => Music.create(music);
module.exports = {add};