# watchnow-media

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status.svg)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

A movie and tv show recommendation site

## Netlify Deployment

This site is configured for automatic deployment on Netlify. To deploy your own copy:

1. **Connect to Netlify:**
   - Fork this repository to your GitHub account
   - Sign up for [Netlify](https://netlify.com) and connect your GitHub account
   - Click "New site from Git" and select your forked repository

2. **Build Settings:**
   This project uses Vite and is pre-configured with `netlify.toml`. Netlify will automatically use these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **For Create React App projects:**
   If you switch this project to use Create React App instead of Vite, update the `netlify.toml` file:
   ```toml
   [build]
     publish = "build"  # Change from "dist" to "build"
   ```

4. **Environment Variables:**
   - Add any required environment variables in the Netlify dashboard under Site Settings > Environment Variables
   - The build automatically sets `NODE_ENV=production` for optimized builds

5. **Custom Domain (Optional):**
   - In your Netlify site dashboard, go to Site Settings > Domain Management
   - Add your custom domain and configure DNS as instructed

The site will automatically rebuild and deploy whenever you push changes to the connected branch.
