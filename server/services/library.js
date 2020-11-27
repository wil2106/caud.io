const Libraries = require('../models').Library;

const getAll = () => Libraries.findAll();
const add = (library) => Libraries.creaste(library);
module.exports = {add, getAll};
