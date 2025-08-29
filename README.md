# WatchNow Media

A modern movie discovery platform built with React and Vite, featuring a stunning liquid glass UI design. Search for movies, view details, watch trailers, and find where to stream them.

## Features

- 🎬 Browse popular movies
- 🔍 Search for specific movies
- 📱 Responsive liquid glass UI design
- 🎥 Watch movie trailers
- 📍 Location-based streaming provider recommendations
- 🌙 Dark theme with elegant glassmorphism effects

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TMDb API** - Movie data and imagery
- **CSS3** - Custom liquid glass styling with backdrop-filter effects

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- TMDb API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository
```bash
git clone https://github.com/TheJaySmithDev/watchnow-media.git
cd watchnow-media
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Add your TMDb API key to .env
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## Deployment

This project is configured for easy deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Set the environment variable `VITE_TMDB_API_KEY` in Netlify's dashboard
3. Deploy! The `netlify.toml` configuration handles the build settings.

## Project Structure

```
src/
├── api/           # TMDb API integration
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── App.jsx        # Main app component
├── main.jsx       # Entry point
└── index.css      # Liquid glass styling
```

## API Usage

The app uses The Movie Database (TMDb) API for movie data. Features include:

- Popular movie listings
- Movie search functionality
- Detailed movie information
- Trailer videos
- Streaming provider availability by region

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for movie data
- [Nominatim](https://nominatim.org/) for geolocation services
- Liquid Glass UI design inspiration from modern glassmorphism trends
