import React, { useState, useEffect } from 'react';
import GlassCard from '../UI/GlassCard';
import GlassButton from '../UI/GlassButton';
import VideoPlayer from '../Player/VideoPlayer';
import tmdbService from '../../services/tmdb';
import youtubeService from '../../services/youtube';
import './HomePage.css';

const HomePage = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      // Load trending content, popular movies, and TV shows in parallel
      const [trending, movies, tvShows] = await Promise.all([
        tmdbService.getTrending('day'),
        tmdbService.getPopularMovies(1),
        tmdbService.getPopularTVShows(1)
      ]);

      setTrendingContent(trending.results?.slice(0, 10) || []);
      setPopularMovies(movies.results?.slice(0, 8) || []);
      setPopularTVShows(tvShows.results?.slice(0, 8) || []);
      
      // Set the first trending item as featured
      if (trending.results && trending.results.length > 0) {
        setSelectedContent(trending.results[0]);
        await loadTrailer(trending.results[0]);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrailer = async (content) => {
    try {
      const title = content.title || content.name;
      const year = content.release_date || content.first_air_date;
      const trailer = await youtubeService.findTrailer(title, year?.split('-')[0]);
      setSelectedTrailer(trailer);
    } catch (error) {
      console.error('Error loading trailer:', error);
      setSelectedTrailer(null);
    }
  };

  const handleContentSelect = async (content) => {
    setSelectedContent(content);
    await loadTrailer(content);
  };

  const handlePlayTrailer = () => {
    if (selectedTrailer) {
      setShowPlayer(true);
    }
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  if (loading) {
    return (
      <div className="homepage-loading">
        <div className="loading-spinner"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <h2>WatchNow</h2>
          </div>
          <div className="nav-links">
            <a href="#movies">Movies</a>
            <a href="#tv">TV Shows</a>
            <a href="#trending">Trending</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {selectedContent && (
        <section className="hero-section">
          <div 
            className="hero-background"
            style={{
              backgroundImage: selectedContent.backdrop_path 
                ? `url(${tmdbService.getBackdropUrl(selectedContent.backdrop_path)})`
                : 'none'
            }}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <GlassCard className="hero-info" size="large">
              <div className="hero-text">
                <h1>{selectedContent.title || selectedContent.name}</h1>
                <p className="hero-description">
                  {selectedContent.overview}
                </p>
                <div className="hero-meta">
                  <span className="rating">
                    ⭐ {selectedContent.vote_average?.toFixed(1)}
                  </span>
                  <span className="year">
                    {(selectedContent.release_date || selectedContent.first_air_date)?.split('-')[0]}
                  </span>
                  <span className="type">
                    {selectedContent.title ? 'Movie' : 'TV Show'}
                  </span>
                </div>
                <div className="hero-actions">
                  <GlassButton 
                    variant="primary" 
                    size="large"
                    onClick={handlePlayTrailer}
                    disabled={!selectedTrailer}
                  >
                    ▶ Play Trailer
                  </GlassButton>
                  <GlassButton variant="secondary" size="large">
                    + Add to List
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <main className="main-content">
        {/* Trending Section */}
        <section className="content-section" id="trending">
          <h2>Trending Now</h2>
          <div className="content-grid">
            {trendingContent.map((item) => (
              <ContentCard
                key={item.id}
                content={item}
                onClick={() => handleContentSelect(item)}
                isSelected={selectedContent?.id === item.id}
              />
            ))}
          </div>
        </section>

        {/* Popular Movies Section */}
        <section className="content-section" id="movies">
          <h2>Popular Movies</h2>
          <div className="content-grid">
            {popularMovies.map((movie) => (
              <ContentCard
                key={movie.id}
                content={movie}
                onClick={() => handleContentSelect(movie)}
                isSelected={selectedContent?.id === movie.id}
              />
            ))}
          </div>
        </section>

        {/* Popular TV Shows Section */}
        <section className="content-section" id="tv">
          <h2>Popular TV Shows</h2>
          <div className="content-grid">
            {popularTVShows.map((show) => (
              <ContentCard
                key={show.id}
                content={show}
                onClick={() => handleContentSelect(show)}
                isSelected={selectedContent?.id === show.id}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Video Player Modal */}
      {showPlayer && selectedTrailer && (
        <VideoPlayer
          videoId={selectedTrailer.id.videoId}
          title={selectedTrailer.snippet.title}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

// Content Card Component
const ContentCard = ({ content, onClick, isSelected }) => {
  return (
    <GlassCard 
      className={`content-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      hover={true}
    >
      <div className="card-image">
        {content.poster_path ? (
          <img
            src={tmdbService.getImageUrl(content.poster_path)}
            alt={content.title || content.name}
            loading="lazy"
          />
        ) : (
          <div className="no-image">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3>{content.title || content.name}</h3>
        <div className="card-meta">
          <span className="rating">⭐ {content.vote_average?.toFixed(1)}</span>
          <span className="year">
            {(content.release_date || content.first_air_date)?.split('-')[0]}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default HomePage;