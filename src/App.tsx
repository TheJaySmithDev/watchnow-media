import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 WatchNow</h1>
        <p>Your go-to destination for movie and TV show recommendations</p>
      </header>
      
      <main className="App-main">
        <section className="featured-section">
          <h2>Featured Movies</h2>
          <div className="media-grid">
            <div className="media-card">
              <div className="media-poster">🎥</div>
              <h3>The Shawshank Redemption</h3>
              <p>Drama • 1994 • ⭐ 9.3/10</p>
            </div>
            <div className="media-card">
              <div className="media-poster">🎭</div>
              <h3>The Godfather</h3>
              <p>Crime • 1972 • ⭐ 9.2/10</p>
            </div>
            <div className="media-card">
              <div className="media-poster">🦇</div>
              <h3>The Dark Knight</h3>
              <p>Action • 2008 • ⭐ 9.0/10</p>
            </div>
          </div>
        </section>

        <section className="featured-section">
          <h2>Popular TV Shows</h2>
          <div className="media-grid">
            <div className="media-card">
              <div className="media-poster">👑</div>
              <h3>Breaking Bad</h3>
              <p>Drama • 2008-2013 • ⭐ 9.5/10</p>
            </div>
            <div className="media-card">
              <div className="media-poster">🐉</div>
              <h3>Game of Thrones</h3>
              <p>Fantasy • 2011-2019 • ⭐ 9.2/10</p>
            </div>
            <div className="media-card">
              <div className="media-poster">🕵️</div>
              <h3>Sherlock</h3>
              <p>Mystery • 2010-2017 • ⭐ 9.1/10</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
