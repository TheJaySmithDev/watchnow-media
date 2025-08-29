import React from 'react'
import './LiquidGlassPlayer.css'

export default function LiquidGlassPlayer({videoId}){
  if (!videoId) return null
  const src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&showinfo=0&controls=0`
  return (
    <div className="lq-player card">
      <div className="lq-frame">
        <iframe title="trailer" src={src} frameBorder="0" allowFullScreen allow="autoplay; encrypted-media"></iframe>
      </div>
      <div className="lq-controls"> 
        <button className="play">Play</button>
      </div>
    </div>
  )
}