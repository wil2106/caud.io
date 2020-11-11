const sampleService = require('../services/sample');
function getSamples(req, res){
    sampleService.getAll()
    .then(data => res.send(data));
};
function getSample(req, res){
    sampleService.getById(req.params.id)
    .then(data => res.send(data));
}
function addSample(req, res){
    sampleService.add({
        title: req.body.title,
        file:  req.body.file
    })
    .then(data => res.send(data));
};
module.exports = {
    getSamples,
    getSample,
    addSample
}