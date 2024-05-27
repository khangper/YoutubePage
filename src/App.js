import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import VideoPage from './Component/VideoPage';
import YouTubePage from './Component/YoutubePage';
import Navbar from './Component/Navbar';

function App() {
  const videos = [
    // Your video data here
  ];

  return (
    <Router>

      <Routes>


        <Route path="/" element={<YouTubePage videos={videos} />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

