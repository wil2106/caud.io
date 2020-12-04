import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
/**
 * Default state of User
 * Note: the values are purely for debugging purpose, everything should be either empty array either null
 * Should remove value before production commits
 */
const defaultUser = {
  login: 'RANDOM',
  description: '',
  token: '',
  userMusicsIDs: [],
  loginLoading: false,
  loginError: '',
  signUpLoading: false,
  signUpError: '',
}

// Create User redux slice
export const userSlice = createSlice({
  name: 'User',
  initialState: defaultUser,
  reducers: {
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload
    },
    setSignUpLoading: (state, action) => {
      state.signUpLoading = action.payload
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload
    },
    setSignUpError: (state, action) => {
      state.signupError = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setLogin: (state, action) => {
      state.login = action.payload
    },
    setUserData: (state, action) => {
      const { login, token } = action.payload
      state.login = login
      state.token = token
    },
  },
})

// Export Actions
export const {
  setLoginLoading,
  setLoginError,
  setSignUpLoading,
  setSignUpError,
  setUserData,
} = userSlice.actions

// Export thunks

export const logMeIn = (login, password, successCb) => (dispatch) => {
  dispatch(setLoginLoading(true))

  axios
    .post('/api/login', {
      login: login,
      password: password,
    })
    .then(function (response) {
      dispatch(setLoginLoading(false))
      dispatch(setUserData({ login: login, token: response.data.data.token }))
      successCb()
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        dispatch(
          setLoginError(
            'The username or password you entered is incorrect, please try again'
          )
        )
      } else {
        dispatch(setLoginError('Internal error, please try again'))
      }
      dispatch(setLoginLoading(false))
    })
}

export const signMeUp = (login, password, successCb) => (dispatch) => {
  dispatch(setSignUpLoading(true))

  axios
    .post('/api/register', {
      login: login,
      password: password,
    })
    .then(function (response) {
      dispatch(setSignUpLoading(false))
      successCb()
    })
    .catch(function (error) {
      if (error.response.status === 409) {
        dispatch(
          setSignUpError(
            'Registration failed. User with this login already registered'
          )
        )
      } else {
        dispatch(setSignUpError('Internal error, please try again'))
      }
      dispatch(setSignUpLoading(false))
    })
}

export const logout = () => (dispatch) => {
  dispatch(setUserData({ login: '', token: '' }))
}

// Export selectors
export const selectLogin = (state) => state.User.login
export const selectLoginLoading = (state) => state.User.loginLoading
export const selectSignUpLoading = (state) => state.User.signUpLoading
export const selectLoginError = (state) => state.User.loginError
export const selectSignUpError = (state) => state.User.signupError

// Export default reducers
export default userSlice.reducer
