import { configureStore } from '@reduxjs/toolkit'
import { userInfoSlice } from './userInfoReducer'

export default configureStore({
  reducer: {
    userInfo: userInfoSlice
  }
})