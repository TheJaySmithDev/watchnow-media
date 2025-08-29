import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WatchNow Media</h1>
        <p>A movie and tv show recommendation site</p>
      </header>
      <Routes>
        <Route path="/" element={<div>Welcome to WatchNow Media!</div>} />
      </Routes>
    </div>
  )
}

export default App