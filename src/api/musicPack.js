import axios from 'axios'

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
  let res
  try {
    res = await axios.get('/', { ids })
  } catch (err) {
    console.log(err)
  }
  return res.data
}
