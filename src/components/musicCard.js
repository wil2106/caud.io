import { Button, ButtonBase } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ForkIcon from './../assets/svg/fork'
import defaultPicture from './../assets/picture/defaultMusic.jpg'

/**
 * @function MusicCard
 * @param {Object} props React props 
 * @exports
 * @description Music Card component used in Music container to display music objects
 */
export default function MusicCard(props) {
  /**
   * State
   */
  const { musicID } = props
  const [hover, setHover] = useState(false)
  const musicObject = useSelector((state) => state.MusicPack.musics[musicID])
  const musicPicture = musicObject.image ? musicObject.image : defaultPicture
  const username = musicObject.login
    ? musicObject.login.split('@')[0]
    : 'Default'

  /**
   * Style
   */
  const container = {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: 350,
    marginLeft: 20,
    marginRight: 20,
    marginTop: !hover && 20,
  }

  const imageStyle = {
    width: 230,
    height: 230,
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    marginTop: 10,
    alignSelf: 'center',
    objectFit: 'cover',
  }

  const titleStyle = {
    fontSize: 20,
    color: '#fff',
    textAlign: 'left',
    marginLeft: 10,
  }

  const authorStyle = {
    fontSize: 12,
    color: '#868CA0',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 0,
  }

  const playStyle = {
    color: '#868CA0',
    fontSize: 12,
    marginTop: 0,
    marginBottom: 0,
    flexGrow: 1,
  }

  const optionStyle = {
    backgroundColor: '#030304',
    height: 20,
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 50,
    marginRight: 10,
  }

  const playButtonStyle = {
    width: 30,
    height: 30,
    backgroundColor: '#47CF73',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 20,
    right: 20,
  }

  const buttonsContainer = {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  }

  const containerWrapper = {
    width: '100%',
    height: 'fit-content',
    backgroundColor: hover ? '#444857' : '#1F2229',
    borderRadius: 6,
  }
  /**
   * Event handlers
   */
  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => setHover(false)
  const onPlayButtonClick = () => {}

  return (
    <div
      style={container}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={containerWrapper}>
        <div style={{ width: '100%', position: 'relative' }}>
          <img src={musicPicture} style={imageStyle} />
          {hover && (
            <ButtonBase style={playButtonStyle} onClick={onPlayButtonClick}>
              <PlayArrowIcon style={{ color: '#fff' }} />
            </ButtonBase>
          )}
        </div>
        <h1 style={titleStyle}>{musicObject.title}</h1>
        <p style={authorStyle}>{`By ${username}`}</p>
        {hover ? (
          <div style={buttonsContainer}>
            <Button style={optionStyle}>
              <FavoriteIcon style={{ fontSize: 14 }} />
              {musicObject['nb_likes']}
            </Button>
            <Button style={optionStyle}>
              <ForkIcon width="12px" height="12px" />
              {musicObject['nb_forks']}
            </Button>
            <p style={playStyle}>
              <PlayArrowIcon style={{ fontSize: 12 }} />
              {musicObject['nb_listen']}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
