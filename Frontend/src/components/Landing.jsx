import React, { useState, useRef, useEffect } from 'react';
import '../styles/landing.css'

const HeroSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
        setVideoError(true);
      });
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    console.error("Video failed to load");
  };

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
        <p>
          Pick your date. Set your budget.
          <br />
          Choose your venue.
        </p>
        <button className="hero-button">Check availability</button>
      </div>
    </div>
  );
};

export default HeroSection;
