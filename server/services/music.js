const { Music, Notification } = require('../models');
const sequelize = require('../db');

const add = music => Music.create(music);

const deleteMusic = id_ => Music.destroy({ 
    where: { id: id_ }
});

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

const mostLike = (limit, offset) => 
  sequelize.query(
    `SELECT music.id, music.title, music.nb_forks,
    music.nb_likes, music.nb_listen, music.can_fork,
    users.login, encode(image, 'base64') as image
    FROM music, users
    WHERE music.private=false AND music.fk_author=users.id
    order by nb_likes DESC
    OFFSET $offset
    LIMIT $limit`,
    {
        bind: 
            {
            limit,
            offset
        },
        type: sequelize.QueryTypes.SELECT
    }
  )

const mostRecent = () => Music.findAll({
    order: [
        ['createdAt', 'ASC']
    ],
    limit: 10,
    where: {private: false}
});

const mostFork = () => Music.findAll({
    order: [
        ['nb_forks', 'DESC']
    ],
    limit: 10,
    where: {private: false}
});

const mostListen = () => Music.findAll({
    order: [
        ['nb_listen', 'DESC']
    ],
    limit: 10,
    where: {private: false}
});

const fullMusic = id_ => Music.findAll({
    where: {
        id: id_,
        private: false
    }
});

const musicContent = id_ => Music.findAll({
    attributes: ["setup_code", "step_code"],
    where: {
        id: id_,
        private: false
    }
})

module.exports = {like, notify, add, updateMusic, deleteMusic, listen, fork, mostLike, mostRecent, mostFork, mostListen, fullMusic, musicContent};
