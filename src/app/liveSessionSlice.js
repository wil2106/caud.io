import { createSlice } from '@reduxjs/toolkit'

/**
 * Default state of LiveSession state
 * Note: the values are purely for debugging purpose, everything should be either empty array either null
 * Should remove value before production commits
 */
const defaultLiveSession = {
  id: '',
  users: [],
  setupCode: '',
  stepCode: '',
}

// Create LiveSession redux slice
export const liveSessionSlice = createSlice({
  name: 'LiveSession',
  initialState: defaultLiveSession,
  reducers: {},
})

// Export Actions
export const {} = liveSessionSlice.actions

// Export default reducers
export default liveSessionSlice.reducer
