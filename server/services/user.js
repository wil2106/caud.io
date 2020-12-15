const Users = require('../models').User
const Music = require('../models').Music

const addUser = (user) => Users.create(user)
const getUserByID = (id) => Users.findOne({ where: { id } })
const getUserByLogin = (login) => Users.findOne({ where: { login: login } })

const getUserMusics = (id, limit, offset) =>
  Music.findAll({
    attributes: ['id'],
    where: { fk_author: id },
    limit,
    offset,
  })

const deleteUser = (id_) =>
  Users.destroy({
    where: { id: id_ },
  })

const getUserLoginById = (id_) =>
  Users.findOne({
    attributes: ['login'],
    where: { id: id_ },
  })



const updateUser = (user, id_) => Users.update(
    user,
    {where: {id: id_}}
);

module.exports = {
  addUser,
  getUserByID,
  getUserByLogin,
  deleteUser,
  updateUser,
  getUserLoginById,
  getUserMusics,
}
