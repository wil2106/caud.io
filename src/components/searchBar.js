import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

export default function SearchBar(props) {
  const [input, setInput] = useState('')
  const onInputChange = (event) => setInput(event.target.value)
  const onInputSubmit = () => {}

  const style = {
    paddingLeft: 25,
    fontSize: 14,
    color: '#868CA0',
    fontWeight: '500',
    flexGrow: 1,
    backgroundColor: '#252830',
  }

  return (
    <TextField
      variant="outlined"
      label="Search"
      id="outlined-basic"
      value={input}
      onChange={onInputChange}
      onSubmit={onInputSubmit}
      style={style}
    />
  )
}
