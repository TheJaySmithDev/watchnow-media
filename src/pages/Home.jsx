import React, { useEffect, useState } from 'react'
import { searchMovies, fetchPopular } from '../services/tmdb'
import MovieCard from '../components/MovieCard'

export default function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchPopular()
      .then(data => setMovies(data.results || []))
      .catch(e => setError('Failed to load popular movies'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    try {
      const data = await searchMovies(query)
      setMovies(data.results || [])
    } catch {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Discover Movies & TV</h1>

      <form className="search-form" onSubmit={handleSearch} role="search" aria-label="Search movies">
        <input
          aria-label="Search"
          placeholder="Search movies or TV shows..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <section className="grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} item={movie} />
        ))}
      </section>
    </div>
  )
}
