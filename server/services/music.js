
const { Music, Notification } = require('../models');
const sequelize = require('../db');

const add = music => Music.create(music);

const like = (id_) => Music.update({ 
    nb_likes: sequelize.literal('nb_likes + 1')}, {
    where: {id: id_}
});

const notify = notification => Notification.create(notification);

module.exports = {like, notify, add};
