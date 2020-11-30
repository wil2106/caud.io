import React from 'react'
import Logo from './../assets/svg/logo'
import { Button } from '@material-ui/core'
import Background from './pictures/Rectangle 41.png'

export default function IndexPage() {
  const container = {
    height: '100%',
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }

  const backgroundImage = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  }

  const exploreStyle = {
    backgroundColor: '#5E8E5A',
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    width: 130,
    borderRadius: 8,
  }

  const exampleStyle = {
    backgroundColor: '#8F8F8F',
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    width: 130,
    borderRadius: 8,
  }

  const buttonContainer = {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }

  const navbar = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#3A3A3A80',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

  const list = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
  }

  const element = {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  }

  const logInElement = {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    marginRight: 20,
  }

  return (
    <div style={container}>
      <nav style={navbar}>
        <div style={list}>
          <Logo width={100} height="auto" />
          <p style={element}>Docs</p>
          <p style={element}>Pro</p>
          <p style={element}>Contact</p>
        </div>
        <p style={logInElement}>LogIn</p>
      </nav>
      <img src={Background} style={backgroundImage} />
      <Logo width={364} height={500} />
      <div style={buttonContainer}>
        <Button style={exploreStyle}>EXPLORE</Button>
        <Button style={exampleStyle}>EXAMPLE</Button>
      </div>
    </div>
  )
}
