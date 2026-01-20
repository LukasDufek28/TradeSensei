# GeminiTrades - AI Trading Analysis SaaS

A complete SaaS platform that uses Google Gemini AI to analyze trading charts with advanced ICT concepts including Order Blocks, Fair Value Gaps, and Smart Money analysis. Built with authentication, payments, and a freemium business model.

## ✨ Features

### Core Features
- 📸 **Photo Capture** - Take or upload trading chart images
- 🤖 **AI Analysis** - Powered by Google Gemini 2.0 Flash
- 📊 **ICT Analysis** - Automated Order Block and Fair Value Gap identification
- 💡 **Trading Ideas** - Get entry, stop-loss, and take-profit suggestions
- 📜 **History** - Save and review past analyses
- 🎯 **Custom Prompts** - Tailor analysis to your trading style

### SaaS Features (NEW!)
- 🔐 **Google Authentication** - Secure sign-in with Google OAuth
- 💳 **Stripe Payments** - Subscription-based pricing
- 👤 **User Dashboard** - Manage subscription and view stats
- 🎨 **Landing Page** - Professional marketing homepage
- 📊 **Usage Tracking** - Free tier limits and premium access
- ⚖️ **Legal Pages** - Terms, Privacy, and Refund policies

### Business Model
- **Free Plan:** 5 analyses per month
- **Pro Monthly:** $29/month - Unlimited analyses
- **Pro Yearly:** $290/year - Save 17%

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Prisma ORM + SQLite (upgradeable to PostgreSQL)
- **Payments**: Stripe Checkout + Webhooks
- **AI**: Google Gemini 2.0 Flash API
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key (get at https://makersuite.google.com/app/apikey)
- Google OAuth credentials (from Google Cloud Console)
- Stripe account (for payments)
- Sufficient disk space for dependencies

### Quick Start

**⚠️ IMPORTANT:** You currently have insufficient disk space. Free up space first, then:

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd GeminiTrades
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   copy .env.local.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:3000

### Detailed Setup

For complete setup instructions including:
- Google OAuth configuration
- Stripe setup and webhook configuration
- Database setup
- Production deployment

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed instructions.

### Quick Commands

See **[QUICK_START.md](./QUICK_START.md)** for all necessary commands.

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[QUICK_START.md](./QUICK_START.md)** - Quick command reference
- **[MONETIZATION_README.md](./MONETIZATION_README.md)** - Feature overview
- **[LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)** - Pre-launch checklist
- **[TRANSFORMATION_COMPLETE.md](./TRANSFORMATION_COMPLETE.md)** - Summary of changes

## 🎯 Project Structure

```
app/
├── page.tsx                     # Landing page
├── layout.tsx                   # Root layout with providers
├── analyze/page.tsx             # Chart analysis page
├── pricing/page.tsx             # Pricing page
├── dashboard/page.tsx           # User dashboard
├── auth/signin/page.tsx         # Sign in page
├── legal/                       # Legal pages
│   ├── terms/page.tsx
│   ├── privacy/page.tsx
│   └── refund/page.tsx
└── api/
    ├── analyze/route.ts         # AI analysis endpoint
    ├── checkout/route.ts        # Stripe checkout
    ├── webhook/route.ts         # Stripe webhook
    ├── billing-portal/route.ts  # Billing management
    └── auth/[...nextauth]/      # NextAuth endpoints

components/
├── Providers.tsx                # Session provider
├── UserNav.tsx                  # User navigation
├── ImageCapture.tsx             # Chart upload
├── AnalysisResult.tsx           # Display analysis
└── ...

lib/
├── auth.ts                      # NextAuth config
└── storage.ts                   # LocalStorage utils

prisma/
└── schema.prisma                # Database schema
```

## 🔑 Environment Variables

Required environment variables (see [.env.local.example](./.env.local.example)):

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=
STRIPE_PRICE_ID_YEARLY=

# Database
DATABASE_URL=
```

## 💳 Stripe Test Cards

For testing payments in development:

- **Success:** 4242 4242 4242 4242
- **Requires authentication:** 4000 0025 0000 3155
- **Decline:** 4000 0000 0000 9995

Use any future expiry date, any CVC, and any ZIP code.

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add all environment variables
4. Deploy!

**Important for production:**
- Use production Stripe keys (not test keys)
- Set up Stripe webhook endpoint with your production URL
- Update Google OAuth redirect URIs to include production domain
- Use a production database (PostgreSQL recommended)

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed deployment instructions.

## 🎨 Customization

### Branding
- Update colors in [tailwind.config.js](./tailwind.config.js)
- Replace logo and favicon in [/public](/public)
- Update company name in legal pages

### Pricing
- Modify plans in [/app/pricing/page.tsx](/app/pricing/page.tsx)
- Create corresponding products in Stripe
- Update Price IDs in environment variables

### Features
- Customize analysis prompts in [/lib/storage.ts](/lib/storage.ts)
- Add custom output formats
- Extend analysis types

## 📊 Business Metrics

Track these key metrics:
- **MRR** (Monthly Recurring Revenue)
- **Conversion Rate** (Free → Paid)
- **Churn Rate**
- **CAC** (Customer Acquisition Cost)
- **LTV** (Lifetime Value)

## 🐛 Troubleshooting

### Disk Space Issues
```bash
npm cache clean --force
# Clear space, then: npm install
```

### Database Issues
```bash
npx prisma db push --force-reset
- Verify OAuth redirect URIs
- Check NEXTAUTH_SECRET is set
- Ensure NEXTAUTH_URL matches your domain

### Payment Issues
- Test with Stripe test cards
- Check webhook endpoint is accessible
- Verify webhook signing secret

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more troubleshooting tips.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support
- Email: support@geminitrades.com (update with your email)

## 🎉 What's Next?
3. Optimize conversion funnel
4. Scale marketing efforts
5. Build a community

*Transform your trading analysis with AI-powered insights!*

5. Redeploy to apply environment variables:
```

1. Push your code to GitHub:
```bash
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
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
