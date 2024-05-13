import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../Redux/slices/auth/'
import courseSlice from '../Redux/slices/courses'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    course: courseSlice,
  },
})