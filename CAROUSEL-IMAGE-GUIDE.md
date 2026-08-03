# Hero Carousel Image Guide

## How to Add Your Images

The hero carousel is now set up with 5 image slots. Follow these steps to add your SOCA event photos:

### Step 1: Prepare Your Images

1. Choose 5 impactful photos from the SOCA 2026 event:
   - **Image 1**: Main portrait of Mayor at podium (currently using `mayor-portrait.jpg`)
   - **Image 2**: Audience/crowd shot
   - **Image 3**: Event activities or programs
   - **Image 4**: Mayor with officials or community
   - **Image 5**: Another impactful moment

2. Recommended image specifications:
   - **Format**: JPG or PNG
   - **Size**: High resolution (at least 1920x1080px)
   - **Aspect Ratio**: Portrait or landscape both work
   - **File size**: Keep under 2MB each for fast loading

### Step 2: Name Your Images

Save your images with these names:
- `carousel-1.jpg` - Main portrait (or keep using `mayor-portrait.jpg`)
- `carousel-2.jpg` - Second image
- `carousel-3.jpg` - Third image
- `carousel-4.jpg` - Fourth image
- `carousel-5.jpg` - Fifth image

### Step 3: Upload to Assets Folder

Place all images in the `assets` folder:
```
SOCA WEBSITE/
└── assets/
    ├── mayor-portrait.jpg
    ├── carousel-2.jpg
    ├── carousel-3.jpg
    ├── carousel-4.jpg
    └── carousel-5.jpg
```

### Step 4: Update the Code

Open `script.js` and find the `carouselImages` array (around line 5). Update it to:

```javascript
const carouselImages = [
    'assets/mayor-portrait.jpg',   // Image 1 - Main portrait
    'assets/carousel-2.jpg',        // Image 2 - Your second image
    'assets/carousel-3.jpg',        // Image 3 - Your third image
    'assets/carousel-4.jpg',        // Image 4 - Your fourth image
    'assets/carousel-5.jpg'         // Image 5 - Your fifth image
];
```

### Step 5: Push to GitHub

After adding your images and updating script.js:

```bash
git add assets/*.jpg script.js
git commit -m "Add hero carousel images"
git push origin main
```

## Carousel Features

✅ **Auto-play**: Rotates every 5 seconds automatically
✅ **Side previews**: Shows previous/next images on the sides
✅ **Navigation arrows**: Click to manually navigate
✅ **Indicators**: Dots at bottom show which image is active
✅ **Keyboard navigation**: Use arrow keys to navigate
✅ **Pause on hover**: Stops auto-play when you hover over carousel
✅ **Responsive**: Side previews hide on mobile, arrows remain
✅ **Smooth transitions**: Elegant fade effects between images
✅ **Theatrical gold frame**: All carousel images get the premium gold frame effect

## Customization Options

### Change Auto-Play Speed

In `script.js`, find this line (around line 106):
```javascript
}, 5000); // Change image every 5 seconds
```

Change `5000` to your preferred milliseconds:
- 3000 = 3 seconds (faster)
- 7000 = 7 seconds (slower)
- 10000 = 10 seconds (much slower)

### Add More Images

To add more than 5 images:

1. Add more image paths to the `carouselImages` array in `script.js`
2. Upload the images to the `assets` folder
3. The carousel will automatically adjust to show all images

### Change Side Preview Size

In `styles.css`, find `.carousel-preview` (around line 252) and adjust:
```css
flex: 0 0 280px;  /* Change width */
height: 400px;     /* Change height */
```

## Troubleshooting

**Images not showing?**
- Check that image files are in the `assets` folder
- Verify image paths in `script.js` match your file names exactly
- Check browser console for any error messages

**Carousel not working?**
- Make sure script.js is loaded (check browser console)
- Verify JavaScript console for errors
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

**Need help?**
The carousel is fully functional with placeholder images. Just replace the image paths and you're done!
