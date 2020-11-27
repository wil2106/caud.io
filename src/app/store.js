import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import musicPackReducer from './musicPackSlice'
import liveSessionReducer from './liveSessionSlice'
import playableMusicReducer from './playableMusicSlice'
import uiControllerReducer from './uiController'

/**
 * Initialize redux store
 * Rule: Store names starts with an Uppercase letter
 */
export default configureStore({
  reducer: {
    User: userReducer,
    MusicPack: musicPackReducer,
    LiveSession: liveSessionReducer,
    PlayableMusicReducer: playableMusicReducer,
    UIController: uiControllerReducer,
  },
})
