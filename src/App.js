import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/home'

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
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
