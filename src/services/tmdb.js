/**
 * TMDb API Service
 * Centralizes TMDb API requests with localStorage key support
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY_NAMES = ['VITE_TMDB_API_KEY', 'REACT_APP_TMDB_API_KEY', 'tmdb_api_key'];

/**
 * Get API key from localStorage or environment variables
 * @returns {string|null} The API key if found
 */
function getApiKey() {
  // Check localStorage first (allows runtime key setting)
  for (const keyName of API_KEY_NAMES) {
    const key = localStorage.getItem(keyName);
    if (key) {
      return key;
    }
  }
  
  // Fall back to environment variables (build-time keys)
  if (typeof import !== 'undefined' && import.meta && import.meta.env) {
    // Vite environment
    if (import.meta.env.VITE_TMDB_API_KEY) {
      return import.meta.env.VITE_TMDB_API_KEY;
    }
  }
  
  if (typeof process !== 'undefined' && process.env) {
    // Create React App / Node environment
    if (process.env.REACT_APP_TMDB_API_KEY) {
      return process.env.REACT_APP_TMDB_API_KEY;
    }
  }
  
  return null;
}

/**
 * Check if an API key is available
 * @returns {boolean} True if API key is available
 */
export function hasApiKey() {
  return !!getApiKey();
}

/**
 * Set API key in localStorage
 * @param {string} key - The API key to store
 */
export function setLocalApiKey(key) {
  if (!key || typeof key !== 'string') {
    throw new Error('API key must be a non-empty string');
  }
  
  API_KEY_NAMES.forEach(keyName => {
    localStorage.setItem(keyName, key);
  });
}

/**
 * Clear API key from localStorage
 */
export function clearLocalApiKey() {
  API_KEY_NAMES.forEach(keyName => {
    localStorage.removeItem(keyName);
  });
}

/**
 * Make a request to TMDb API with automatic API key attachment
 * @param {string} endpoint - The API endpoint (without base URL)
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} The API response data
 */
async function request(endpoint, options = {}) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('TMDb API key is required. Please set it via the Set API Key page or environment variables.');
  }
  
  // Add api_key to URL parameters
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', apiKey);
  
  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your TMDb API key.');
    }
    throw new Error(`TMDb API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch popular movies
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Popular movies response
 */
export async function fetchPopular(page = 1) {
  return request(`/movie/popular?page=${page}`);
}

/**
 * Search for movies by query
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Search results response
 */
export async function searchMovies(query, page = 1) {
  if (!query || typeof query !== 'string') {
    throw new Error('Search query is required and must be a string');
  }
  
  const encodedQuery = encodeURIComponent(query);
  return request(`/search/movie?query=${encodedQuery}&page=${page}`);
}

/**
 * Fetch detailed information for a specific movie
 * @param {number|string} id - Movie ID
 * @returns {Promise<Object>} Movie details response
 */
export async function fetchMovieDetails(id) {
  if (!id) {
    throw new Error('Movie ID is required');
  }
  
  return request(`/movie/${id}?append_to_response=credits,videos,similar`);
}

/**
 * Fetch movie configuration (images, etc.)
 * @returns {Promise<Object>} Configuration response
 */
export async function fetchConfiguration() {
  return request('/configuration');
}

/**
 * Fetch popular TV shows
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Popular TV shows response
 */
export async function fetchPopularTV(page = 1) {
  return request(`/tv/popular?page=${page}`);
}

/**
 * Search for TV shows by query
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Search results response
 */
export async function searchTV(query, page = 1) {
  if (!query || typeof query !== 'string') {
    throw new Error('Search query is required and must be a string');
  }
  
  const encodedQuery = encodeURIComponent(query);
  return request(`/search/tv?query=${encodedQuery}&page=${page}`);
}

/**
 * Fetch detailed information for a specific TV show
 * @param {number|string} id - TV show ID
 * @returns {Promise<Object>} TV show details response
 */
export async function fetchTVDetails(id) {
  if (!id) {
    throw new Error('TV show ID is required');
  }
  
  return request(`/tv/${id}?append_to_response=credits,videos,similar`);
}

export default {
  hasApiKey,
  setLocalApiKey,
  clearLocalApiKey,
  fetchPopular,
  searchMovies,
  fetchMovieDetails,
  fetchConfiguration,
  fetchPopularTV,
  searchTV,
  fetchTVDetails,
};