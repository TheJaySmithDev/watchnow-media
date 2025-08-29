const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'
const imgBase = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : ''

async function tmdbFetch(path, params = {}){
  if (!API_KEY) throw new Error('REACT_APP_TMDB_API_KEY is not set')
  const url = new URL(BASE + path)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k,v))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('TMDb request failed')
  return res.json()
}

export { tmdbFetch, imgBase }
export default tmdbFetch