# State of the City Address Website

A modern, elegant website for Mayor Marina Mayette Javellana Yao's State of the City Address featuring glassmorphism design, smooth animations, and professional civic aesthetics.

## Features

- **Glassmorphism Design**: Frosted-glass cards with soft shadows and modern overlays
- **Smooth Animations**: Professional ease-out animations with no bouncy or springy effects
- **Parallax Scrolling**: Subtle parallax effect on hero background
- **Animated Statistics**: Count-up animations for project numbers and budget data
- **Responsive Layout**: Optimized for all devices including social media dimensions (820x360, 851x315)
- **Local Video Player**: HTML5 video player for SOCA recording
- **Interactive Slide Viewer**: Professional slideshow for 120 presentation slides with auto-play, grid view, and keyboard controls
- **1:1 Gallery Grid**: Square-format masonry-style photo gallery
- **Staggered Reveals**: Fade-in and slide-up effects on scroll

## Color Palette

- **Navy Blue**: #1a2b4a (Primary)
- **Vibrant Orange**: #ff6b35 (Accent)
- **Gold**: #d4af37 (Highlights)
- **Off-White**: #f8f9fa (Background)

## Setup Instructions

### 1. Add Your Media Files

Place the following files in the `assets/` folder:

**Videos:**
- `assets/videos/soca-2026.mp4` - Your State of the City Address video

**Presentation Slides:**
- `assets/slides/slide-001.jpg` through `slide-120.jpg` - PowerPoint slides shown during speech
- See **SLIDES-SETUP-GUIDE.md** for detailed instructions on exporting and renaming slides

**Images:**
- `assets/bago-city-logo.png` - City logo (transparent background recommended)
- `assets/mayor-portrait.jpg` - High-resolution portrait of the mayor
- `assets/project-1.jpg` through `project-6.jpg` - Project photos
- `assets/gallery-1.jpg` through `gallery-9.jpg` - Square gallery images (1:1 ratio)

### 2. Video File Considerations

⚠️ **Important**: Video files can be large (50MB+). You have two options:

**Option A: Use Git LFS (Recommended for large files)**
```bash
# Install Git LFS
git lfs install

# Track video files
git lfs track "assets/videos/*.mp4"

# Add and commit
git add .gitattributes
git add assets/videos/soca-2026.mp4
git commit -m "Add video with Git LFS"
```

**Option B: Keep video file size under 100MB**
- Compress your video using HandBrake or similar tool
- Target: H.264 codec, 720p resolution, ~5-10 Mbps bitrate
- This will work directly with GitHub and Vercel

### 3. Deploy to Vercel via GitHub

**Step 1: Initialize Git Repository**
```bash
git init
git add .
git commit -m "Initial commit: SOCA website"
```

**Step 2: Create GitHub Repository**
1. Go to https://github.com/new
2. Create a new repository (e.g., "soca-website-2026")
3. Don't initialize with README (you already have one)

**Step 3: Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/soca-website-2026.git
git branch -M main
git push -u origin main
```

**Step 4: Deploy to Vercel**
1. Go to https://vercel.com
2. Sign up/login with your GitHub account
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it as a static site
6. Click "Deploy"
7. Your site will be live at: `https://your-project.vercel.app`

### 4. Content Customization

- Edit the speech text in the Speech Article Section
- Update project details, budgets, and descriptions
- Modify contact information in the footer

## File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with glassmorphism
├── script.js           # Animations and interactions
├── vercel.json         # Vercel deployment config
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── SLIDES-SETUP-GUIDE.md  # Detailed guide for adding presentation slides
├── DEPLOYMENT-GUIDE.md    # Step-by-step deployment instructions
└── assets/             # Media folder
    ├── videos/
    │   └── soca-2026.mp4
    ├── slides/
    │   ├── slide-001.jpg
    │   ├── slide-002.jpg
    │   └── ... (120 slides total)
    ├── bago-city-logo.png
    ├── mayor-portrait.jpg
    ├── project-*.jpg
    └── gallery-*.jpg
```

## Video Compression Tips

If your video is too large (>100MB), compress it:

**Using FFmpeg (Command Line):**
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 23 -preset medium assets/videos/soca-2026.mp4
```

**Using Online Tools:**
- CloudConvert.com
- FreeConvert.com
- Compress video to 720p or 1080p at ~5 Mbps

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled for animations
- Supports backdrop-filter for glassmorphism effect
- HTML5 video support required

## Performance Notes

- Images should be optimized (WebP format recommended)
- Video should be compressed but maintain quality
- Animations use requestAnimationFrame for smooth 60fps
- Intersection Observer API ensures animations only trigger when visible

## Troubleshooting

**Video not playing:**
- Check video file path is correct
- Ensure video format is MP4 (H.264 + AAC)
- Check browser console for errors

**Deployment issues:**
- Ensure all file paths use forward slashes (/)
- Check that all assets are committed to Git
- Verify video file size is under 100MB or use Git LFS

---

**Developed with modern web standards for civic excellence.**

