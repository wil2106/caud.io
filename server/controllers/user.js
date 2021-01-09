const userService = require('../services/user')
const {
  getPagination,
  getPaginationData,
} = require('./../middlewares/pagination')
const { GeneralError } = require('./../middlewares/errorClass.js')

/**
 * @function getUser
 * @description retrieve user from database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function getUser(req, res) {
  userService.getUserByID(req.params.id).then((result) => {
    // TODO: Check user token matching
    if (result) {
      res.status(200).send(result)
    } else {
      res.status(409).send({
        sucess: false,
        message: 'User not found.',
      })
    }
  })
}

/**
 * @function getUserMusicIDs
 * @description get user's music library
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function getUserMusicIDs(req, res) {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)
  if (!parseInt(req.params.id)) res.status(400).send('Not a number')
  userService
    .getUserMusics(req.params.id, limit, offset)
    .then((data) => {
      const formatedData = data.map((element) => element.id)
      const response = getPaginationData(formatedData, page, limit)
      res.status(200).send(response)
    })
    .catch((err) => res.status(400).send('Internal error'))
}

/**
 * @function deleteUser
 * @description Supprime un utilisateur
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
async function deleteUser(req, res, next) {
  const { id } = req.user
  try {
    const data = await userService.deleteUser(parseInt(id))
    return res.sendStatus(204).send(data)
  } catch (err) {
    next(new GeneralError('Internal Error'))
  }
}

/**
 * @function updateUser
 * @description Met à jour les donées d'un utilisateur
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function updateUser(req, res, next) {
  const { id } = req.user
  const { login, password, description } = req.body

  let encryptedPassword = null
  if (password && password.match(SAFEPASSWORDREGEX)) {
    encryptedPassword = bcrypt.hashSync(password, config.saltRounds)
    console.log(encryptedPassword)
  }

  userService
    .updateUser(
      {
        login,
        password: encryptedPassword,
        description,
      },
      id
    )
    .then((data) => res.send(data))
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @exports
 */
module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserMusicIDs,
}