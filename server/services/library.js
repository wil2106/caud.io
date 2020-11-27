const Libraries = require('../models').Library;

const getAll = () => Libraries.findAll();
const add = (library) => Libraries.create(library);
module.exports = {add, getAll};
