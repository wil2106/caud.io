import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './pages/home'
import useAuth from './components/hooks/useAuth'

function App() {
  return (
    <div className="App">
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

// Private routes for some pages
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
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
