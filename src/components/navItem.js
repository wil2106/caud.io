import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrent, navigate } from './../app/uiController'

const ICON_SIZE = '16px'
const COLOR_ACTIVE = '#fff'
const COLOR_INACTIVE = '#717790'
const BACKGROUND_HOVERED = '#393c45'

export default function NavItem(props) {
  const { icon: Icon, title } = props.page
  const [hover, setHover] = useState(false)
  const dispatch = useDispatch()
  /**
   * Obtain information from redux store
   */
  const current = useSelector(selectCurrent)
  const selected = current === title

  const container = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    backgroundColor: hover && BACKGROUND_HOVERED,
  }

  const titleStyle = {
    color: selected ? COLOR_ACTIVE : COLOR_INACTIVE,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 16,
  }

  const flagStyle = {
    width: 1,
    height: 14,
    backgroundColor: '#47CF73',
    position: 'absolute',
    right: 0,
    top: 0,
  }

  const backgroundFlag = {
    position: 'absolute',
  }

  const iconFill = selected ? COLOR_ACTIVE : COLOR_INACTIVE

  const onClick = !selected ? () => dispatch(navigate({ page: title })) : null

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
      <h1 style={titleStyle}>{title}</h1>
      {selected && <div style={flagStyle} />}
      {hover && <div style={backgroundFlag} />}
    </div>
  )
}
