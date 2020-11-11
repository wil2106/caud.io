import { createSlice } from '@reduxjs/toolkit'

const defaultMusicPack = {
  musics: [],
  mostRecentIDs: [],
  mostLikedIDs: [],
  mostListenedIDs: [],
  mostForkedIDs: [],
}

// Create MusicPack redux slice
export const musicPackSlice = createSlice({
  name: 'MusicPack',
  initialState: defaultMusicPack,
  reducers: {},
})

// Export Actions
export const {} = musicPackSlice.actions

// Export selectors
export const selectMusics = (state) => state.MusicPack.musics

// Export default reducers
export default musicPackSlice.reducer
