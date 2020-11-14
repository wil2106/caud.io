import { createSlice } from '@reduxjs/toolkit'
import { containers, pages } from './UIConstants'

const defaultState = {
  current: 'Explore',
  currentContainer: 'Most recent',
}

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

export const { navigate, containerNavigate } = UISlicer.actions

/**
 * React redux selectors
 */
export const selectCurrent = (state) => state.UIController.current
export const selectCurrentContainer = (state) =>
  state.UIController.currentContainer

export default UISlicer.reducer
