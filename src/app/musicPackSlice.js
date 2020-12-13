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
  loading: false,
}

// Create MusicPack redux slice
export const musicPackSlice = createSlice({
  name: 'MusicPack',
  initialState: defaultMusicPack,
  reducers: {
    addToList: (state, action) => {
      const { listName, elements } = action.payload
      state[listName].push(...elements)
    },
    setLoading: (state, action) => {
      const { loading } = action.payload
      state.loading = loading
    },
  },
})

// Export Actions
export const { addToList, setLoading } = musicPackSlice.actions

// Export thunks
export const requestNextPage = () => async (dispatch, getState) => {
  const state = getState()
  const { loading } = state.MusicPack
  if (loading) return
  dispatch(setLoading({ loading: true }))

  // API backend call
  console.log('emulate api calls')
  const result = [1, 1, 1]

  // Dispatch, parse to redux store
  const currentActiveContainer = state.UIController.currentContainer
  console.log(currentActiveContainer)
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
  } catch (err) {
    console.error(err)
  }

  await dispatch(
    addToList({
      listName: containers.find(
        (element) => element.name === currentActiveContainer
      ).list,
      elements: result,
    })
  )
  await dispatch(setLoading({ loading: false }))
}

// Export selectors
export const selectMusics = (state) => state.MusicPack.musics
export const selectCurrentList = (state) => {
  let current = state.UIController.currentContainer
  let target = containers.find((element) => element.name === current)
  return state.MusicPack[target.list]
}
export const selectSearchList = (state) => state.MusicPack.searchResult
export const selectLoading = (state) => state.MusicPack.loading

// Export default reducers
export default musicPackSlice.reducer
