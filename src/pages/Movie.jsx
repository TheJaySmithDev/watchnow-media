import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import tmdbFetch, { imgBase } from '../api/tmdb'
import LiquidGlassPlayer from '../components/LiquidGlassPlayer'

export default function Movie(){
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const m = await tmdbFetch(`/movie/${id}`)
        const v = await tmdbFetch(`/movie/${id}/videos`)
        if (!mounted) return
        setMovie(m)
        setVideos(v.results || [])
      }catch(e){ console.error(e) }
    }
    load()
    return ()=>{mounted=false}
  },[id])

  if (!movie) return <div className="card">Loading...</div>

  const youtube = videos.find(v=>v.site==='YouTube' && v.type==='Trailer')

  return (
    <div>
      <Link to="/">← back</Link>
      <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:20,marginTop:12}}>
        <img className="card" style={{width:240}} src={imgBase(movie.poster_path)} alt={movie.title} />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          {youtube ? (
            <div style={{maxWidth:720}}>
              <LiquidGlassPlayer videoId={youtube.key} />
            </div>
          ) : <div className="card">No trailer found</div>}
        </div>
      </div>
    </div>
  )
}