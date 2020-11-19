import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Editor from './pages/editor'
import Music from './pages/music'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/music/:id">
            <Music />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
