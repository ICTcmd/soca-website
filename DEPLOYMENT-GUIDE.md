# Quick Deployment Guide

## 🎯 Step-by-Step Instructions

### STEP 1: Add Your Video File
1. Copy your downloaded Facebook video
2. Rename it to: `soca-2026.mp4`
3. Place it in: `assets/videos/soca-2026.mp4`

**Important:** If your video is larger than 100MB, you need to compress it first!

#### How to Compress Video (Choose One):

**Option A - Online Tool (Easiest):**
1. Go to: https://www.freeconvert.com/video-compressor
2. Upload your video
3. Choose "Medium compression" or "720p"
4. Download compressed video
5. Rename to `soca-2026.mp4` and place in `assets/videos/`

**Option B - VLC Media Player (Free):**
1. Open VLC → Media → Convert/Save
2. Add your video file
3. Click "Convert/Save"
4. Profile: "Video - H.264 + MP3 (MP4)"
5. Save as `soca-2026.mp4` in `assets/videos/`

### STEP 2: Add Your Images
Place these files in the `assets/` folder:
- ✅ `bago-city-logo.png` (city logo)
- ✅ `mayor-portrait.jpg` (mayor's photo)
- ✅ `project-1.jpg` to `project-6.jpg` (6 project images)
- ✅ `gallery-1.jpg` to `gallery-9.jpg` (9 gallery photos)

### STEP 3: Initialize Git
Open PowerShell in your project folder and run:

```powershell
git init
git add .
git commit -m "Initial commit: SOCA website 2026"
```

### STEP 4: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `soca-website-2026` (or any name you want)
3. Make it **Public** (required for free Vercel hosting)
4. **DON'T** check "Add README" (you already have one)
5. Click "Create repository"

### STEP 5: Push to GitHub
Copy your repository URL from GitHub, then run:

```powershell
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/soca-website-2026.git
git branch -M main
git push -u origin main
```

If prompted, enter your GitHub credentials.

### STEP 6: Deploy to Vercel
1. Go to: https://vercel.com/signup
2. Click "Continue with GitHub"
3. After login, click "Add New..." → "Project"
4. Find your `soca-website-2026` repository
5. Click "Import"
6. **Leave all settings as default**
7. Click "Deploy"
8. Wait 1-2 minutes for deployment
9. Click "Visit" to see your live site! 🎉

### STEP 7: Get Your Website URL
After deployment, you'll get a URL like:
- `https://soca-website-2026.vercel.app`

You can also add a custom domain in Vercel settings!

---

## 🚨 Common Issues & Solutions

### Problem: "File too large" error
**Solution:** Your video is over 100MB. Compress it using the methods in Step 1.

### Problem: Video doesn't play
**Solution:** 
- Check video format is MP4
- Try opening `index.html` locally in Chrome to test
- Make sure video path is: `assets/videos/soca-2026.mp4`

### Problem: Images not showing
**Solution:**
- Check image file names match exactly (case-sensitive)
- All images should be in `assets/` folder
- Run `git add .` and `git commit -m "Add images"` then `git push`

### Problem: Git push rejected
**Solution:**
```powershell
git pull origin main --rebase
git push origin main
```

---

## 📱 After Deployment

### To Update Your Site:
1. Make changes to your files
2. Run in PowerShell:
```powershell
git add .
git commit -m "Update content"
git push
```
3. Vercel automatically redeploys (takes 1-2 minutes)

### To Change Video:
1. Replace `assets/videos/soca-2026.mp4` with new video
2. Commit and push:
```powershell
git add assets/videos/soca-2026.mp4
git commit -m "Update video"
git push
```

---

## ✅ Checklist Before Deploying

- [ ] Video file added to `assets/videos/soca-2026.mp4`
- [ ] Video file is under 100MB (or compressed)
- [ ] All image files added to `assets/` folder
- [ ] Git repository initialized
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Deployment successful
- [ ] Website opens in browser

---

**Need help? Check the main README.md for more details!**
