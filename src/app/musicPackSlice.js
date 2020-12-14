import { createSlice } from '@reduxjs/toolkit'
import {
  retrieveMostList,
  retrieveMusicObject,
  retrieveRecentMusics,
  retrieveUserMusic,
  searchMusic,
} from '../api/musicPack'
import { createBlobURL, imageBufferToBase64 } from '../utils'
import { containers } from './UIConstants'
import _ from 'lodash'
import { setMusicIDs } from './userSlice'

/**
 * Default state of Music Pack
 * Note: the values are purely for debugging purpose, everything should be either empty array either null
 * Should remove value before production commits
 */
const defaultMusicPack = {
  musics: {},
  mostRecentIDs: [],
  mostLikedIDs: [],
  mostListenedIDs: [],
  mostForkedIDs: [],
  searchResult: [],
  loading: false,
  mostRecentIDsPage: 0,
  mostLikedIDsPage: 0,
  mostListenedIDsPage: 0,
  mostForkedIDsPage: 0,
  searchResultPage: 0,
}

// Create MusicPack redux slice
export const musicPackSlice = createSlice({
  name: 'MusicPack',
  initialState: defaultMusicPack,
  reducers: {
    addToList: (state, action) => {
      const { listName, elements } = action.payload
      elements?.forEach((element) => {
        if (!state[listName].includes(element)) {
          state[listName].push(element)
        }
      })
    },
    setLoading: (state, action) => {
      const { loading } = action.payload
      state.loading = loading
    },
    clearRecentIDs: (state) => {
      state.mostRecentIDs = []
    },
    updateMusicObject: (state, action) => {
      const { data } = action.payload
      // Experimental merging objects
      data.forEach((element) => {
        const musicObject = state.musics.find(
          (music) => music.id === element.id
        )
        if (musicObject) {
          musicObject['lightMusicObject'] = data['lightMusicObject']
        }
      })
    },
    addToMusics: (state, action) => {
      const temp = {}
      action.payload.forEach((music) => (temp[music.id] = music))
      Object.assign(state.musics, temp)
    },
    setPages: (state, action) => {
      const { listName, page } = action.payload
      state[listName] = page
    },
    addToSearch: (state, action) => {
      if (!action.payload?.length) return
      console.log(action.payload)
      state.searchResult.push(...action.payload)
    },
    resetSearchList: (state) => {
      state.searchResult = []
    },
  },
})

// Export Actions
export const {
  addToList,
  setLoading,
  clearRecentIDs,
  updateMusicObject,
  addToMusics,
  setPages,
  addToSearch,
  resetSearchList,
} = musicPackSlice.actions

// Export thunks
export const requestNextPage = (listName) => async (dispatch, getState) => {
  const state = getState()
  const { loading } = state.MusicPack
  if (loading) return
  const currentActiveContainer = state.UIController.currentContainer

  // Set loading animation
  dispatch(setLoading({ loading: true }))

  // API backend call
  try {
    await retrieveAPIMusic(
      listName,
      state.MusicPack[`${listName}Page`] + 1,
      dispatch
    )
  } catch (err) {
    console.log(err)
  }

  // End loading animation
  dispatch(setLoading({ loading: false }))
}

export const reloadRecentIDs = () => async (dispatch) => {
  dispatch(clearRecentIDs())
  const res = await retrieveRecentMusics(1)
  dispatch(
    addToList({
      listName: 'mostRecentIDs',
      elements: res,
    })
  )
}

export const retrieveLightMusicObjectFromIDs = (ids) => async (dispatch) => {
  // Retrieve object
  const res = await retrieveMusicObject(ids)
  dispatch(updateMusicObject(res))
}

export const retrieveMusics = (ids) => async (dispatch) => {
  const result = await retrieveLightMusicObjectFromIDs(ids)
  if (!result?.data) return
  const blobedArray = await Promise.all(
    result.data.map(async (element) => {
      if (element.image) {
        const url = `data:image/png;base64,${element.image}`
        const blob = await (await fetch(url)).blob()
        element.image = createBlobURL(blob)
      }
      return element
    })
  )
  dispatch(addToMusics(blobedArray))
}

export const requireContainerList = (listName) => async (
  dispatch,
  getState
) => {
  const state = getState()
  const page = state.MusicPack[`${listName}Page`]
  // Set loading animation
  dispatch(setLoading({ loading: true }))

  try {
    await retrieveAPIMusic(listName, page, dispatch)
  } catch (err) {
    console.log(err)
  }
  // End loading animation
  dispatch(setLoading({ loading: false }))
}

const retrieveAPIMusic = async (listName, page, dispatch) => {
  let result
  try {
    result = await retrieveMostList(listName, page)
    if (!result?.data) return
    const blobedArray = await Promise.all(
      result.data.map(async (element) => {
        if (element.image) {
          const url = `data:image/png;base64,${element.image}`
          const blob = await (await fetch(url)).blob()
          element.image = createBlobURL(blob)
        }
        return element
      })
    )
    const ids = result.data.map((element) => element.id)
    dispatch(addToMusics(blobedArray))
    dispatch(addToList({ listName, elements: ids }))
  } catch (err) {
    console.log(err)
  }
}

export const searchAPI = (keyword) => async (dispatch) => {
  try {
    const res = await searchMusic(keyword)
    if (!res?.data) return
    dispatch(addToMusics(res.data[0]))

    const ids = res.data[0].map((element) => element.id)
    dispatch(addToSearch(ids))
  } catch (err) {
    console.log(err)
  }
}

export const getUserMusics = (id) => async (dispatch, getState) => {
  const state = getState()
  if (state.User?.token) return

  try {
    const res = await retrieveUserMusic(id, state.User.token)
    dispatch(setMusicIDs(res.data))
  } catch (err) {
    console.log(err)
  }
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
