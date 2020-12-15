import React, { useState } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import Crown from './../assets/picture/crown.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectLogin, selectUserColor } from '../app/userSlice'
import { useHistory } from 'react-router-dom'

export default function ProfileIndicator(props) {
  const { host } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const user = useSelector(selectLogin)
  const color = useSelector(selectUserColor)
  const dispatch = useDispatch()
  const history = useHistory()

  const container = {
    height: 40,
    width: 40,
    borderRadius: 26,
    backgroundColor: color,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const title = {
    fontSize: 18,
    color: '#fff',
  }

  const crownStyle = {
    position: 'absolute',
    top: -12,
    left: 8,
  }

  const handleClose = () => setAnchorEl(null)

  const handleProfile = () => {
    setAnchorEl(null)
    history.push('/profile')
  }

  const handleAccount = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(logout())
  }

  const handleClick = (event) => setAnchorEl(event.currentTarget)

  return (
    <div
      style={{ position: 'relative', marginRight: 10, marginLeft: 10 }}
      alt={user}
    >
      {host && (
        <img
          src={Crown}
          style={crownStyle}
          width={24}
          height={24}
          alt="Crown"
        />
      )}
      <div style={container} onClick={handleClick}>
        <p style={title}>{user.substring(0, 1)}</p>
      </div>
      <Menu
        id="simple-menu"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
