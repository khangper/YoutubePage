import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./style.css";
import Navbar from './Navbar';

const VideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const apiKey = 'AIzaSyAy-JlEFf-pX_AZGDowAMNF7-51NJ_Ogzc';

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          key: apiKey,
          part: 'snippet,statistics',
          id: videoId
        }
      });
      setVideoDetails(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: apiKey,
          part: 'snippet',
          relatedToVideoId: videoId,
          type: 'video',
          maxResults: 5
        }
      });
      setRelatedVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching related videos:', error);
    }
  };

  return (
    
    
    <div className="video-page">
<Navbar></Navbar>

      {videoDetails ? (
        <div className="video-details">
          <div className="video-player">
            <iframe
              width="100%"
              height="500px"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allowFullScreen
              title={videoDetails.snippet.title}
            ></iframe>
          </div>
          <div className="video-info">
            <h2 className="Video-Title" >{videoDetails.snippet.title}</h2>
            {/* <p className="Video-description">{videoDetails.snippet.description}</p> */}
            <p className="Video-View">Views: {videoDetails.statistics.viewCount}</p>
            <p className="Video-Like">Likes: {videoDetails.statistics.likeCount}</p>
            <p className="Video-Date">Published Date: {new Date(videoDetails.snippet.publishedAt).toLocaleDateString()}</p>
            <p className="Video-Channel">Channel: {videoDetails.snippet.channelTitle}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* <h3>Related Videos</h3> */}
      <div className="related-videos">
        {relatedVideos.map((video, index) => (
          <div
            className="video"
            key={index}
            onClick={() => navigate(`/video/${video.id.videoId}`)}
          >
            <img src={video.snippet.thumbnails.high.url} className="thumbnail" alt={video.snippet.title} />
            <div className="content">
              <h4 className="title">{video.snippet.title}</h4>
              <p className="channel-name">{video.snippet.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
