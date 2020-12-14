import React, { useEffect } from 'react'
import NavBar from '../components/navBar'
import { useSelector } from 'react-redux'
import { selectCurrent } from '../app/uiController'
import About from './about'
import Explore from './Explore'
import Doc from './Doc'

export default function Home() {
  /**
   * State
   */
  const pageName = useSelector(selectCurrent)
  /**
   * Style
   */
  const container = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }

  const containerType = () => {
    switch (pageName) {
      case 'Explore':
        return <Explore />
      case 'About':
        return <About />
      case 'Doc':
        return <Doc />
      default:
        return <Explore />
    }
  }

  return (
    <div style={container}>
      <NavBar />
      {containerType()}
    </div>
  )
}
