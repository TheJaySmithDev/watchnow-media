// Minimal TMDb client that prefers localStorage keys before env variables.
// Exports helper functions for the app to use and utilities to set/clear the local key.

const BASE = 'https://api.themoviedb.org/3'

// storage key names to maximize compatibility with Vite/CRA examples
const STORAGE_KEYS = ['VITE_TMDB_API_KEY', 'REACT_APP_TMDB_API_KEY', 'tmdb_api_key']

function readLocalKey() {
  if (typeof window === 'undefined') return null
  for (const k of STORAGE_KEYS) {
    try {
      const v = window.localStorage.getItem(k)
      if (v) return v
    } catch (e) {
      // ignore (private mode or access denied)
    }
  }
  return null
}

function readEnvKey() {
  // support both Vite and CRA patterns
  try {
    // Vite (import.meta.env)
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TMDB_API_KEY) {
      return import.meta.env.VITE_TMDB_API_KEY
    }
  } catch (e) {}

  try {
    // CRA (process.env)
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_TMDB_API_KEY) {
      return process.env.REACT_APP_TMDB_API_KEY
    }
  } catch (e) {}

  return null
}

export function getApiKey() {
  return readLocalKey() || readEnvKey() || null
}

export function hasApiKey() {
  return !!getApiKey()
}

export function setLocalApiKey(key) {
  if (typeof window === 'undefined') return
  STORAGE_KEYS.forEach(k => {
    try { window.localStorage.setItem(k, key) } catch (e) {}
  })
}

export function clearLocalApiKey() {
  if (typeof window === 'undefined') return
  STORAGE_KEYS.forEach(k => {
    try { window.localStorage.removeItem(k) } catch (e) {}
  })
}

async function request(path, params = {}) {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('TMDb API key not set. Use the Set TMDb API key page or set environment variables.')
  }

  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_key', apiKey)
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v)
  })

  const res = await fetch(url.toString())
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    const msg = text || `TMDb request failed: ${res.status} ${res.statusText}`
    const err = new Error(msg)
    err.status = res.status
    throw err
  }
  return res.json()
}

export function fetchPopular() {
  return request('/movie/popular', { language: 'en-US', page: 1 })
}

export function searchMovies(query) {
  return request('/search/multi', { language: 'en-US', query, page: 1, include_adult: false })
}

export function fetchMovieDetails(id) {
  return request(`/movie/${id}`, { language: 'en-US' })
}