import React, { useState, useEffect, useRef, useMemo } from 'react'
import MusicCard from './musicCard'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import { requestNextPage } from './../app/musicPackSlice'
import EmptyContainer from './emptyContainer'

export default function MusicContainer(props) {
  // List passed should be a list of musicIDs (see redux store)
  const { list } = props
  const [scrollPosition, setScrollPosition] = useState(0)

  const dispatch = useDispatch()
  const containerRef = useRef(null)

  // Dynamic resource loading
  useEffect(() => {
    if (scrollPosition >= 0.9) {
      dispatch(requestNextPage())
      setScrollPosition(0)
    }
  }, [scrollPosition])

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
    <div style={container} onScroll={onScroll} ref={containerRef}>
      {list.length ? CardRender : <EmptyContainer />}
    </div>
  ))
}
