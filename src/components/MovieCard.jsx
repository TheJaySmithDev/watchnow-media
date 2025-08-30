import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({ item }) {
  const title = item.title || item.name
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
    : null

  return (
    <article className="movie-card">
      <Link to={`/movie/${item.id}`} className="card-link" aria-label={`Open ${title} details`}>
        <div className="poster-wrap">
          {poster ? (
            <img src={poster} alt={`${title} poster`} loading="lazy" />
          ) : (
            <div className="poster-placeholder">No image</div>
          )}
        </div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-sub">⭐ {item.vote_average?.toFixed(1) || '—'}</p>
        </div>
      </Link>
    </article>
  )
}
