import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails, searchMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard'

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchMovieDetails(id)
      .then(data => {
        setMovie(data)
        // quick fallback: use title to find similar if API doesn't provide /similar alias
        return searchMovies(data.title || data.name || '')
      })
      .then(sim => setSimilar(sim.results ? sim.results.slice(0, 8) : []))
      .catch(() => setError('Failed to load movie'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading movie...</p>
  if (error) return <p className="error">{error}</p>
  if (!movie) return <p>Movie not found</p>

  return (
    <div className="movie-detail">
      <div className="detail-header">
        {movie.poster_path && (
          <img
            alt={`${movie.title || movie.name} poster`}
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            className="detail-poster"
          />
        )}
        <div className="detail-meta">
          <h2>{movie.title || movie.name}</h2>
          <p className="muted">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <p><strong>Release:</strong> {movie.release_date || movie.first_air_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
        </div>
      </div>

      <h3>Similar / Recommendations</h3>
      <section className="grid">
        {similar.map(m => <MovieCard key={m.id} item={m} />)}
      </section>
    </div>
  )
}
