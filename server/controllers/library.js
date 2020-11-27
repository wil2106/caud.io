const libraryService = require('../services/library');
function getLibraries(req, res){
    libraryService.getAll()
    .then(data => res.send(data));
};
function addLibrary(req, res){
    libraryService.add({
        musicId: req.body.musicId,
        sampleId:  req.body.sampleId
    }).then(data => res.send(data))
};
module.exports = {
    getLibraries,
    addLibrary
}
