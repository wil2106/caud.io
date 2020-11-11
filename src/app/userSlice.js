import { createSlice } from '@reduxjs/toolkit'

const defaultUser = {
  login: '',
  description: '',
  token: '',
  userMusicsIDs: [],
}

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
