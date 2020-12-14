import React from 'react'

export default function Doc() {
  const container = {
    width: '100%',
    height: '100%',
  }

  const title = {
    color: '#fff',
  }

  const content = {
    color: '#fff',
  }
  return (
    <div style={container}>
      <h1 style={title}> DOCS </h1>
      <p style={content}> Coming soon™</p>
      <a
        href="https://tonejs.github.io/docs/14.7.58/index.html"
        style={content}
      >
        Tone.Js
      </a>
    </div>
  )
}
