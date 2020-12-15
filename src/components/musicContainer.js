import React, { useState, useEffect, useRef, useMemo } from 'react'
import MusicCard from './musicCard'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import { requestNextPage, selectSearchList } from './../app/musicPackSlice'
import EmptyContainer from './emptyContainer'
import { useSelector } from 'react-redux'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectCurrentList, selectLoading } from '../app/musicPackSlice'
import { selectCurrentContainerName } from '../app/uiController'
import MusicPlayer from '../models/MusicPlayer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


let musicPlayer = new MusicPlayer();

/**
 * @function MusicContainer
 * @param {Object} props React props 
 * @description Music container component displaying music object inside cards
 * @exports
 */
export default function MusicContainer(props) {
  /**
   * States
   */
  const { listCustom } = props
  // List passed should be a list of musicIDs (see redux store)
  const musicList = useSelector(selectCurrentList) ?? listCustom
  const musicListName = useSelector(selectCurrentContainerName)
  const searchResult = useSelector(selectSearchList)
  const list = searchResult?.length === 0 ? musicList : searchResult
  const [scrollPosition, setScrollPosition] = useState(0)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const containerRef = useRef(null)
  const [openAudioContextDialog, setOpenAudioContextDialog] = useState(false);

  /**
   * Use effect hooks
   */
  useEffect(() => {
    if(!musicPlayer.isAudioContextStarted()){
      setOpenAudioContextDialog(true)
    }
  }, [])
  // Dynamic resource loading
  useEffect(() => {
    if (scrollPosition >= 0.9) {
      dispatch(requestNextPage(musicListName))
      setScrollPosition(0)
    }
  }, [scrollPosition])

  useEffect(() => {
    containerRef.current.scrollTop = 0
  }, [musicListName])

  /**
   * Style
   */
  const container = {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'relative',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  }

  

  /**
   * Event handlers
   */
  const onScroll = debounce((event) => {
    const { scrollHeight, clientHeight } = containerRef.current
    const target = event.target
    setScrollPosition(target.scrollTop / (scrollHeight - clientHeight))
  }, 500)

  const handleMusicPlay = async (music) => {
    if(musicPlayer.musicID !== music.id){
      if(typeof musicPlayer.musicID === "number")
        musicPlayer.sequencer.cancel()
      await musicPlayer.initialize(music.id, music.bpm, music.nb_steps, music.setup_code, music.step_code)
    }
    musicPlayer.play()
  }

  const handleMusicStop = () => {
    musicPlayer.stop()
  }

  const handleStartAudioContextAndCloseDialog = () => {
    musicPlayer.startAudioContext()
    setOpenAudioContextDialog(false)
  }

  // Music card renders
  const CardRender = list.map((element, key) => (
    <MusicCard musicID={element} key={key} handleMusicPlay={handleMusicPlay} handleMusicStop={handleMusicStop}/>
  ))

  return useMemo(() => (
    <React.Fragment>
      {searchResult?.length && (
        <h1 style={{ color: 'white' }}>Search Result:</h1>
      )}
      <div style={container} onScroll={onScroll} ref={containerRef}>
        {list.length ? CardRender : <EmptyContainer />}
        <Box display="flex" justifyContent="center" width={1} m={2}>
          {loading && <CircularProgress style={{ color: '#47CF73' }} />}
        </Box>
      </div>
      <div>
        <Dialog
          open={openAudioContextDialog}
        >
          <DialogTitle>✋ Audio context authorization</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you allow this website to play audio ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStartAudioContextAndCloseDialog} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  ))
}
