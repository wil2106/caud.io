import React from 'react'
import MusicCard from './musicCard'

export default function MusicContainer(props) {
  // List passed should be a list of musicIDs (see redux store)
  const { list } = props

  const container = {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  }

  return (
    <div style={container}>
      {list.map((element, key) => (
        <MusicCard musicID={element} key={key} />
      ))}
    </div>
  )
}
