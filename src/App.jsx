import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'
import './index.css'

export default function App() {
  return (
    <div className="app-root">
      <header className="topbar">
        <Link to="/" className="brand">WatchNow</Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </main>

      <footer className="footer">© WatchNow Demo</footer>
    </div>
  )
}