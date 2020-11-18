import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrent, navigate } from './../app/uiController'

/**
 * Constants
 */
const ICON_SIZE = '16px'
const COLOR_ACTIVE = '#fff'
const COLOR_INACTIVE = '#717790'
const BACKGROUND_HOVERED = '#393c45'

export default function NavItem(props) {
  const { icon: Icon, title } = props.page
  /**
   * State
   */
  const [hover, setHover] = useState(false)
  const dispatch = useDispatch()
  /**
   * Obtain information from redux store
   */
  const current = useSelector(selectCurrent)
  const selected = current === title
  const iconFill = selected ? COLOR_ACTIVE : COLOR_INACTIVE

  /**
   * Style
   */
  const container = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    backgroundColor: hover && BACKGROUND_HOVERED,
    position: 'relative',
    right: 0,
    top: 0,
  }

  const titleStyle = {
    color: selected ? COLOR_ACTIVE : COLOR_INACTIVE,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 16,
  }

  const flagStyle = {
    width: 2,
    height: '100%',
    backgroundColor: '#47CF73',
    position: 'absolute',
    right: 0,
    top: 0,
  }

  const backgroundFlag = {
    position: 'absolute',
  }

  /**
   * Event handlers
   */
  const onClick = !selected
    ? () => {
        dispatch(navigate({ page: title }))
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
      <Icon
        width={ICON_SIZE}
        height={ICON_SIZE}
        style={{ color: iconFill, paddingLeft: 20 }}
      />
      <h1 style={titleStyle} className="noSelect">
        {title}
      </h1>
      {selected && <div style={flagStyle} />}
      {hover && <div style={backgroundFlag} />}
    </div>
  )
}
