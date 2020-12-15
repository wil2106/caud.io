import React from 'react'
import Logo from './../assets/svg/logo'
import NavItem from './navItem'
import { Button } from '@material-ui/core'
import { pages } from './../app/UIConstants'

import {
  Link
} from "react-router-dom";

/**
 * Constants
 */
const LOGO_SIZE = 60
const CREATE_NEW = 'NEW'

/**
 * @function NavBar
 * @param {Object} props React props
 * @description Navbar component used in home page
 * @exports
 */
export default function NavBar(props) {
  /**
   * Style
   */
  const container = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 200,
    alignItems: 'center',
    backgroundColor: '#1E1F26',
  }

  const buttonStyle = {
    backgroundColor: '#47CF73',
    height: 40,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    width: 135,
  }

  const logoStyle = {
    marginBottom: 40,
    marginTop: 20,
  }

  return (
    <div style={container}>
      <Logo height={LOGO_SIZE} width="auto" style={logoStyle} />
      <>
        {pages.map((element, key) => (
          <NavItem  page={element} key={key} />
        ))}
      </>
      
      <Link to="/editor" style={{ textDecoration: 'none', color: '#000'}}>
        <Button style={buttonStyle}>
        {CREATE_NEW}
        </Button>
      </Link>
      
    </div>
  )
}
