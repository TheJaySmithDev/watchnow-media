import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import tmdbFetch, { imgBase } from '../api/tmdb'
import useGeoCountry from '../hooks/useGeoCountry'

export default function Home(){
  const [movies, setMovies] = useState([])
  const country = useGeoCountry()

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        // popular by region if available
        const data = await tmdbFetch('/movie/popular', {language:'en-US', region: country})
        if (!mounted) return
        setMovies(data.results || [])
      }catch(e){
        console.error(e)
      }
    }
    load()
    return ()=>{mounted=false}
  },[country])

  return (
    <div>
      <h1>Popular Movies</h1>
      <div className="movie-grid">
        {movies.map(m=> (
          <Link to={`/movie/${m.id}`} key={m.id} className="card">
            <img className="movie-poster" alt={m.title} src={imgBase(m.poster_path)} />
            <div style={{paddingTop:8}}>
              <strong>{m.title}</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}