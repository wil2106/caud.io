const userService = require('../services/user');


/**
 * Supprime un utilisateur
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function deleteUser(req, res, next) {
    userService.getUserByLogin(req.body.login)
    .then(result => {
        userService.deleteUser(result.id)
    })
    .then(data => res.send(data))
    .catch(err => next(new GeneralError('Internal Error')));
}
 
/**
 * Met à jour les donées d'un utilisateur
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
  function updateUser(req, res, next) {
    let user = {
      login: req.body.login,
      password: req.body.password,
      description: req.body.description,
      
    }
    userService.updateUser(user, req.params.id)
    .then(data => res.send(data))
    .catch(err => next(new GeneralError('Internal Error')));
  
    
  }


module.exports = {
    
    updateUser,
    deleteUser
}