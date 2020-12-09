const sequelize = require('../db');
const Users = require('../models').User;

const addUser = user => Users.create(user);
const getUserByLogin = login => Users.findOne({where: {login}});
const deleteUser = id_ => Users.destroy({ 
    where: { id: id_ }
});

const updateUser = (user, id_) => Users.update(
    user,
    {where: {id: id_}}
);

module.exports = {
    addUser,
    getUserByLogin,
    deleteUser,
    updateUser
}