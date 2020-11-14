import { createSlice } from '@reduxjs/toolkit'
import { containers } from './UIConstants'

/**
 * Default state of Music Pack
 * Note: the values are purely for debugging purpose, everything should be either empty array either null
 * Should remove value before production commits
 */
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
  mostRecentIDs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  mostLikedIDs: [1, 1, 1, 1, 1, 1, 1, 1],
  mostListenedIDs: [1, 1, 1],
  mostForkedIDs: [1, 1],
  searchResult: [],
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
export const selectCurrentList = (state) => {
  let current = state.UIController.currentContainer
  let target = containers.find((element) => element.name === current)
  return state.MusicPack[target.list]
}
export const selectSearchList = (state) => state.MusicPack.searchResult

// Export default reducers
export default musicPackSlice.reducer
