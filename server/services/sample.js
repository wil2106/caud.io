const { Sample } = require('../models');

const Samples = require('../models').Sample;

const getAll = () => Samples.findAll();
const getById = id => Samples.findByPk(id);
const add = sample => Samples.create(sample);

const deleteSample = id_ => Samples.destroy({ 
    where: { id: id_ }
});

const update = (sample, id_) => Samples.update(
    sample,
    {where: {id: id_}}
);
module.exports = {add, getAll, getById, update, deleteSample};
