const Samples = require('../models').Sample;

const getAll = () => Samples.findAll();
const getById = id => Samples.findByPk(id);
const add = sample => Samples.create(sample);
module.exports = {add, getAll, getById};