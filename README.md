# watchnow-media
A movie and tv show recommendation site

### Set TMDb API key from the browser (in case you can't set env vars)

If you can't add your TMDb API key as an environment variable (for example when testing a deployed build that doesn't expose environment variables), there's a small convenience page included:

- Visit /set-tmdb-key.html (for example http://localhost:5173/set-tmdb-key.html with Vite or https://your-site.netlify.app/set-tmdb-key.html after deploy).
- Paste your TMDb API key and click "Save key to browser".
- The page stores the key in localStorage under VITE_TMDB_API_KEY, REACT_APP_TMDB_API_KEY and tmdb_api_key so the client-side code can find it.
- To remove the key, open the same page and click "Clear key".

Notes
- This is intended for development, demos, or quick testing. Storing secrets in localStorage is not safe for confidential production usage.
- If you prefer to set the key in your deployment platform (Netlify, Vercel, etc.), add VITE_TMDB_API_KEY (for Vite) or REACT_APP_TMDB_API_KEY (for Create React App) as a build or runtime environment variable instead.
