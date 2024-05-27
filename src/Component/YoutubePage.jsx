import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos, setNextPageToken, selectSearchQuery, selectVideos, selectNextPageToken, setSearchQuery } from '../reducers/videoSlice';
import "./style.css"
import { useNavigate } from 'react-router-dom';

const YouTubePage = () => {
  const dispatch = useDispatch();
  const videos = useSelector(selectVideos);
  const nextPageToken = useSelector(selectNextPageToken);
  const searchQuery = useSelector(selectSearchQuery);
  const bottomRef = useRef();
  const api_key = 'AIzaSyAy-JlEFf-pX_AZGDowAMNF7-51NJ_Ogzc';
  const video_http = 'https://www.googleapis.com/youtube/v3/videos?';
  const channel_http = 'https://www.googleapis.com/youtube/v3/channels?';
  const search_http = 'https://www.googleapis.com/youtube/v3/search?';
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });
      observer.observe(bottomRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [bottomRef.current, nextPageToken, isFetching]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && nextPageToken && !isFetching) {
      fetchMoreVideos();
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get(video_http, {
        params: {
          key: api_key,
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 25,
          regionCode: 'US'
        },
      });
      const data = response.data;
      const videoData = data.items;
      const channelPromises = videoData.map((video) => fetchChannelIcon(video));
      const videosWithChannelIcons = await Promise.all(channelPromises);
      dispatch(setVideos(videosWithChannelIcons));
      dispatch(setNextPageToken(data.nextPageToken || ''));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChannelIcon = async (video) => {
    try {
      const response = await axios.get(channel_http, {
        params: {
          key: api_key,
          part: 'snippet',
          id: video.snippet.channelId,
        },
      });
      const channelThumbnail = response.data.items[0].snippet.thumbnails.default.url;
      return { ...video, channelThumbnail };
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreVideos = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(video_http, {
        params: {
          key: api_key,
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 25,
          regionCode: 'US',
          pageToken: nextPageToken
        },
      });
      const data = response.data;
      const videoData = data.items;
      const channelPromises = videoData.map((video) => fetchChannelIcon(video));
      const videosWithChannelIcons = await Promise.all(channelPromises);
      dispatch(setVideos([...videos, ...videosWithChannelIcons]));
      dispatch(setNextPageToken(data.nextPageToken || ''));
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (searchQuery.length) {
      try {
        const response = await axios.get(search_http, {
          params: {
            key: api_key,
            part: 'snippet',
            q: searchQuery,
            maxResults: 25,
            type: 'video'
          },
        });
        const data = response.data;
        const searchResults = data.items;
        const channelPromises = searchResults.map((result) => fetchChannelIcon(result));
        const videosWithChannelIcons = await Promise.all(channelPromises);
        dispatch(setVideos(videosWithChannelIcons));
        dispatch(setNextPageToken(data.nextPageToken || ''));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="toggle-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <img src="img/logo.PNG" className="logo" alt="" />
        <div className="search-box">
          <div className="input-container">
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className="search-bar"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            <button className="search-btn" onClick={handleSearch}>
              <img src="img/search.PNG" alt="Search" />
            </button>
          </div>
          <button className="micro-btn">
            <img src="img/micro.PNG" alt="Micro" />
          </button>
        </div>
        <div className="user-options">
          <img src="img/video.PNG" className="icon" alt="" />
          <img src="img/grid.PNG" className="icon" alt="" />
          <img src="img/bell.PNG" className="icon" alt="" />
          <div className="user-dp">
            <img src="img/avatar.png" alt="" />
          </div>
        </div>
      </nav>

      <div className="side-bar">
        <a href="#" className="links active"><img src="img/Home2.PNG" alt="" />home</a>
        <a href="#" className="links"><img src="img/shorts.PNG" alt="" />Shorts</a>
        <a href="#" className="links"><img src="img/subscription4.png" alt="" />Subscriptions</a>
        <hr className="seperator" />
        <a href="#" className="links right"><b>You</b><img src="img/right.PNG" alt="" /></a>
        <a href="#" className="links"><img src="img/library4.PNG" alt="" />Your Channel</a>
        <a href="#" className="links"><img src="img/history3.PNG" alt="" />history</a>
        <a href="#" className="links"><img src="img/Playlist.PNG" alt="" />Playlist</a>
        <a href="#" className="links"><img src="img/watchlater.PNG" alt="" />watch later</a>
        <a href="#" className="links"><img src="img/like.PNG" alt="" />like video</a>
        <hr className="seperator" />
        <a href="#" className="links"><b>Subscription</b></a>
        <a href="#" className="links"><img src="img/w2w.PNG" alt="" />W2W Cartoon</a>
        <a href="#" className="links"><img src="img/f82.PNG" alt="" />F8 Official</a>
        <a href="#" className="links"><img src="img/wwe2.PNG" alt="" />WWE</a>
        <a href="#" className="links"><img src="img/honkaisr.PNG" alt="" />Honkai: star rail</a>
        <a href="#" className="links"><img src="img/show more.PNG" alt="" />show more</a>
        <hr className="seperator" />
        <a href="#" className="links"><b>Explore</b></a>
        <a href="#" className="links"><img src="img/trend.PNG" alt="" />Trending</a>
        <a href="#" className="links"><img src="img/music2.PNG" alt="" />Music</a>
        <a href="#" className="links"><img src="img/Gaming.PNG" alt="" />Gaming</a>
        <a href="#" className="links"><img src="img/newss.PNG" alt="" />News</a>
        <a href="#" className="links"><img src="img/sport2.PNG" alt="" />Sport</a>
        <hr className="seperator" />
        <a href="#" className="links"><img src="img/setting.PNG" alt="" />Settings</a>
        <a href="#" className="links"><img src="img/Rb.PNG" alt="" />Report history</a>
        <a href="#" className="links"><img src="img/help.PNG" alt="" />Help</a>
        <a href="#" className="links"><img src="img/feedback.PNG" alt="" />Send Feedback</a>
        <hr className="seperator" />
      </div>

      <div className="filters">
        <button className="filter-options active">all</button>
        <button className="filter-options">CSS</button>
        <button className="filter-options">Html</button>
        <button className="filter-options">python</button>
        <button className="filter-options">C++</button>
        <button className="filter-options">React</button>
        <button className="filter-options">javascript</button>
        <button className="filter-options">Ruby</button>
        <button className="filter-options">Độ Mixi</button>
        <button className="filter-options">trending</button>
        <button className="filter-options">Music</button>
        <button className="filter-options">Gaming</button>
        <button className="filter-options">News</button>
        <button className="filter-options">Honkai: Star Rail </button>
        <button className="filter-options">PlayList</button>
        <button className="filter-options">English</button>
      </div>

      <div className="video-container">
        {videos.map((video, index) => (
          <div 
            className="video" 
            key={index} 
            onClick={() => navigate(`/video/${video.id}`)}
          >
            <img src={video.snippet.thumbnails.high.url} className="thumbnail" alt="" />
            <div className="content">
              <img src={video.channelThumbnail} className="channel-icon" alt="" />
              <div className="info">
                <h4 className="title">{video.snippet.title}</h4>
                <p className="channel-name">{video.snippet.channelTitle}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default YouTubePage;
