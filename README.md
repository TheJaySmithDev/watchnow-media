# WatchNow Media 🎬

A beautiful, modern movie and TV show recommendation site built with React and featuring Apple's Liquid Glass design language. Experience seamless streaming with our custom video player that integrates with TMDb API for metadata and YouTube for trailers.

![WatchNow Media Preview](preview-screenshot-placeholder.png)

## ✨ Features

- 🎨 **Apple Liquid Glass Design** - Beautiful, modern UI with translucent glass morphism effects
- 🎬 **TMDb Integration** - Real movie and TV show data from The Movie Database API
- 📺 **YouTube Trailers** - Integrated trailer playback with custom player UI
- 🎮 **Custom Video Player** - Replaces default YouTube controls with our glass-themed interface
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **Modern React** - Uses latest React features and best practices

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheJaySmithDev/watchnow-media.git
   cd watchnow-media
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Get your API keys** (Optional - works with demo data)
   - **TMDb API Key**: Get from [themoviedb.org](https://www.themoviedb.org/settings/api)
   - **YouTube Data API Key**: Get from [Google Cloud Console](https://console.developers.google.com/)
   
   Update your `.env` file:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🎬 Demo Mode

The app works perfectly without API keys using demo data! This makes it easy to:
- Test the application locally
- Showcase the UI/UX design
- Develop new features without API dependencies

## 🎨 Design System

Our Liquid Glass design system includes:

- **Glass Effects**: Translucent backgrounds with backdrop blur
- **Smooth Animations**: Fluid transitions and hover effects  
- **Responsive Layout**: Mobile-first approach
- **Modern Typography**: Clean, readable font hierarchy
- **Interactive Elements**: Custom buttons, cards, and controls

## 🏗️ Architecture

```
src/
├── components/
│   ├── HomePage/          # Main landing page
│   ├── Player/            # Custom video player
│   └── UI/               # Reusable UI components
├── services/
│   ├── tmdb.js           # TMDb API integration
│   ├── youtube.js        # YouTube API integration
│   └── demoData.js       # Demo content for development
└── styles/
    └── liquidGlass.css   # Glass morphism design system
```

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: CSS Modules, CSS Variables
- **APIs**: TMDb API, YouTube Data API v3
- **Build Tool**: Vite
- **Package Manager**: npm

## 📱 Device Compatibility

- **Desktop**: Full-featured experience with all controls
- **Tablet**: Touch-optimized interface with adapted layouts
- **Mobile**: Optimized for smaller screens with streamlined navigation
- **Cross-browser**: Works on Chrome, Firefox, Safari, and Edge

## 🎥 Custom Player Features

- **Glass-themed Controls**: Beautiful overlay controls that auto-hide
- **Keyboard Shortcuts**: Space (play/pause), F (fullscreen), M (mute), Esc (close)
- **Volume Control**: Custom volume slider with mute functionality
- **Fullscreen Support**: Native fullscreen API integration
- **Responsive Design**: Adapts to different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDb** for providing the movie and TV data API
- **YouTube** for trailer content and player API
- **Apple** for design inspiration (Liquid Glass aesthetic)
- **React Community** for the amazing ecosystem

## 📧 Contact

Jay Smith - [@TheJaySmithDev](https://github.com/TheJaySmithDev)

Project Link: [https://github.com/TheJaySmithDev/watchnow-media](https://github.com/TheJaySmithDev/watchnow-media)

---

Made with ❤️ and lots of ☕
