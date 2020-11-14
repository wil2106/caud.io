import React from 'react'
import { containers } from './../app/UIConstants'
import ContainerLabel from './containerLabel'

export default function ContainerSwitcher(props) {
  const container = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    position: 'relative',
  }

  const underline = {
    width: '100%',
    height: 2,
    backgroundColor: '#2C303A',
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  }
  return (
    <div style={container}>
      {containers.map((element, key) => (
        <ContainerLabel title={element.name} key={key} />
      ))}
      <div style={underline} />
    </div>
  )
}
