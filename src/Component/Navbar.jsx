import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="toggle-btn">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Link to="/"> <img src="/img/logo.PNG" className="logo" alt="Logo" />
</Link>
     
      <div className="search-box">
        <div className="input-container">
          <input
            type="text"
            className="search-bar"
            placeholder="search"
          />
          <button className="search-btn">
            <img src="/img/search.PNG" alt="Search" />
          </button>
        </div>
        <button className="micro-btn">
          <img src="/img/micro.PNG" alt="Micro" />
        </button>
      </div>

      <div className="user-options">
        <img src="/img/video.PNG" className="icon" alt="Video" />
        <img src="/img/grid.PNG" className="icon" alt="Grid" />
        <img src="/img/bell.PNG" className="icon" alt="Bell" />
        <div className="user-dp">
          <img src="/img/avatar.png" alt="User" />
        </div>
      </div>
    </nav>
  );
}
