const Libraries = require('../models').Library;

const getAll = () => Libraries.findAll();
const add = (library) => Libraries.create(library);
const getSamplesForMusic = musicId_ => Libraries.findAll({
    attributes: ["sampleId"],
    where: {musicId: musicId_}
});

module.exports = {add, getAll, getSamplesForMusic};
