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
    'select "sampleId" from libraries where "musicId" = ' +
      musicId_ +
      ' \
    EXCEPT \
    select "sampleId" from libraries where "musicId" != ' +
      musicId_ +
      ' ;'
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
}
