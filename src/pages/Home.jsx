import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPopularMovies, searchMovies, posterUrl } from '../api/tmdb'

export default function Home(){
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPopularMovies().then((res) => {
      setMovies(res.results || [])
      setLoading(false)
    })
  }, [])

  async function onSearch(e) {
    e.preventDefault()
    if (!query) return
    setLoading(true)
    const res = await searchMovies(query)
    setMovies(res.results || [])
    setLoading(false)
  }

  return (
    <div>
      <div className="liquid-glass" style={{marginBottom: '24px'}}>
        <form onSubmit={onSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              color: 'var(--text)',
              fontSize: '14px'
            }}
          />
        </form>
      </div>

      {loading && (
        <div style={{textAlign: 'center', padding: '40px'}}>
          Loading movies...
        </div>
      )}

      <div className="home-grid">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img 
              src={posterUrl(movie.poster_path)} 
              alt={movie.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750/333/fff?text=No+Image'
              }}
            />
            <div className="meta">
              <div style={{fontWeight: '600', fontSize: '14px'}}>{movie.title}</div>
              <div style={{fontSize: '12px', opacity: '0.8'}}>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {movies.length === 0 && !loading && (
        <div style={{textAlign: 'center', padding: '40px', opacity: '0.6'}}>
          No movies found
        </div>
      )}
    </div>
  )
}