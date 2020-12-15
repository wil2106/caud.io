import React from 'react'
import Logo from './../assets/svg/logo'

/**
 * @function About
 * @description Static page for About container
 * @exports
 */
export default function About() {
  /**
   * Styles
   */
  const container = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }

  const title = {
    color: '#fff',
    fontSize: 36,
  }

  const content = {
    fontSize: 18,
    color: '#fff',
    width: '90%',
  }

  const logoStyle = {
    marginTop: 20,
  }

  return (
    <div style={container}>
      <Logo height={120} width="auto" style={logoStyle} />
      <h1 style={title}>About us</h1>
      <p style={content}>
        This project started as an academic project for the course "Async event
        driven programming". Caud.io combines the power of{' '}
        <a href="https://tonejs.github.io/" style={{ color: '#fffA' }}>
          ToneJS
        </a>{' '}
        and prototyping principles to create an online sandbox music coding
        tool. This is a first version of Caud.io, and we aim to further pursue
        its development into a viable product.
      </p>

      <footer style={{ position: 'absolute', bottom: 20 }}>
        <p style={{ color: '#fff' }}>Licensed under M.I.T.</p>
      </footer>
    </div>
  )
}
