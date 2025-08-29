# watchnow-media
A movie and tv show recommendation site

## TMDb API Key Setup

This application requires a TMDb (The Movie Database) API key to fetch movie and TV show data. You can set up your API key in two ways:

### Option 1: Environment Variables (Recommended for development)

1. Create a `.env` file in the project root
2. Add your TMDb API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

### Option 2: Set API Key via Browser (Useful for deployed sites)

If you can't set environment variables (e.g., on a static hosting service), you can set your API key directly in the browser:

1. Navigate to `/set-tmdb-key.html` in your browser
2. Enter your TMDb API key in the form
3. Click "Save API Key"

The key will be stored in your browser's local storage and automatically used by the application.

**Getting a TMDb API Key:**
1. Create an account at [TMDb](https://www.themoviedb.org/)
2. Go to your [API settings page](https://www.themoviedb.org/settings/api)
3. Request a free API key
4. Copy the API key and use it in either method above

**Privacy Note:** When using the browser method, your API key is stored only in your local browser storage and is never sent to our servers.
