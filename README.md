# GeminiTrades - AI Trading Analysis App

A mobile-first web application that uses Google Gemini AI to analyze trading charts with Order Block (OB) and Fair Value Gap (FVG) detection.

## Features

- 📸 **Photo Capture** - Take or upload trading chart images
- 🤖 **AI Analysis** - Powered by Google Gemini 2.0 Flash
- 📊 **OB & FVG Detection** - Automated Order Block and Fair Value Gap identification
- 💡 **Trading Ideas** - Get entry, stop-loss, and take-profit suggestions
- 📜 **History** - Save and review past analyses
- 📱 **Mobile-First** - Responsive design for all devices
- ⚡ **Real-time** - Fast serverless API on Vercel

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **AI**: Google Gemini 2.0 Flash API
- **Storage**: Browser LocalStorage
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key (free at https://makersuite.google.com/app/apikey)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd GeminiTrades
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example env file
copy .env.example .env.local

# Edit .env.local and add your Gemini API key
GEMINI_API_KEY=your_actual_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add your environment variable:
```bash
vercel env add GEMINI_API_KEY
```
Enter your Gemini API key when prompted, and select "Production" environment.

5. Redeploy to apply environment variables:
```bash
vercel --prod
```

### Method 2: Vercel Dashboard (Easy)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New..." → "Project"

4. Import your GitHub repository

5. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

6. Add Environment Variables:
   - Click "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key
   - Select all environments (Production, Preview, Development)

7. Click "Deploy"

8. Your app will be live at: `https://your-project-name.vercel.app`

### Method 3: GitHub Integration (Automated)

1. Connect GitHub repo to Vercel

2. Every push to `main` branch auto-deploys to production

3. Pull requests create preview deployments

## Environment Variables

Required environment variables for deployment:

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

Get your API key at: https://makersuite.google.com/app/apikey

## Usage

1. **Take/Upload Photo**: Click the camera button or upload a chart image
2. **Wait for Analysis**: AI processes the chart (usually 3-10 seconds)
3. **Review Results**: See trend, Order Blocks, Fair Value Gaps, and trading ideas
4. **Save to History**: Analysis is automatically saved locally
5. **Review Past Analyses**: Access history tab to review previous analyses

## Project Structure

```
GeminiTrades/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # Gemini API integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main app page
├── components/
│   ├── AnalysisResult.tsx        # Display analysis results
│   ├── HistoryList.tsx           # Show analysis history
│   └── ImageCapture.tsx          # Camera/upload component
├── lib/
│   └── storage.ts                # LocalStorage utilities
├── types/
│   └── analysis.ts               # TypeScript types
├── public/
│   └── manifest.json             # PWA manifest
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Example env file
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS config
└── package.json                  # Dependencies
```

## API Endpoints

### POST /api/analyze

Analyzes a trading chart image.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `image` (File)

**Response:**
```json
{
  "id": "1234567890",
  "timestamp": "2026-01-10T12:00:00.000Z",
  "imagePreview": "data:image/jpeg;base64,...",
  "summary": "Analysis summary...",
  "trend": "BULLISH",
  "orderBlocks": [...],
  "fairValueGaps": [...],
  "keyLevels": {...},
  "tradingIdea": {...},
  "confidence": "HIGH",
  "risks": [...]
}
```

## Cost Estimation

- **Gemini API**: Free tier (60 requests/min, 1500 requests/day)
- **Vercel Hosting**: Free tier (100GB bandwidth, unlimited requests)
- **Total Monthly Cost**: $0 for MVP usage

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

- Never commit `.env.local` to Git (already in .gitignore)
- API key is only used server-side (API routes)
- Images are processed in-memory, not stored on server
- LocalStorage is client-side only

## Troubleshooting

### API Key Issues
- Ensure `GEMINI_API_KEY` is set in Vercel environment variables
- Get your key from: https://makersuite.google.com/app/apikey

### Image Upload Issues
- Check file size (max 4MB recommended)
- Ensure HTTPS in production (required for camera)

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next` and rebuild

## Future Enhancements

- [ ] Multiple timeframe analysis
- [ ] Trading journal integration
- [ ] Social sharing features
- [ ] Advanced pattern recognition
- [ ] Real-time price alerts
- [ ] Backend database (Supabase/Firebase)
- [ ] User authentication
- [ ] Mobile native apps (React Native)

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Google Gemini AI
