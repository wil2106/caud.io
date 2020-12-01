import React from 'react'
import NavBar from '../components/navBar'
import MusicContainer from './../components/musicContainer'
import { useSelector } from 'react-redux'
import ContainerSwitcher from './../components/containerSwitcher'
import {
  selectCurrentList,
  selectLoading,
  selectSearchList,
} from '../app/musicPackSlice'
import SearchBar from './../components/searchBar'
import { Button } from '@material-ui/core'
import useAuth from '../components/hooks/useAuth'
import ProfileIndicator from '../components/profileIndicator'

/**
 * Constants
 */
const LOGIN = 'Login'
const SIGNUP = 'Sign up'

export default function Home(props) {
  /**
   * State
   */
  const searchResult = useSelector(selectSearchList)
  const musicList = useSelector(selectCurrentList)
  const loading = useSelector(selectLoading)
  const displayList = searchResult?.length === 0 ? musicList : searchResult
  const user = useAuth()

  /**
   * Style
   */
  const container = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }

  const panel = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }

  const topBar = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  }

  const loginButton = {
    backgroundColor: '#47CF73',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
    height: 35,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
  }

  const signUpButton = {
    backgroundColor: '#444857',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
    height: 35,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
  }

  const loadingStyle = {
    color: '#fff',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#fff6',
    height: 50,
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  }

  return (
    <div style={container}>
      <NavBar />
      <div style={panel}>
        <div style={topBar}>
          <SearchBar />
          {user ? (
            <ProfileIndicator host />
          ) : (
            <>
              <Button style={loginButton}>{LOGIN}</Button>
              <Button style={signUpButton}>{SIGNUP}</Button>
            </>
          )}
        </div>
        {searchResult?.length === 0 && <ContainerSwitcher />}
        <MusicContainer list={displayList} />
        {loading && (
          <div style={loadingStyle}>
            <p>Loading</p>
          </div>
        )}
      </div>
    </div>
  )
}
