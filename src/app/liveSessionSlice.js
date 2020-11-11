import { createSlice } from '@reduxjs/toolkit'

const defaultLiveSession = {
  id: '',
  users: [],
  setupCode: '',
  stepCode: '',
}

export const liveSessionSlice = createSlice({
  name: 'LiveSession',
  initialState: defaultLiveSession,
  reducers: {},
})

// Export Actions
export const {} = liveSessionSlice.actions

// Export default reducers
export default liveSessionSlice.reducer
