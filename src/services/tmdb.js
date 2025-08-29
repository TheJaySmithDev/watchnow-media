import axios from 'axios';
import { demoTrendingContent, demoPopularMovies, demoPopularTVShows } from './demoData';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Check if we're in demo mode (no API key or demo key)
const isDemoMode = !TMDB_API_KEY || TMDB_API_KEY === 'demo_key_for_development';

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const tmdbService = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    if (isDemoMode) {
      return {
        results: demoPopularMovies,
        page: 1,
        total_pages: 1,
        total_results: demoPopularMovies.length
      };
    }

    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      // Fallback to demo data
      return {
        results: demoPopularMovies,
        page: 1,
        total_pages: 1,
        total_results: demoPopularMovies.length
      };
    }
  },

  // Get popular TV shows
  getPopularTVShows: async (page = 1) => {
    if (isDemoMode) {
      return {
        results: demoPopularTVShows,
        page: 1,
        total_pages: 1,
        total_results: demoPopularTVShows.length
      };
    }

    try {
      const response = await tmdbApi.get('/tv/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      // Fallback to demo data
      return {
        results: demoPopularTVShows,
        page: 1,
        total_pages: 1,
        total_results: demoPopularTVShows.length
      };
    }
  },

  // Get trending content (all - movies and TV shows)
  getTrending: async (timeWindow = 'day') => {
    if (isDemoMode) {
      return {
        results: demoTrendingContent,
        page: 1,
        total_pages: 1,
        total_results: demoTrendingContent.length
      };
    }

    try {
      const response = await tmdbApi.get(`/trending/all/${timeWindow}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trending content:', error);
      // Fallback to demo data
      return {
        results: demoTrendingContent,
        page: 1,
        total_pages: 1,
        total_results: demoTrendingContent.length
      };
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    if (isDemoMode) {
      const movie = demoPopularMovies.find(m => m.id === movieId) || demoTrendingContent.find(m => m.id === movieId);
      return movie || demoPopularMovies[0];
    }

    try {
      const response = await tmdbApi.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'videos,credits,similar'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Get TV show details
  getTVShowDetails: async (tvId) => {
    if (isDemoMode) {
      const show = demoPopularTVShows.find(s => s.id === tvId) || demoTrendingContent.find(s => s.id === tvId);
      return show || demoPopularTVShows[0];
    }

    try {
      const response = await tmdbApi.get(`/tv/${tvId}`, {
        params: {
          append_to_response: 'videos,credits,similar'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      throw error;
    }
  },

  // Search for movies and TV shows
  search: async (query, page = 1) => {
    if (isDemoMode) {
      const allContent = [...demoTrendingContent, ...demoPopularMovies, ...demoPopularTVShows];
      const filtered = allContent.filter(item => 
        (item.title && item.title.toLowerCase().includes(query.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(query.toLowerCase()))
      );
      return {
        results: filtered,
        page: 1,
        total_pages: 1,
        total_results: filtered.length
      };
    }

    try {
      const response = await tmdbApi.get('/search/multi', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (path, size = 'w500') => {
    if (!path || isDemoMode) {
      // Return a placeholder image for demo mode
      return `https://via.placeholder.com/500x750/1a1a2e/ffffff?text=Movie+Poster`;
    }
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },

  // Get backdrop URL
  getBackdropUrl: (path, size = 'w1280') => {
    if (!path || isDemoMode) {
      // Return a placeholder image for demo mode
      return `https://via.placeholder.com/1280x720/16213e/ffffff?text=Movie+Backdrop`;
    }
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }
};

export default tmdbService;