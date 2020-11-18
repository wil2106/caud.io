import React from 'react'

export default function EmptyContainer() {
  const container = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  }

  const title = {
    color: '#fff',
  }

  return (
    <div style={container}>
      <h1 style={title}>NO MUSIC</h1>
    </div>
  )
}
