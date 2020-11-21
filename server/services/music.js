const { Music } = require('../models');

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
module.exports = {mostLike, mostRecent, mostFork, mostListen};