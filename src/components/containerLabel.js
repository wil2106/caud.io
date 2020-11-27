import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  containerNavigate,
  selectCurrentContainer,
} from './../app/uiController'

/**
 * Style constants
 */
const COLOR_ACTIVE = '#fff'
const COLOR_INACTIVE = '#717790'
const BACKGROUND_HOVER = '#272a33'

export default function ContainerLabel(props) {
  const { title } = props

  /**
   * State
   */
  const [hover, setHover] = useState(false)
  const currentContainer = useSelector(selectCurrentContainer)
  const dispatch = useDispatch()
  const selected = title === currentContainer

  /**
   * Styles
   */
  const container = {
    position: 'relative',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    backgroundColor: hover && BACKGROUND_HOVER,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }

  const flagStyle = {
    position: 'absolute',
    backgroundColor: '#47CF73',
    bottom: 0,
    width: '100%',
    height: 2,
    left: 0,
  }

  const titleStyle = {
    fontSize: 20,
    color: selected ? COLOR_ACTIVE : COLOR_INACTIVE,
    fontWeight: 'bold',
  }

  /**
   * Event handlers
   */
  const onClick = !selected
    ? () => {
        dispatch(containerNavigate({ name: title }))
        setHover(false)
      }
    : null
  const onMouseEnter = !selected ? () => setHover(true) : null
  const onMouseLeave = !selected ? () => setHover(false) : null

  return (
    <div
      style={container}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h1 style={titleStyle}>{title}</h1>
      {selected && <div style={flagStyle} />}
    </div>
  )
}
