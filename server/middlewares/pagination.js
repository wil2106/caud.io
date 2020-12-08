const fetchLimitPerPage = 10

const getPagination = (page, size) => {
  const limit = size ? +size : fetchLimitPerPage
  const offset = page ? page * limit : 0

  return { limit, offset }
}

const getPaginationData = (data, page, limit) => {
  const totalItems = data.length
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { data, totalPages, currentPage, totalItems }
}

module.exports = {
  getPagination,
  getPaginationData,
}
