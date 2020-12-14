const fetchLimitPerPage = 20

/**
 * @function getPagination
 * @description Trivial function to format limit, offset parameters for sequelize query
 * @param {number} page
 * @param {number} size
 * @returns { number, number } limit, offset
 */
const getPagination = (page, size) => {
  const limit = size ? +size : fetchLimitPerPage
  const offset = page ? page * limit : 0

  return { limit, offset }
}

/**
 * @function getPaginationData
 * @description format the output into a data array/object to be sent by express res.send() call
 * @param {Object} data
 * @param {number} page
 * @param {number} limit
 * @returns Formated data to pass to res.send()
 */
const getPaginationData = (data, page, limit) => {
  const totalItems = data.length
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { data, totalPages, currentPage, totalItems }
}

/**
 * @exports
 */
module.exports = {
  getPagination,
  getPaginationData,
}
