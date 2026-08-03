# 📊 Presentation Slides Setup Guide

## Overview
Your website now includes a professional slide viewer for the 120 PowerPoint slides shown during the Mayor's SOCA speech!

## ✨ Features Added

### 1. **Slide Viewer Component**
- ✅ Auto-scrolling slideshow (2-5 seconds per slide)
- ✅ Manual navigation (Previous/Next arrows)
- ✅ Slide counter (e.g., "15 / 120")
- ✅ Progress bar showing position
- ✅ Keyboard shortcuts (Arrow keys, Space, Home, End)

### 2. **Auto-Play Controls**
- ✅ Play/Pause button
- ✅ Speed control (Fast: 2s, Normal: 3s, Moderate: 4s, Slow: 5s)
- ✅ Automatic looping

### 3. **Grid View**
- ✅ Thumbnail gallery of all 120 slides
- ✅ Click any thumbnail to jump to that slide
- ✅ Lazy loading for fast performance
- ✅ Active slide highlighting

### 4. **Responsive Design**
- ✅ Works on desktop, tablet, and mobile
- ✅ Touch-friendly controls
- ✅ Optimized for all screen sizes

---

## 📁 How to Add Your Slides

### Step 1: Export Slides from PowerPoint

**Method A: Save as Images (Recommended)**
1. Open your PowerPoint presentation
2. Go to **File** → **Export** → **Change File Type**
3. Select **PNG** or **JPEG** format
4. Click **Save As**
5. Choose **All Slides**
6. PowerPoint will create numbered images (Slide1.PNG, Slide2.PNG, etc.)

**Method B: Export as PDF then Convert**
1. Save PowerPoint as PDF
2. Use an online tool like https://www.ilovepdf.com/pdf_to_jpg
3. Convert PDF to JPG (all pages)
4. Download the images

### Step 2: Rename Your Files

Your exported slides need to be renamed with this exact format:
- `slide-001.jpg`
- `slide-002.jpg`
- `slide-003.jpg`
- ...
- `slide-120.jpg`

**Quick Renaming (Windows PowerShell):**
```powershell
# Navigate to your slides folder
cd "path\to\your\exported\slides"

# Rename all PNG files to JPG format with proper numbering
$i = 1
Get-ChildItem *.png | ForEach-Object {
    $newName = "slide-{0:D3}.jpg" -f $i
    Rename-Item $_.FullName -NewName $newName
    $i++
}
```

**Manual Renaming:**
- Use a bulk rename tool like:
  - **Bulk Rename Utility** (Windows): https://www.bulkrenameutility.co.uk/
  - **Advanced Renamer** (Windows): https://www.advancedrenamer.com/

### Step 3: Place Files in Project

Copy all renamed slides to:
```
c:\Users\OJTBEEG\Desktop\SOCA WEBSITE\assets\slides\
```

Final structure:
```
assets/
└── slides/
    ├── slide-001.jpg
    ├── slide-002.jpg
    ├── slide-003.jpg
    ...
    └── slide-120.jpg
```

---

## 🎮 User Controls

### Mouse/Touch Controls:
- **◀️ ▶️ Arrow Buttons**: Navigate previous/next
- **Auto Play Button**: Start/stop automatic slideshow
- **Speed Dropdown**: Adjust auto-play speed
- **Grid View Button**: Open thumbnail gallery
- **Thumbnail Click**: Jump to specific slide

### Keyboard Shortcuts:
- **←** / **→**: Previous/Next slide
- **Space**: Play/Pause auto-play
- **Home**: Jump to first slide
- **End**: Jump to last slide

---

## ⚙️ Customization Options

### Change Number of Slides
If you have more or fewer than 120 slides, edit `script.js`:

```javascript
const TOTAL_SLIDES = 120; // Change this number
```

### Change Default Speed
Edit `index.html`, find this line:
```html
<option value="4000" selected>Moderate (4s)</option>
```
Move `selected` to a different option.

### Change Slide Format
If your slides are PNG instead of JPG, edit `script.js`:

```javascript
img.src = `assets/slides/slide-${slideNumber}.png`; // Change .jpg to .png
```

---

## 🚀 Testing Locally

1. Add at least slide-001.jpg to test
2. Open `index.html` in Chrome
3. Scroll to the "Presentation Slides" section
4. Test the controls:
   - Click Next/Previous arrows
   - Click Auto Play
   - Click Grid View
   - Use keyboard arrows

---

## 📱 Performance Notes

### File Size Optimization:
- Each slide should be under 500KB for fast loading
- Recommended resolution: 1920x1080 or 1280x720
- Format: JPEG (better compression than PNG for photos)

### Compression Tools:
- **TinyPNG**: https://tinypng.com/ (batch compression)
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **ImageOptim** (Mac): https://imageoptim.com/

### Lazy Loading:
- The grid view loads thumbnails only when opened
- This keeps initial page load fast even with 120 images

---

## 🎨 Design Details

The slide viewer matches your website's design:
- ✅ Glassmorphism aesthetic
- ✅ Navy blue and vibrant orange colors
- ✅ Smooth animations
- ✅ Professional government-appropriate styling

---

## 🔧 Troubleshooting

### Slides not showing:
1. Check file names are exactly: `slide-001.jpg`, `slide-002.jpg`, etc.
2. Verify files are in `assets/slides/` folder
3. Open browser console (F12) to see any errors
4. Try opening one image directly in browser to test path

### Auto-play not working:
1. Check if browser is blocking auto-play
2. Try clicking the page first, then start auto-play
3. Check console for JavaScript errors

### Slow loading:
1. Compress your images (aim for <300KB per slide)
2. Ensure images are JPG format, not PNG
3. Use recommended resolutions (720p or 1080p max)

---

## 📊 Expected File Sizes

With proper optimization:
- **120 slides @ 300KB each** = ~36MB total
- **120 slides @ 500KB each** = ~60MB total

GitHub allows files up to 100MB, so you're good!
Vercel has no issues with this either.

---

**Your slide viewer is ready! Just add your slides and you're done! 🎉**
