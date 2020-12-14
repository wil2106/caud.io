const libraryService = require('../services/library');

/**
 * Récupère l'ensemble des librairies
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function getLibraries(req, res, next){
    libraryService.getAll()
    .then(data => res.send(data))
    .catch(err => next(new GeneralError('Internal Error')));
};

/**
 * Crée une librarie
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { function } next
 */
function addLibrary(req, res, next){
    libraryService.add({
        musicId: req.body.musicId,
        sampleId:  req.body.sampleId
    })
    .then(data => res.send(data))
    .catch(err => next(new GeneralError('Internal Error')));
    
};
module.exports = {
    getLibraries,
    addLibrary
}
