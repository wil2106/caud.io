const userService = require('../services/user');



function deleteUser(req, res) {
    userService.getUserByLogin(req.body.login)
    .then(result => {
        userService.deleteUser(result.id)
    })
    .then(data => res.send(data));
}
  
  function updateUser(req, res) {
    let user = {
      login: req.body.login,
      password: req.body.password,
      description: req.body.description,
      
    }
    userService.updateUser(user, req.params.id).then(data => res.send(data));
  
    
  }


module.exports = {
    
    updateUser,
    deleteUser
}