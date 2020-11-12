import { createSlice } from '@reduxjs/toolkit'

const defaultMusicPack = {
  musics: [
    {
      id: 1,
      title: 'Example title',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/60/Aimer_Dawn.jpg',
      username: 'User',
      nb_forks: 10,
      nb_likes: 10,
      nb_listen: 10,
    },
  ],
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
