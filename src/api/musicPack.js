import axios from 'axios'
import { containers } from '../app/UIConstants'

/**
 * @function retrieveMusicObject
 * @param {Array} ids Array containing the list queries
 * @description From a list of music IDs, retrieve a list of music objects with all its informations
 * @async
 * @exports
 */
export const retrieveMusicObject = async (ids) => {
  let result
  try {
    result = await axios.get(`/api/music/list`, { ids })
  } catch (err) {
    console.log(err)
  }
  return result.data
}

/**
 * @function retrieveMostList
 * @param {string} listName Name of the list in containers (UIConstant.containers)
 * @param {number} page Query page
 * @description Universal functions used to make backend call depending on the type of list: most recent, most forked, most liked, most listened.
 * @async
 * @exports
 */
export const retrieveMostList = async (listName, page) => {
  // Retrieve the api route based on the type of the list
  const apiRoute = containers.find((element) => element.list === listName)
    .apiRoute
  let res

  try {
    res = await axios.get(`/api/music/${apiRoute}?page=${page}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

/**
 * @function searchMusic
 * @param {string} keyword keywords for search query in the music database
 * @description From a keyword based query, retrieve a list of search result
 * @async
 * @exports
 */
export const searchMusic = async (keyword) => {
  try {
    const res = await axios.get(`/api/music/searchTitle/${keyword}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

/**
 * @function retrieveUserMusic
 * @param {string} id User iid
 * @param {string} token User auth token
 * @description From an id and token, retrieves the list of user music
 * @async
 * @exports
 */
export const retrieveUserMusic = async (id, token) => {
  // Set user token for axios
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  try {
    const res = await axios.get(`api/user/${id}/musicIDs`, null, config)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

