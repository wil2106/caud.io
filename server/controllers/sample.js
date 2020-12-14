const sampleService = require('../services/sample')

/**
 * @function getSamples
 * @description Récupère tous les samples
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getSamples(req, res, next) {
  sampleService
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function getSample
 * @description Récupère un sample
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getSample(req, res, next) {
  sampleService
    .getById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @function addSample
 * @description Crée un sample
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function addSample(req, res, next) {
  sampleService
    .add({
      title: req.body.title,
      file: req.body.file,
    })
    .then((data) => res.send(data))
    .catch((err) => next(new GeneralError('Internal Error')))
}

/**
 * @exports
 */
module.exports = {
  getSamples,
  getSample,
  addSample,
}
