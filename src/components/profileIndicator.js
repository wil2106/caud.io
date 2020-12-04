import React, { useState } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import Crown from './../assets/picture/crown.png'
import { useSelector } from 'react-redux'
import { selectLogin } from '../app/userSlice'

export default function ProfileIndicator(props) {
  const { host } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const user = useSelector(selectLogin)

  const container = {
    height: 40,
    width: 40,
    borderRadius: 26,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const title = {
    fontSize: 18,
    color: '#000',
  }

  const crownStyle = {
    position: 'absolute',
    top: -12,
    left: 8,
  }

  const handleClose = () => setAnchorEl(null)
  const handleClick = (event) => setAnchorEl(event.currentTarget)

  return (
    <div style={{ position: 'relative', marginRight: 10, marginLeft: 10 }}>
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
        <p style={title}>WS</p>
      </div>
      <Menu
        id="simple-menu"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
