import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header liquid-glass">
        <Link to="/" className="brand">WatchNow</Link>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </main>

      <footer className="app-footer liquid-glass">
        <div>Made with Liquid Glass UI • Uses TMDb</div>
      </footer>
    </div>
  )
}