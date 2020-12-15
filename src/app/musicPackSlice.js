import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
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
  newMusicError: '',
  newMusicLoading: false
}

// Create MusicPack redux slice
export const musicPackSlice = createSlice({
  name: 'MusicPack',
  initialState: defaultMusicPack,
  reducers: {
    addToList: (state, action) => {
      const { listName, elements } = action.payload
      // For each element, verify if the ID is already in the list, if not add to the list
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
      // Using assign() to merge objects.
      // See MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      Object.assign(state.musics, temp)
    },
    setPages: (state, action) => {
      const { listName, page } = action.payload
      state[listName] = page
    },
    addToSearch: (state, action) => {
      if (!action.payload?.length) return
      // Spread operator to merge the arrays
      state.searchResult.push(...action.payload)
    },
    resetSearchList: (state) => {
      state.searchResult = []
    },
    setNewMusicError: (state, action) => {
      state.newMusicError = action.payload
    },
    setNewMusicLoading: (state, action) => {
      state.newMusicLoading = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResult = action.payload
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
  setNewMusicError,
  setNewMusicLoading,
  setSearchResults
} = musicPackSlice.actions

// Export thunks
/**
 * @function requestNextPage
 * @param {string} listName 
 * @async
 * @description used for dynamic loading upon scroll in the music container
 * @exports
 */
export const requestNextPage = (listName) => async (dispatch, getState) => {
  const state = getState()
  const { loading } = state.MusicPack
  if (loading) return

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

/**
 * @function retrieveLightMusicObjectFromIDs
 * @param {Array} ids Array of music object ID
 * @description Used to retrieve music previews
 * @async
 * @exports
 */
export const retrieveLightMusicObjectFromIDs = (ids) => async (dispatch) => {
  // Retrieve object
  const res = await retrieveMusicObject(ids)
  dispatch(updateMusicObject(res))
}

/**
 * @function retrieveMusics
 * @param {Array} ids Array of music object IDs
 * @description retrieve list of music object based on the list of IDs
 * @async
 * @exports
 */
export const retrieveMusics = (ids) => async (dispatch) => {
  const result = await retrieveLightMusicObjectFromIDs(ids)
  if (!result?.data) return
  const blobedArray = await Promise.all(
    result.data.map(async (element) => {
      if (element.image) {
        element.image = `data:image/png;base64,${element.image}` 
      }
      return element
    })
  )
  dispatch(addToMusics(blobedArray))
}

/**
 * @function requireContainerList
 * @param {string} listName Container name
 * @description Retrieve list of music objects between most liked, most forked, most listened, most recent.
 * @exports
 * @async
 */
export const requireContainerList = (listName) => async (
  dispatch,
  getState
) => {
  const state = getState()
  // Set the name of the page for redux store property
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

/**
 * @function retrieveAPIMusic
 * @param {string} listName Container list name
 * @param {number} page #page to retrieve
 * @param {*} dispatch dispatch redux object passed down
 * @async
 */
const retrieveAPIMusic = async (listName, page, dispatch) => {
  let result
  try {
    result = await retrieveMostList(listName, page)
    if (!result?.data) return
    const blobedArray = await Promise.all(
      result.data.map(async (element) => {
        if (element.image) {
          element.image = `data:image/png;base64,${element.image}` 
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

/**
 * @function searchAPI
 * @param {string} keyword keyword for search query
 * @description Call search API with keyword parameters
 * @async
 * @exports
 */
export const searchAPI = (keyword) => async (dispatch) => {
  try {
    const res = await searchMusic(keyword)
    if(res){
      let formattedList = res.map((music)=> ({...music, image: `data:image/png;base64,${music.image}`}))
      dispatch(setSearchResults(formattedList))
    }
    /*
    if (!res?.data) return
    dispatch(addToMusics(res.data[0]))
    const ids = res.data[0].map((element) => element.id)
    dispatch(addToSearch(ids))
    */
  } catch (err) {
    console.log(err)
  }
}

/**
 * @function getUserMusics
 * @param {string} id User id
 * @async
 * @exports
 * @description from user id, retrieve the list of ID whom author is specified ID
 */
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

/**
 * @function createMusic
 * @param {object} music Music object
 * @param {callback} successCb callback upon success
 * @description Creates a music if user authentified 
 * @async
 * @exports
 */
export const createMusic =  (music, successCb) => 
  async (dispatch, getState) => {
    dispatch(setNewMusicLoading(true))
    const state = getState()
        
    // Set user token for axios
    const config = {
        headers: {
          'Authorization': `Bearer ${state.User.token}`
        }
    }

    try{
      await axios.post('/api/music',{
        title: music.title,
        setup_code: music.setupCode,
        step_code: music.stepCode,
        can_fork: music.canFork,
        private: music.isPrivate,
        image: music.image,
        fk_author: state.User.id,
        bpm: music.bpm,
        nb_steps: music.nbSteps,
        samples: music.samples.map((sample)=>({title: sample.name, file: sample})),
      }, config)
      dispatch(setNewMusicLoading(false))
      successCb();
    } catch(err){
      console.log(err.message)
    }finally{
      dispatch(setNewMusicLoading(false))
    }
    
}


/**
 * @function updateMusic
 * @param {object} music Music object
 * @param {callback} successCb callback upon success
 * @description Updates a music if user authentified 
 * @async
 * @exports
 */
export const updateMusic =  (music, successCb) => 
  async (dispatch, getState) => {
    dispatch(setNewMusicLoading(true))
    const state = getState()
        
    // Set user token for axios
    const config = {
        headers: {
          'Authorization': `Bearer ${state.User.token}`
        }
    }

    try{
      await axios.put(`api/music/update/${music.id}`,{
        title: music.title,
        setup_code: music.setupCode,
        step_code: music.stepCode,
        can_fork: music.canFork,
        private: music.isPrivate,
        image: music.image,
        fk_author: state.User.id,
        bpm: music.bpm,
        nb_steps: music.nbSteps
      }, config)
      dispatch(setNewMusicLoading(false))
      successCb();
    } catch(err){
      console.log(err.message)
      dispatch(setNewMusicLoading(false))
    }
}


/**
 * @function updateMusic
 * @param {object} id Music id
 * @param {callback} successCb callback upon success
 * @description Updates a music if user authentified 
 * @async
 * @exports
 */
export const deleteMusic =  (id, successCb) => 
  async (dispatch, getState) => {
    const state = getState()
    // Set user token for axios
    const config = {
        headers: {
          'Authorization': `Bearer ${state.User.token}`
        }
    }

    try{
      await axios.delete(`api/music/delete/${id}`, config)
      successCb();
    } catch(err){
      console.log(err.message)
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

export const selectNewMusicError = (state) => state.MusicPack.newMusicError
export const selectNewMusicLoading = (state) => state.MusicPack.newMusicLoading

// Export default reducers
export default musicPackSlice.reducer
