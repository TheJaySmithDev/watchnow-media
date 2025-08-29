const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'

function url(path, params = {}) {
  const u = new URL(BASE + path)
  u.searchParams.set('api_key', API_KEY)
  Object.entries(params || {}).forEach(([k,v]) => {
    if (v !== undefined && v !== null) u.searchParams.set(k, v)
  })
  return u.toString()
}

export async function searchMovies(query, page = 1) {
  if (!query) return null
  const res = await fetch(url('/search/movie', {query, page, include_adult: false}))
  return res.json()
}

export async function getPopularMovies(page = 1) {
  const res = await fetch(url('/movie/popular', {page}))
  return res.json()
}

export async function getMovieDetails(id) {
  const res = await fetch(url(`/movie/${id}`))
  return res.json()
}

export async function getMovieVideos(id) {
  const res = await fetch(url(`/movie/${id}/videos`))
  return res.json()
}

// TMDb returns watch/providers by country code inside result.results
export async function getMovieProviders(id) {
  const res = await fetch(url(`/movie/${id}/watch/providers`))
  return res.json()
}

export function posterUrl(path, size = 'w500'){
  if (!path) return ''
  return `https://image.tmdb.org/t/p/${size}${path}`
}