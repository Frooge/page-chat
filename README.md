# Hal - Page Chat Assistant

AI-powered browser extension for chatting with web pages using Google's Gemini AI with optional web search.

## Setup

1. **Install dependencies**
```bash
yarn install
```

2. **Configure environment variables**

Create `backend/.env`:
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
TAVILY_API_KEY=your_key_here
```

Create `.env`:
```bash
VITE_API_URL=http://localhost:3000
```

## Development

**Start backend:**
```bash
yarn dev:backend
```

**Start extension (Chrome):**
```bash
yarn dev:chrome
```

Load extension in Chrome:
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" → select `dist_chrome` folder

**For Firefox:**
```bash
yarn dev:firefox
```

## Tech Stack

- React 19 + TypeScript + Tailwind CSS
- Vite + Chrome Extension Plugin
- Hono (backend) + Google Gemini AI
- Tavily (web search)

## Contributing
Feel free to contribute, just open PRs or raise issues.

## Credits

Thanks to [vite-web-extension](https://github.com/JohnBra/vite-web-extension) for the initial template.
