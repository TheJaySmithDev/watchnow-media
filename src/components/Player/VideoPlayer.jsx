import React, { useState, useRef, useEffect } from 'react';
import GlassButton from '../UI/GlassButton';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, title, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const playerRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // YouTube Player API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.destroy();
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (window.YT && window.YT.Player) {
      youtubePlayerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0, // Hide YouTube controls
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 0, // Disable fullscreen button
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handlePlayerStateChange
        }
      });
    }
  };

  const handlePlayerReady = (event) => {
    setIsLoaded(true);
    setVolume(event.target.getVolume() / 100);
  };

  const handlePlayerStateChange = (event) => {
    const isCurrentlyPlaying = event.data === window.YT?.PlayerState?.PLAYING;
    setIsPlaying(isCurrentlyPlaying);
  };

  // Control functions
  const togglePlayPause = () => {
    if (youtubePlayerRef.current) {
      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.setVolume(newVolume * 100);
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (youtubePlayerRef.current) {
      if (isMuted) {
        youtubePlayerRef.current.unMute();
        setIsMuted(false);
        setVolume(youtubePlayerRef.current.getVolume() / 100);
      } else {
        youtubePlayerRef.current.mute();
        setIsMuted(true);
        setVolume(0);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if (playerRef.current.webkitRequestFullscreen) {
        playerRef.current.webkitRequestFullscreen();
      } else if (playerRef.current.msRequestFullscreen) {
        playerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'f':
        toggleFullscreen();
        break;
      case 'm':
        toggleMute();
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div 
        className={`video-player-container ${isFullscreen ? 'fullscreen' : ''}`}
        ref={playerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Close button */}
        <button className="player-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Video Title */}
        <div className={`player-title ${showControls ? 'show' : ''}`}>
          <h3>{title}</h3>
        </div>

        {/* YouTube Player */}
        <div className="player-video">
          <div id="youtube-player"></div>
          {!isLoaded && (
            <div className="player-loading">
              <div className="loading-spinner"></div>
              <p>Loading video...</p>
            </div>
          )}
        </div>

        {/* Custom Controls */}
        <div className={`player-controls ${showControls ? 'show' : ''}`}>
          <div className="controls-row">
            {/* Play/Pause Button */}
            <GlassButton 
              size="small" 
              onClick={togglePlayPause}
              disabled={!isLoaded}
              className="control-btn"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </GlassButton>

            {/* Volume Controls */}
            <div className="volume-controls">
              <GlassButton 
                size="small" 
                onClick={toggleMute}
                disabled={!isLoaded}
                className="control-btn"
              >
                {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
              </GlassButton>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                disabled={!isLoaded}
              />
            </div>

            {/* Spacer */}
            <div className="controls-spacer"></div>

            {/* Fullscreen Button */}
            <GlassButton 
              size="small" 
              onClick={toggleFullscreen}
              disabled={!isLoaded}
              className="control-btn"
            >
              {isFullscreen ? '⏹️' : '⛶'}
            </GlassButton>
          </div>
        </div>

        {/* Loading overlay */}
        {!isLoaded && (
          <div className="player-loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;