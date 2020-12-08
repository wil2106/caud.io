const { Music, Notification } = require('../models');
const sequelize = require('../db');

const add = music => Music.create(music);

const updateMusic = (music, id_) => Music.update( 
    music,
    {where: {id: id_}}
);

const like = (id_) => Music.update({ 
    nb_likes: sequelize.literal('nb_likes + 1')}, {
    where: {id: id_}
});

const fork = (id_) => Music.update({ 
    nb_forks: sequelize.literal('nb_forks + 1')}, {
    where: {id: id_}
});

const notify = notification => Notification.create(notification);

const listen = id_ => Music.update({ nb_listen: sequelize.literal('nb_listen + 1')}, {
    where: {id: id_}
});

const mostLike = () => Music.findAll({
    attributes: ['id'],
    order: [
        ['nb_likes', 'DESC']
    ],
    limit: 10
});

const mostRecent = () => Music.findAll({
    attributes: ['id'],
    order: [
        ['createdAt', 'ASC']
    ],
    limit: 10
})

const mostFork = () => Music.findAll({
    attributes: ['id'],
    order: [
        ['nb_forks', 'DESC']
    ],
    limit: 10
})

const mostListen = () => Music.findAll({
    attributes: ['id'],
    order: [
        ['nb_listen', 'DESC']
    ],
    limit: 10
})

const fullMusic = id_ => Music.findAll({
    where: {id: id_}
});

const musicContent = id_ => Music.findAll({
    attributes: ["setup_code", "step_code"],
    where: {id: id_}
})

module.exports = {like, notify, add, updateMusic, listen, fork, mostLike, mostRecent, mostFork, mostListen, fullMusic, musicContent};
