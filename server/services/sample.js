const Samples = require('../models').Sample

const getAll = () => Samples.findAll()
const getById = (id) => Samples.findByPk(id)
const add = (sample) => Samples.create(sample)

const addMultiple = (samples) => Samples.bulkCreate(samples)

const deleteSample = (id_) =>
  Samples.destroy({
    where: { id: id_ },
  })
const deleteSamples = (ids) => Samples.destroy({
  where: {id: ids}
})

const getByIds = (ids) => Samples.findAll({
  where: { id: ids}
})
const update = (sample, id_) => Samples.update(sample, { where: { id: id_ } })

module.exports = { add, getAll, getById, getByIds, update, deleteSample, addMultiple, deleteSamples }
