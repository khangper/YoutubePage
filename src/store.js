// store.js
import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './reducers/videoSlice';

export default configureStore({
  reducer: {
    video: videoReducer,
  },
});
