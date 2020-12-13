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

export default function MusicContainer() {
  // List passed should be a list of musicIDs (see redux store)
  const musicList = useSelector(selectCurrentList)
  const musicListName = useSelector(selectCurrentContainerName)
  const searchResult = useSelector(selectSearchList)
  const list = searchResult?.length === 0 ? musicList : searchResult
  const [scrollPosition, setScrollPosition] = useState(0)

  const loading = useSelector(selectLoading)

  const dispatch = useDispatch()
  const containerRef = useRef(null)

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

  const CardRender = list.map((element, key) => (
    <MusicCard musicID={element} key={key} />
  ))

  const onScroll = debounce((event) => {
    const { scrollHeight, clientHeight } = containerRef.current
    const target = event.target
    setScrollPosition(target.scrollTop / (scrollHeight - clientHeight))
  }, 500)

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
    </React.Fragment>
  ))
}
