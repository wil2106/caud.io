const { Music } = require('../models');
const sequelize = require('../db');

const listen = id_ => Music.update({ nb_listen: sequelize.literal('nb_listen + 1')}, {
    where: {id: id_}
});
module.exports = {listen};