import React, { useState } from 'react'
import TextField from './textField'
import { resetSearchList, searchAPI } from './../app/musicPackSlice'
import { useDispatch } from 'react-redux'
import CancelIcon from '@material-ui/icons/Cancel'
import { Box } from '@material-ui/core'

/**
 * @function SearchBar
 * @param {Object} props React props
 * @exports
 * @description SearchBar component
 */
export default function SearchBar() {
  /**
   * States
   */
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  /**
   * Event handlers
   */
  const searchInputOnChange = ({ target }) => setSearch(target.value)
  const enterKeyEvent = ({ keyCode }) => {
    if (keyCode === 13) {
      dispatch(searchAPI(search))
    }
  }
  const resetSearch = () => {
    setSearch('')
    dispatch(resetSearchList())
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',
      }}
    >
      <TextField
        placeholder="Search..."
        value={search}
        onChange={searchInputOnChange}
        onKeyDown={enterKeyEvent}
        style={{ flexGrow: 1 }}
      />
      {search && (
        <div onClick={resetSearch} style={{ width: 'fit-content' }}>
          <CancelIcon style={{ color: '#444857' }} />
        </div>
      )}
    </Box>
  )
}
