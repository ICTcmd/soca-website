// ==========================================
// HERO CAROUSEL FUNCTIONALITY
// ==========================================

// Carousel configuration
const carouselImages = [
    'assets/mayor-portrait.jpg',  // Image 1 - Main portrait at podium
    'assets/carousel-2.jpg',      // Image 2 - Your second image
    'assets/carousel-3.jpg',      // Image 3 - Your third image
    'assets/carousel-4.jpg',      // Image 4 - Your fourth image
    'assets/carousel-5.jpg'       // Image 5 - Your fifth image
];

let currentCarouselIndex = 0;
let carouselAutoPlayInterval = null;
let isCarouselAutoPlaying = false;

// Initialize carousel
function initCarousel() {
    generateCarouselIndicators();
    updateCarousel();
    
    // Event listeners
    document.getElementById('carouselPrev')?.addEventListener('click', previousCarouselImage);
    document.getElementById('carouselNext')?.addEventListener('click', nextCarouselImage);
    
    // Auto-play carousel
    startCarouselAutoPlay();
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarouselAutoPlay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoPlay);
    }
}

// Generate carousel indicators
function generateCarouselIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    carouselImages.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
        }
        
        indicator.addEventListener('click', () => {
            goToCarouselImage(index);
        });
        
        indicatorsContainer.appendChild(indicator);
    });
}

// Update carousel display
function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = track.querySelectorAll('.carousel-slide');
    const mainImage = document.getElementById('mainSlideImage');
    
    if (!track || !mainImage) return;
    
    // Calculate indices
    const prevIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
    const nextIndex = (currentCarouselIndex + 1) % carouselImages.length;
    
    // Update slide classes
    slides.forEach(slide => {
        slide.classList.remove('prev', 'active', 'next');
    });
    
    slides[0].classList.add('prev');
    slides[1].classList.add('active');
    slides[2].classList.add('next');
    
    // Update images
    slides[0].querySelector('.slide-image').src = carouselImages[prevIndex];
    slides[1].querySelector('.slide-image').src = carouselImages[currentCarouselIndex];
    slides[2].querySelector('.slide-image').src = carouselImages[nextIndex];
    
    // Update indicators
    updateCarouselIndicators();
}

// Update carousel indicators
function updateCarouselIndicators() {
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Navigate to specific carousel image
function goToCarouselImage(index) {
    if (index < 0 || index >= carouselImages.length) return;
    currentCarouselIndex = index;
    updateCarousel();
}

// Previous carousel image
function previousCarouselImage() {
    currentCarouselIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
}

// Next carousel image
function nextCarouselImage() {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
    updateCarousel();
}

// Start carousel auto-play
function startCarouselAutoPlay() {
    if (isCarouselAutoPlaying) return;
    isCarouselAutoPlaying = true;
    
    carouselAutoPlayInterval = setInterval(() => {
        nextCarouselImage();
    }, 5000); // Change image every 5 seconds
}

// Stop carousel auto-play
function stopCarouselAutoPlay() {
    if (carouselAutoPlayInterval) {
        clearInterval(carouselAutoPlayInterval);
        carouselAutoPlayInterval = null;
    }
    isCarouselAutoPlaying = false;
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (event) => {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    if (thumbnailGrid && thumbnailGrid.style.display !== 'none') return; // Don't interfere with slide viewer
    
    if (event.key === 'ArrowLeft') {
        previousCarouselImage();
    } else if (event.key === 'ArrowRight') {
        nextCarouselImage();
    }
});

// ==========================================
// SLIDE VIEWER FUNCTIONALITY
// ==========================================

const TOTAL_SLIDES = 127;
let currentSlideIndex = 1;
let autoPlayInterval = null;
let isAutoPlaying = false;
let slideSpeed = 4000; // Default 4 seconds

// Initialize slide viewer
function initSlideViewer() {
    updateSlideDisplay();
    updateSlideCounter();
    updateProgressBar();
    
    // Event listeners
    document.getElementById('prevSlide').addEventListener('click', previousSlide);
    document.getElementById('nextSlide').addEventListener('click', nextSlide);
    document.getElementById('autoPlayToggle').addEventListener('click', toggleAutoPlay);
    document.getElementById('slideSpeed').addEventListener('change', changeSpeed);
    document.getElementById('thumbnailToggle').addEventListener('click', toggleThumbnailGrid);
    document.getElementById('closeThumbnails').addEventListener('click', closeThumbnailGrid);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Auto-play when slides come into view
    setupAutoPlayOnScroll();
}

// Setup auto-play when slides section becomes visible
function setupAutoPlayOnScroll() {
    const slidesContainer = document.querySelector('.slides-container');
    
    const autoPlayObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAutoPlaying) {
                // Start auto-play when slides come into view
                toggleAutoPlay();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of slides are visible
    });
    
    if (slidesContainer) {
        autoPlayObserver.observe(slidesContainer);
    }
}

// Format slide number with leading zeros (e.g., 1 -> 001)
function formatSlideNumber(num) {
    return String(num).padStart(3, '0');
}

// Update slide display
function updateSlideDisplay() {
    const slideImage = document.getElementById('slideImage');
    const slideNumber = formatSlideNumber(currentSlideIndex);
    
    // Add fade-out effect
    slideImage.classList.add('loading');
    
    // Small delay for smooth transition
    setTimeout(() => {
        slideImage.src = `assets/slides/slide-${slideNumber}.jpg`;
        slideImage.alt = `Slide ${currentSlideIndex}`;
        
        slideImage.onload = () => {
            slideImage.classList.remove('loading');
            slideImage.classList.add('fade-in');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                slideImage.classList.remove('fade-in');
            }, 600);
        };
        
        slideImage.onerror = () => {
            console.warn(`Slide ${slideNumber} not found`);
            slideImage.classList.remove('loading');
        };
    }, 150);
}

// Update slide counter
function updateSlideCounter() {
    document.getElementById('currentSlide').textContent = currentSlideIndex;
    document.getElementById('totalSlides').textContent = TOTAL_SLIDES;
}

// Update progress bar
function updateProgressBar() {
    const progress = (currentSlideIndex / TOTAL_SLIDES) * 100;
    document.getElementById('slideProgress').style.width = `${progress}%`;
}

// Navigate to specific slide
function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > TOTAL_SLIDES) return;
    
    currentSlideIndex = slideNumber;
    updateSlideDisplay();
    updateSlideCounter();
    updateProgressBar();
    updateActiveThumbnail();
}

// Previous slide
function previousSlide() {
    if (currentSlideIndex > 1) {
        goToSlide(currentSlideIndex - 1);
    }
}

// Next slide
function nextSlide() {
    if (currentSlideIndex < TOTAL_SLIDES) {
        goToSlide(currentSlideIndex + 1);
    } else if (isAutoPlaying) {
        // Loop back to first slide when auto-playing
        goToSlide(1);
    }
}

// Toggle auto play
function toggleAutoPlay() {
    isAutoPlaying = !isAutoPlaying;
    
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const autoPlayText = document.getElementById('autoPlayText');
    const autoPlayBtn = document.getElementById('autoPlayToggle');
    
    if (isAutoPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        autoPlayText.textContent = 'Pause';
        autoPlayBtn.classList.add('active');
        startAutoPlay();
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        autoPlayText.textContent = 'Auto Play';
        autoPlayBtn.classList.remove('active');
        stopAutoPlay();
    }
}

// Start auto play
function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(() => {
        if (currentSlideIndex < TOTAL_SLIDES) {
            nextSlide();
        } else {
            goToSlide(1); // Loop back to start
        }
    }, slideSpeed);
}

// Stop auto play
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Change speed
function changeSpeed(event) {
    slideSpeed = parseInt(event.target.value);
    if (isAutoPlaying) {
        startAutoPlay(); // Restart with new speed
    }
}

// Keyboard navigation
function handleKeyboard(event) {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    if (thumbnailGrid.style.display !== 'none') return; // Disable when grid is open
    
    switch(event.key) {
        case 'ArrowLeft':
            previousSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case ' ':
            event.preventDefault();
            toggleAutoPlay();
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(1);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(TOTAL_SLIDES);
            break;
    }
}

// Toggle thumbnail grid
function toggleThumbnailGrid() {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    
    if (thumbnailGrid.style.display === 'none') {
        thumbnailGrid.style.display = 'block';
        generateThumbnails();
        
        // Pause auto-play when grid opens
        if (isAutoPlaying) {
            toggleAutoPlay();
        }
    } else {
        thumbnailGrid.style.display = 'none';
    }
}

// Close thumbnail grid
function closeThumbnailGrid() {
    document.getElementById('thumbnailGrid').style.display = 'none';
}

// Generate thumbnails (lazy loaded)
function generateThumbnails() {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    
    // Only generate once
    if (thumbnailContainer.children.length > 0) {
        updateActiveThumbnail();
        return;
    }
    
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        if (i === currentSlideIndex) {
            thumbnailItem.classList.add('active');
        }
        
        const img = document.createElement('img');
        img.src = `assets/slides/slide-${formatSlideNumber(i)}.jpg`;
        img.alt = `Slide ${i}`;
        img.loading = 'lazy';
        
        const number = document.createElement('div');
        number.className = 'thumbnail-number';
        number.textContent = i;
        
        thumbnailItem.appendChild(img);
        thumbnailItem.appendChild(number);
        
        thumbnailItem.addEventListener('click', () => {
            goToSlide(i);
            closeThumbnailGrid();
        });
        
        thumbnailContainer.appendChild(thumbnailItem);
    }
}

// Update active thumbnail
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach((thumb, index) => {
        if (index + 1 === currentSlideIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSlideViewer();
});

// ==========================================
// EXISTING CODE BELOW
// ==========================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-card')) {
                const numberElement = entry.target.querySelector('.stat-number');
                animateCounter(numberElement);
            }
            
            // Stagger animation for gallery items
            if (entry.target.classList.contains('gallery-item')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
            
            // Stagger animation for project cards
            if (entry.target.classList.contains('project-card')) {
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.stat-card').forEach(card => observer.observe(card));
document.querySelectorAll('.project-card').forEach(card => observer.observe(card));
document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));
document.querySelectorAll('.section-title').forEach(title => observer.observe(title));

// Counter animation function with smooth easing
function animateCounter(element) {
    if (element.classList.contains('counted')) return;
    element.classList.add('counted');
    
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    const isDecimal = target % 1 !== 0;
    const hasPercent = element.textContent.includes('%');
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            if (isDecimal) {
                element.textContent = current.toFixed(1) + (hasPercent ? '%' : '');
            } else {
                element.textContent = Math.floor(current).toLocaleString() + (hasPercent ? '%' : '');
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1) + (hasPercent ? '%' : '');
            } else {
                element.textContent = Math.floor(target).toLocaleString() + (hasPercent ? '%' : '');
            }
        }
    };
    
    // Use easing function for smoother animation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    let startTime = null;
    
    const animateWithEasing = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
            const easedProgress = easeOutCubic(progress);
            const currentValue = target * easedProgress;
            
            if (isDecimal) {
                element.textContent = currentValue.toFixed(1) + (hasPercent ? '%' : '');
            } else {
                element.textContent = Math.floor(currentValue).toLocaleString() + (hasPercent ? '%' : '');
            }
            requestAnimationFrame(animateWithEasing);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1) + (hasPercent ? '%' : '');
            } else {
                element.textContent = Math.floor(target).toLocaleString() + (hasPercent ? '%' : '');
            }
        }
    };
    
    requestAnimationFrame(animateWithEasing);
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.background = 'rgba(26, 43, 74, 0.98)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.background = 'rgba(26, 43, 74, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Gallery lightbox effect (optional enhancement)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add lightbox functionality here if needed
    });
});

// Add smooth reveal animation to speech text paragraphs
const speechObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.speech-body p, .speech-body h3, .pull-quote').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
    speechObserver.observe(element);
});

// Initialize on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setupVideoAutoPlay();
});

// Auto-play video when scrolled into view
function setupVideoAutoPlay() {
    const video = document.getElementById('socaVideo');
    
    if (!video) return;
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Play video when it comes into view
                video.play().catch(err => {
                    // Auto-play prevented by browser
                });
            } else {
                // Pause video when it leaves view
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of video is visible
    });
    
    videoObserver.observe(video);
}
