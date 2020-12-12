import axios from 'axios'
import { containers } from '../app/UIConstants'

export const retrieveRecentMusics = async (page) => {
  let res
  try {
    res = await axios.get('')
  } catch (err) {
    console.error(err)
  }

  if (!res) {
    throw new Error('No recent music found')
  }
  return res.data
}

export const retrieveMusicObject = async (ids) => {
  let result
  try {
    result = await axios.get(`/api/music/list`, { ids })
  } catch (err) {
    console.log(err)
  }
  return result.data
}

export const retrieveMostList = async (listName, page) => {
  const apiRoute = containers.find((element) => element.list === listName)
    .apiRoute
  let res

  try {
    res = await axios.get(`/api/music/${apiRoute}?page=${page}`)
    return res.data
  } catch (err) {
    console.log(err)
  }

  // Format: { data: [], totalPages, currentPage, totalItems }
}