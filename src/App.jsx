import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'

export default function App() {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">WatchNow</Link>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">© {new Date().getFullYear()} WatchNow — Movie & TV recommendations</div>
      </footer>
    </div>
  )
}
