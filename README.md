# WatchNow - Demo React TMDb App

This repository contains a small React app (Vite) that demonstrates fetching movie data from The Movie Database (TMDb) and displaying a custom "liquid glass" style player for trailers.

Important: do not commit your TMDb API key. Use environment variables.

Local setup
1. Copy `.env.example` to `.env.local` and set your TMDb API key:

   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here

2. Install and run locally

   npm install
   npm run dev

Build for production

   npm run build
   npm run preview

Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Set an environment variable in Netlify UI: `REACT_APP_TMDB_API_KEY` -> your TMDb API key

Security and notes
- Reverse geocoding uses Nominatim (OpenStreetMap) for demos only. Replace with a paid geolocation provider for production.
- Respect TMDb rate limits and terms of use.
