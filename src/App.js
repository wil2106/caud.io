import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './pages/home'
import { useSelector } from 'react-redux'
import { selectLogin } from './app/userSlice'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
              pathname: '/login', //Redirection to default path
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default App
