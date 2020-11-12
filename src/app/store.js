import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import musicPackReducer from './musicPackSlice'
import liveSessionReducer from './liveSessionSlice'
import playableMusicReducer from './playableMusicSlice'
import uiControllerReducer from './uiController'

export default configureStore({
  reducer: {
    User: userReducer,
    MusicPack: musicPackReducer,
    LiveSession: liveSessionReducer,
    playableMusicReducer: playableMusicReducer,
    UIController: uiControllerReducer,
  },
})
