const BASE = 'https://api.themoviedb.org/3'
const KEY = import.meta?.env?.VITE_TMDB_API_KEY || process.env.REACT_APP_TMDB_API_KEY

if (!KEY) {
  // Warn in dev; app will still run but fetches will fail
  // eslint-disable-next-line no-console
  console.warn('TMDB API key not found. Set VITE_TMDB_API_KEY or REACT_APP_TMDB_API_KEY.')
}

async function request(path, params = {}) {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_key', KEY)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v)
  })
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Network response was not ok')
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
