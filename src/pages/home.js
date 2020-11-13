import React from 'react'
import NavBar from '../components/navBar'
import MusicContainer from './../components/musicContainer'
import { useSelector } from 'react-redux'

export default function Home(props) {
  const musicList = useSelector((state) => state.MusicPack.mostRecentIDs)

  const container = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }

  return (
    <div style={container}>
      <NavBar />
      <MusicContainer list={musicList} />
    </div>
  )
}
