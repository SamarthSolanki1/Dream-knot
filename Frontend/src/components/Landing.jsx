import React, { useState, useRef, useEffect } from 'react';
import '../styles/landing.css'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
        setVideoError(true);
      });
    }
  }, [isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    console.error("Video failed to load");
  };
  function onhandle()  {
    navigate('/login');
}
  return (
      
    <div className="video-container">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        className={isVideoLoaded ? '' : 'opacity-0'} // Optional: opacity for smooth loading
      >
        <source src="/weeding.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background in case of video error */}
      {videoError && (
        <div className="video-overlay bg-gradient-to-br from-rose-400 to-rose-600"></div>
      )}

      {/* Overlay */}
      {!videoError && <div className="video-overlay"></div>}

      {/* Hero Content */}
      <div className="hero-content">
  <h1 className="main-heading">Plan Your Weeding</h1>
  <p className="sub-text">
    Pick your date. Set your budget.
    <br />
    Choose your venue.
  </p>
  <button className="hero-button" onClick={onhandle}>Plan Now</button>
</div>
</div>
  );
};

export default HeroSection;
