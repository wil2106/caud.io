import React from 'react'
import { containers } from './../app/UIConstants'
import ContainerLabel from './containerLabel'

/**
 * @function ContainerSwitcher
 * @param {Object} props
 * @description Component containing ContainerLabel sub-components and used in the Explore container for switching between different sort categories.
 * @exports
 */
export default function ContainerSwitcher(props) {
  /**
   * Style
   */
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
        <ContainerLabel list={element} key={key} />
      ))}
      <div style={underline} />
    </div>
  )
}
