import { createSlice } from '@reduxjs/toolkit'
import { containers, pages } from './UIConstants'

/**
 * Default state of UIController
 */
const defaultState = {
  current: 'Explore',
  currentContainer: 'Most recent',
}

// Create UI redux slice
export const UISlicer = createSlice({
  name: 'UIController',
  initialState: defaultState,
  reducers: {
    navigate: (state, action) => {
      const { page } = action.payload
      state.current = page
    },
    containerNavigate: (state, action) => {
      const { name } = action.payload
      state.currentContainer = name
    },
  },
})

// Export Actions
export const { navigate, containerNavigate } = UISlicer.actions

// Export selectors
export const selectCurrent = (state) => state.UIController.current
export const selectCurrentContainer = (state) =>
  state.UIController.currentContainer
export const selectCurrentContainerName = (state) =>
  containers.find((element) => element.name === state.UIController.current).list

// Export default reducers
export default UISlicer.reducer
