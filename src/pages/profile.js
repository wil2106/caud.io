import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserMusics, retrieveMusics } from './../app/musicPackSlice'
import MusicContainer from './../components/musicContainer'
import Logo from './../assets/svg/logo'
import { useHistory } from 'react-router-dom'

/**
 * @function ProfilePage
 * @description Profile page to access an users' profile information
 * @exports
 */
export default function ProfilePage() {
  /**
   * State
   */
  const user = useSelector((state) => state.User)
  const dispatch = useDispatch()
  const history = useHistory()
  const { login, description, userMusicIDs } = user
  const descriptionDisplay = 'Default description' ?? description

  /**
   * Init
   */
  dispatch(getUserMusics(login))
  dispatch(retrieveMusics(userMusicIDs))

  /**
   * Style
   */
  const container = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }

  const title = {
    color: '#fff',
  }

  const content = {
    color: '#fff',
  }

  const logoStyle = {
    left: 0,
    top: 30,
    position: 'absolute',
    cursor: 'pointer',
  }

  /**
   * Event handler
   */
  const logoOnClick = () => history.push('/home')

  return (
    <div style={container}>
      <div onClick={logoOnClick}>
        <Logo height={60} width={300} style={logoStyle} />
      </div>
      <h1 style={title}>{login}</h1>
      <p style={content}>{descriptionDisplay}</p>
      <MusicContainer listCustom={userMusicIDs} />
    </div>
  )
}
