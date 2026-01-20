# Deployment Guide - TradeSensei on Vercel

## Quick Start Deployment (5 minutes)

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
```powershell
npm install -g vercel
```

2. **Login to Vercel**
```powershell
vercel login
```

3. **Deploy from project directory**
```powershell
cd c:\Users\lukas\Desktop\Projects\TradeSensei
vercel
```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **tradesensei** (or your choice)
   - Directory? **./** (current directory)
   - Override settings? **N**

5. **Add environment variable:**
```powershell
vercel env add GEMINI_API_KEY
```
   - Enter your Gemini API key
   - Select: **Production**

6. **Deploy to production:**
```powershell
vercel --prod
```

7. **Done!** Your app is live at the URL shown

---

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Create GitHub repository**
```powershell
cd c:\Users\lukas\Desktop\Projects\TradeSensei
git init
git add .
git commit -m "Initial commit: TradeSensei app"
```

2. **Push to GitHub**
   - Create a new repository on GitHub
   - Copy the repository URL
```powershell
git remote add origin https://github.com/YOUR_USERNAME/tradesensei.git
git branch -M main
git push -u origin main
```

3. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Click "Import" next to your GitHub repository
   - Framework: **Next.js** (auto-detected)

4. **Configure Environment Variables**
   - Click "Environment Variables"
   - Add variable:
     - Name: `GEMINI_API_KEY`
     - Value: Your Gemini API key
     - Environment: Select all (Production, Preview, Development)
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for build
   - Visit your live app!

---

## Get Your Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Select or create a Google Cloud project
4. Copy the API key
5. Add it to Vercel as shown above

---

## Verify Deployment

After deployment, test your app:

1. **Open your Vercel URL** (e.g., `https://tradesensei.vercel.app`)
2. **Test image upload:**
   - Click camera button
   - Upload a trading chart screenshot
   - Verify analysis appears
3. **Check history:**
   - Click "History" tab
   - Verify analysis is saved

---

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `tradesensei.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

---

## Update Deployment

### If using Vercel CLI:
```powershell
vercel --prod
```

### If using GitHub:
```powershell
git add .
git commit -m "Update message"
git push
```
(Auto-deploys to Vercel)

---

## Troubleshooting

### Build Fails
- Check environment variables are set in Vercel
- Verify `GEMINI_API_KEY` is added
- Check build logs in Vercel dashboard

### API Errors
- Verify Gemini API key is valid
- Check API key has correct permissions
- Test key at: https://makersuite.google.com

### 404 Errors
- Ensure all files are committed to git
- Check `next.config.js` exists
- Verify `app/` directory structure

---

## Monitoring

- **View logs:** Vercel Dashboard → Your Project → Logs
- **Analytics:** Vercel Dashboard → Your Project → Analytics
- **Usage:** Check Vercel and Gemini API dashboards

---

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | 100GB bandwidth, unlimited functions | $0 |
| Gemini API | 60 requests/min, 1500/day | $0 |
| **Total** | | **$0/month** |

---

## Support

- Vercel Docs: https://vercel.com/docs
- Gemini API Docs: https://ai.google.dev/docs
- Next.js Docs: https://nextjs.org/docs

---

**You're all set!** 🚀 Your trading app is now live and free to use.
