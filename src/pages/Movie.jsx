import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieDetails, getMovieVideos, getMovieProviders, posterUrl } from '../api/tmdb'
import useGeoCountry from '../hooks/useGeoCountry'

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [videos, setVideos] = useState([])
  const [providers, setProviders] = useState({})
  const [loading, setLoading] = useState(true)
  const { countryCode } = useGeoCountry()

  useEffect(() => {
    if (!id) return
    
    setLoading(true)
    Promise.all([
      getMovieDetails(id),
      getMovieVideos(id),
      getMovieProviders(id)
    ]).then(([movieData, videosData, providersData]) => {
      setMovie(movieData)
      setVideos(videosData.results || [])
      setProviders(providersData.results || {})
      setLoading(false)
    }).catch(err => {
      console.error('Error fetching movie data:', err)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div style={{textAlign: 'center', padding: '40px'}}>
        Loading movie details...
      </div>
    )
  }

  if (!movie) {
    return (
      <div style={{textAlign: 'center', padding: '40px'}}>
        <div>Movie not found</div>
        <Link to="/" style={{color: 'var(--text)', marginTop: '16px', display: 'inline-block'}}>
          ← Back to Home
        </Link>
      </div>
    )
  }

  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const countryProviders = providers[countryCode] || providers['US']

  return (
    <div>
      <Link to="/" style={{color: 'var(--text)', marginBottom: '24px', display: 'inline-block'}}>
        ← Back to Home
      </Link>
      
      <div className="liquid-glass" style={{marginBottom: '24px'}}>
        <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
          <img 
            src={posterUrl(movie.poster_path, 'w300')} 
            alt={movie.title}
            style={{borderRadius: '8px', maxWidth: '200px'}}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=No+Image'
            }}
          />
          <div style={{flex: '1', minWidth: '300px'}}>
            <h1 style={{margin: '0 0 8px 0', fontSize: '2rem'}}>{movie.title}</h1>
            <div style={{opacity: '0.8', marginBottom: '16px'}}>
              {movie.release_date && `${new Date(movie.release_date).getFullYear()} • `}
              {movie.runtime && `${movie.runtime} min • `}
              {movie.vote_average && `⭐ ${movie.vote_average.toFixed(1)}/10`}
            </div>
            
            {movie.genres && movie.genres.length > 0 && (
              <div style={{marginBottom: '16px'}}>
                {movie.genres.map(genre => (
                  <span key={genre.id} style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    margin: '2px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p style={{lineHeight: '1.6', opacity: '0.9'}}>
              {movie.overview || 'No overview available.'}
            </p>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="player-container">
          <div className="player-surface">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={movie.title}
              style={{borderRadius: '8px'}}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {countryProviders && (countryProviders.flatrate || countryProviders.rent || countryProviders.buy) && (
        <div className="liquid-glass" style={{marginTop: '24px'}}>
          <h3 style={{margin: '0 0 16px 0'}}>Where to Watch</h3>
          
          {countryProviders.flatrate && (
            <div style={{marginBottom: '12px'}}>
              <div style={{fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Stream</div>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                {countryProviders.flatrate.map(provider => (
                  <img 
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    style={{borderRadius: '4px', width: '40px', height: '40px'}}
                  />
                ))}
              </div>
            </div>
          )}

          {countryProviders.rent && (
            <div style={{marginBottom: '12px'}}>
              <div style={{fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Rent</div>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                {countryProviders.rent.map(provider => (
                  <img 
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    style={{borderRadius: '4px', width: '40px', height: '40px'}}
                  />
                ))}
              </div>
            </div>
          )}

          {countryProviders.buy && (
            <div>
              <div style={{fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Buy</div>
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                {countryProviders.buy.map(provider => (
                  <img 
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    style={{borderRadius: '4px', width: '40px', height: '40px'}}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}