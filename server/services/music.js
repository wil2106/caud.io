const { Music, Notification } = require('../models');
const sequelize = require('../db');

const add = music => Music.create(music);

const like = (id_) => Music.update({ 
    nb_likes: sequelize.literal('nb_likes + 1')}, {
    where: {id: id_}
});

const notify = notification => Notification.create(notification);

const listen = id_ => Music.update({ nb_listen: sequelize.literal('nb_listen + 1')}, {
    where: {id: id_}
});

module.exports = {like, notify, add, listen};
