import React, { useState } from 'react'
import CancelIcon from '@material-ui/icons/Cancel'

/**
 * Constants
 */
const BACKGROUND_ACTIVE = '#393c45'
const BACKGROUND_INACTIVE = '#252830'
const BACKGROUND_HOVERED = '#393c45'

export default function SearchBar(props) {
  /**
   * State
   */
  const [input, setInput] = useState('')
  const [background, setBackground] = useState('')
  const ref = React.createRef()

  /**
   * Event handlers
   */
  const onInputChange = (event) => setInput(event.target.value)
  const onInputSubmit = () => {}
  const onMouseEnter = () => setBackground(BACKGROUND_HOVERED)
  const onMouseLeave = () => setBackground(BACKGROUND_INACTIVE)
  const onFocus = () => setBackground(BACKGROUND_ACTIVE)
  const iconOnClick = () => {
    setInput('')
    setBackground(BACKGROUND_INACTIVE)
    ref.current.blur()
  }

  /**
   * Style
   */
  const container = {
    display: 'flex',
    marginLeft: 25,
    marginRight: 10,
    flexGrow: 1,
    backgroundColor: background,
    height: 40,
    borderRadius: 6,
    paddingLeft: 25,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }

  const inputStyle = {
    fontSize: 18,
    color: '#fff',
    border: 'none',
    outline: 'none',
    fontFamily: 'Roboto',
    height: '100%',
    flexGrow: 1,
    backgroundColor: '#fff0',
    margin: 0,
  }

  const iconStyle = {
    marginRight: 10,
    marginLeft: 15,
    color: BACKGROUND_INACTIVE,
  }

  return (
    <div
      style={container}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={onInputChange}
        onSubmit={onInputSubmit}
        style={inputStyle}
        placeholder="Search"
        onFocus={onFocus}
      />
      {input && <CancelIcon style={iconStyle} onClick={iconOnClick} />}
    </div>
  )
}
