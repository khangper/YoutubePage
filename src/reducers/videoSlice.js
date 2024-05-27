// videoSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videos: [],
    nextPageToken: '',
    searchQuery: '',
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setNextPageToken: (state, action) => {
      state.nextPageToken = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = '';
      state.searchQuery = '';
    },
  },
});

export const { setVideos, setNextPageToken, setSearchQuery, clearVideos } = videoSlice.actions;

export const selectVideos = (state) => state.video.videos;
export const selectNextPageToken = (state) => state.video.nextPageToken;
export const selectSearchQuery = (state) => state.video.searchQuery;

export default videoSlice.reducer;

