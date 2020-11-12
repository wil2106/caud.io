import React from 'react'
import './App.css'
import NavBar from './components/navBar'

function App() {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100',
        justifyContent: 'space-around',
      }}
    >
      <NavBar />
    </div>
  )
}

export default App
