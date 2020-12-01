import { createSlice } from '@reduxjs/toolkit'
import { authenticate, register } from './../api/auth'
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
}

// Create User redux slice
export const userSlice = createSlice({
  name: 'User',
  initialState: defaultUser,
  reducers: {
    updateUser: (state, action) => {
      const { login, token } = action.payload

      state = { ...state, login, token }
    },
  },
})

// Export Actions
export const { updateUser } = userSlice.actions

// Export auth related async thunks
export const authificate = (login, password) => async (dispatch) => {
  // TODO: Login and password format checking

  // Api call
  const res = await authenticate(login, password)
  dispatch(updateUser({ login: res.login, token: res.token }))
}
// Export selectors
export const selectLogin = (state) => state.User?.login

// Export default reducers
export default userSlice.reducer
