const sampleService = require('../services/sample');

/**
 * Récupère tous les samples
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getSamples(req, res, next){
    sampleService.getAll()
    .then(data => res.send(data))
    .catch(err => next(new GeneralError('Internal Error')));
};

/**
 * Récupère un sample
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getSample(req, res, next){
    sampleService.getById(req.params.id)
    .then(data => res.send(data))
    .catch(err => next(new GeneralError('Internal Error')));
}

/**
 * Crée un sample
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function addSample(req, res, next){
    sampleService.add({
        title: req.body.title,
        file:  req.body.file
    })
    .then(data => res.send(data))
    .catch(err => next(new GeneralError('Internal Error')));
};

module.exports = {
    getSamples,
    getSample,
    addSample
}