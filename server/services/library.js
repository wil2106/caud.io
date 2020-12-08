const Libraries = require('../models').Library;
const sequelize = require('../db');

const getAll = () => Libraries.findAll();
const add = (library) => Libraries.create(library);
const getSamplesForMusic = musicId_ => Libraries.findAll({
    attributes: ["sampleId"],
    where: {musicId: musicId_}
});
const getUniqueSampleForMusic =  musicId_ => sequelize.query(
    "select \"sampleId\" from libraries where \"musicId\" = " + musicId_ + " \
    EXCEPT \
    select \"sampleId\" from libraries where \"musicId\" != " +  musicId_ + " ;"
);
const deleteLibraryForMusic = (musicId_) => Libraries.destroy({
    where: { musicId: musicId_}
})

module.exports = {add, getAll, getSamplesForMusic, getUniqueSampleForMusic, deleteLibraryForMusic};
