import { createSlice } from '@reduxjs/toolkit'

/**
 * Default state of User
 * Note: the values are purely for debugging purpose, everything should be either empty array either null
 * Should remove value before production commits
 */
const defaultUser = {
  login: '',
  description: '',
  token: '',
  userMusicsIDs: [],
}

// Create User redux slice
export const userSlice = createSlice({
  name: 'User',
  initialState: defaultUser,
  reducers: {},
})

// Export Actions
export const {} = userSlice.actions

// Export selectors
export const selectLogin = (state) => state.user.login

// Export default reducers
export default userSlice.reducer
