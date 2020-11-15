const { Music } = require('../models');
const sequelize = require('../db');

const Musics = require('../models').Music;

const getAll = () => Music.findAll();
const getById = id => Music.findByPk(id);
const add = music => Music.create(music);
const like = id_ => Music.update({ nb_likes: sequelize.literal('nb_likes + 1')}, {
    where: {id: id_}
});
const listen = id_ => Music.update({ nb_listen: sequelize.literal('nb_listen + 1')}, {
    where: {id: id_}
});

const deleteMusic = id_ => Music.destroy({ 
    where: { id: id_ }
});

const topLike = () => Music.findAll({
    attributes: ['image', 'title', 'fk_author', 'nb_likes', 'nb_forks', 'nb_listen'],
    order: [
        ['nb_likes', 'DESC']
    ],
    limit: 10
});
module.exports = {getAll, getById, add, like, listen, deleteMusic, topLike};