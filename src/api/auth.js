import axios from 'axios'

export const authenticate = async (login, password) => {
  let res
  try {
    res = await axios.post('/login', {
      login,
      password,
    })
  } catch (err) {
    console.error(err)
  }

  if (!res) {
    throw new Error('Authentification failed. No user found')
  }
  return res.data
}

export const register = async (login, password) => {
  let res
  try {
    res = await axios.post('/register', {
      login,
      password,
    })
  } catch (err) {
    console.log(err)
  }

  if (!res) {
    throw new Error('Registration faiiled.')
  }

  return res.data.success
}
