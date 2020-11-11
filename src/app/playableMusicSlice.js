import { createSlice } from '@reduxjs/toolkit'

const defaultPlayableMusic = {}

export const playableMusicSlice = createSlice({
  name: 'PlayableMusic',
  initialState: defaultPlayableMusic,
  reducers: {},
})

// Export Actions
export const {} = playableMusicSlice.actions

// Export selectors
export const selectPlayableMusic = (state) => state.PlayableMusic

// Export default reducers
export default playableMusicSlice.reducer
