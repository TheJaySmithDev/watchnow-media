import axios from 'axios';
import { demoTrailer } from './demoData';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Check if we're in demo mode (no API key or demo key)
const isDemoMode = !YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'demo_key_for_development';

// Create axios instance for YouTube API
const youtubeApi = axios.create({
  baseURL: YOUTUBE_BASE_URL,
  params: {
    key: YOUTUBE_API_KEY,
  },
});

export const youtubeService = {
  // Search for videos based on movie/TV show title
  searchVideos: async (query, maxResults = 5) => {
    if (isDemoMode) {
      return {
        items: [demoTrailer, demoTrailer, demoTrailer]
      };
    }

    try {
      const response = await youtubeApi.get('/search', {
        params: {
          part: 'snippet',
          q: `${query} trailer official`,
          type: 'video',
          maxResults,
          order: 'relevance'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching YouTube videos:', error);
      // Fallback to demo data
      return {
        items: [demoTrailer]
      };
    }
  },

  // Get video details by ID
  getVideoDetails: async (videoId) => {
    if (isDemoMode) {
      return {
        items: [demoTrailer]
      };
    }

    try {
      const response = await youtubeApi.get('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: videoId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching video details:', error);
      // Fallback to demo data
      return {
        items: [demoTrailer]
      };
    }
  },

  // Get video thumbnail URL
  getThumbnailUrl: (videoId, quality = 'maxresdefault') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  },

  // Get YouTube embed URL
  getEmbedUrl: (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
  },

  // Get YouTube watch URL
  getWatchUrl: (videoId) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  },

  // Extract video ID from YouTube URL
  extractVideoId: (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  },

  // Find trailer for specific movie/TV show
  findTrailer: async (title, year = null, type = 'movie') => {
    if (isDemoMode) {
      return demoTrailer;
    }

    try {
      const searchQuery = year ? `${title} ${year} trailer` : `${title} trailer`;
      const results = await youtubeService.searchVideos(searchQuery, 3);
      
      // Filter results to find the most relevant trailer
      const videos = results.items?.filter(item => {
        const title_lower = item.snippet.title.toLowerCase();
        return title_lower.includes('trailer') || title_lower.includes('official');
      });

      return videos && videos.length > 0 ? videos[0] : demoTrailer;
    } catch (error) {
      console.error('Error finding trailer:', error);
      return demoTrailer;
    }
  }
};

export default youtubeService;