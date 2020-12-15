import React from 'react'
import './App.css'

import Home from './pages/home'
import Editor from './pages/editor'
import Music from './pages/music'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLogin } from './app/userSlice'
import ProfilePage from './pages/profile'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/music/:id">
            <Music />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

// Private routes for some pages
function PrivateRoute({ children, ...rest }) {
  let auth = useSelector(selectLogin)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/home', //Redirection to default path
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default App
