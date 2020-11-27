import { createSlice } from '@reduxjs/toolkit'

/**
 * Default state of PlayableMusic
 * Note: the values are purely for debugging purpose, everything should be either empty array either null
 * Should remove value before production commits
 */
const defaultPlayableMusic = {}

// Create PlayableMusic redux slice
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
