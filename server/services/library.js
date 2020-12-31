const Libraries = require('../models').Library
const sequelize = require('../db')

/**
 * @function getAll
 * @description sequelize find all library object
 * @exports
 * @returns Object
 */
const getAll = () => Libraries.findAll()

/**
 * @function add
 * @description Add library object to the library
 * @param {Object} library
 */
const add = (library) => Libraries.create(library)

/**
 * @function addMultiple
 * @description Add several library objects to the library
 * @param {List<Object>} libraries
 */
const addMultiple = (libraries) => Libraries.bulkCreate(libraries)

/**
 * @function getSamplesForMusic
 * @description retrieve associated sample from music object
 * @param {string} musicId_
 * @returns Object
 */
const getSamplesForMusic = (musicId_) =>
  Libraries.findAll({
    attributes: ['sampleId'],
    where: { musicId: musicId_ },
  })

/**
 * @function getUniqueSampleForMusic
 * @description
 * @param {string} musicId_
 * @returns
 */
const getUniqueSampleForMusic = (musicId_) =>
  sequelize.query(
    // eslint-disable-next-line no-multi-str
    'SELECT "sampleId" FROM libraries WHERE "musicId" = $id \
    EXCEPT \
    SELECT "sampleId" FROM libraries WHERE "musicId" != $id',
    { bind: { id: musicId_ }, type: sequelize.QueryTypes.SELECT }
  )

/**
 * @function deleteLibraryForMusic
 * @description
 * @param {string} musicId_
 */
const deleteLibraryForMusic = (musicId_) =>
  Libraries.destroy({
    where: { musicId: musicId_ },
  })

/**
 * @exports
 */
module.exports = {
  add,
  getAll,
  getSamplesForMusic,
  getUniqueSampleForMusic,
  deleteLibraryForMusic,
  addMultiple
}
