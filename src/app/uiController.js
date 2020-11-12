import { createSlice } from '@reduxjs/toolkit'
import { Person, Explore } from '@material-ui/icons'

const pages = [
  {
    icon: Explore,
    title: 'Explore',
  },
  {
    icon: Person,
    title: 'Profile',
  },
]

const defaultState = {
  current: 'Explore',
}

export const UISlicer = createSlice({
  name: 'UIController',
  initialState: defaultState,
  reducers: {
    navigate: (state, action) => {
      const { page } = action.payload
      state.current = page
    },
  },
})

export const { navigate } = UISlicer.actions

/**
 * React redux selectors
 */
export const selectCurrent = (state) => state.UIController.current
export const selectAllPages = (state) => pages

export default UISlicer.reducer
