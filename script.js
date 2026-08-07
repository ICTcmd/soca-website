// ==========================================
// SWIPER HERO CAROUSEL INITIALIZATION
// ==========================================

// Check if mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Simple mobile carousel (no Swiper)
function initSimpleMobileCarousel() {
    console.log('Initializing SIMPLE mobile carousel...');
    
    const slides = document.querySelectorAll('.swiper-slide');
    const wrapper = document.querySelector('.swiper-wrapper');
    const pagination = document.querySelector('.swiper-pagination');
    
    if (!slides.length || !wrapper) {
        console.error('Carousel elements not found!');
        return;
    }
    
    let currentIndex = 0;
    
    // Show first slide
    function showSlide(index) {
        console.log('showSlide called with index:', index, 'Total slides:', slides.length);
        
        // Ensure index is valid
        if (index < 0 || index >= slides.length) {
            console.error('Invalid slide index:', index);
            return;
        }
        
        // First, hide all slides immediately
        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            slide.style.visibility = 'hidden';
            console.log('Hiding slide', i);
        });
        
        // Then show the target slide INSTANTLY (no fade)
        const targetSlide = slides[index];
        if (targetSlide) {
            console.log('Showing slide', index);
            targetSlide.style.cssText = 'display: flex !important; visibility: visible !important; opacity: 1 !important; position: relative !important; left: auto !important; top: auto !important; transform: none !important;';
            
            // Also force the image and frame to be opaque
            const slideImage = targetSlide.querySelector('.slide-image');
            const slideFrame = targetSlide.querySelector('.slide-frame');
            if (slideImage) {
                slideImage.style.opacity = '1';
            }
            if (slideFrame) {
                slideFrame.style.opacity = '1';
            }
        } else {
            console.error('Target slide not found:', index);
        }
        
        // Update pagination
        const bullets = pagination?.querySelectorAll('.swiper-pagination-bullet');
        if (bullets) {
            bullets.forEach((bullet, i) => {
                if (i === index) {
                    bullet.classList.add('swiper-pagination-bullet-active');
                } else {
                    bullet.classList.remove('swiper-pagination-bullet-active');
                }
            });
        }
        
        console.log('Slide', index, 'should now be visible');
    }
    
    // Create pagination if needed
    if (pagination && !pagination.children.length) {
        slides.forEach((_, i) => {
            const bullet = document.createElement('span');
            bullet.className = 'swiper-pagination-bullet';
            bullet.addEventListener('click', () => {
                currentIndex = i;
                showSlide(currentIndex);
            });
            pagination.appendChild(bullet);
        });
    }
    
    // Navigation buttons
    const prevBtn = document.getElementById('carouselPrevExternal');
    const nextBtn = document.getElementById('carouselNextExternal');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });
    }
    
    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);
    
    // Show first slide
    showSlide(0);
    
    console.log('Simple carousel initialized with', slides.length, 'slides');
}

// Wait for Swiper library to load with increased timeout
function initializeCarousel() {
    // Use simple carousel on mobile
    if (isMobile()) {
        console.log('Mobile detected, using simple carousel...');
        initSimpleMobileCarousel();
        return;
    }
    
    // Desktop: Use Swiper
    if (typeof Swiper === 'undefined') {
        console.log('Swiper not loaded yet, retrying in 200ms...');
        setTimeout(initializeCarousel, 200);
        return;
    }
    
    console.log('Desktop detected, Swiper loaded successfully, initializing carousel...');

    // Initialize Hero Swiper Carousel
    const heroSwiper = new Swiper('.heroSwiper', {
        // Default to slide effect (coverflow only on desktop via breakpoints)
        effect: 'slide',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1.2,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // Auto-play
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        // Loop
        loop: true,
        // Speed
        speed: 800,
        // Prevent slides from disappearing
        preventClicks: false,
        preventClicksPropagation: false,
        // Responsive breakpoints
        breakpoints: {
            // Mobile (< 768px) - Use slide effect instead of coverflow
            0: {
                effect: 'slide',
                slidesPerView: 1.2,
                spaceBetween: 10,
                centeredSlides: true,
            },
            // Tablet (>= 768px) - Use coverflow
            768: {
                effect: 'coverflow',
                slidesPerView: 'auto',
                spaceBetween: 30,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                },
            },
        },
        on: {
            init: function() {
                console.log('Swiper initialized with', this.slides.length, 'slides');
                console.log('Active index:', this.activeIndex);
            },
            slideChange: function() {
                console.log('Slide changed to index:', this.activeIndex);
            },
            click: function (swiper, event) {
                // Allow clicking on side slides to navigate
                const clickedSlide = event.target.closest('.swiper-slide');
                if (clickedSlide && !clickedSlide.classList.contains('swiper-slide-active')) {
                    const clickedIndex = parseInt(clickedSlide.getAttribute('data-swiper-slide-index'));
                    swiper.slideToLoop(clickedIndex);
                }
            }
        }
    });
    
    console.log('Carousel initialized successfully!');
    
    // External navigation buttons
    const prevBtn = document.getElementById('carouselPrevExternal');
    const nextBtn = document.getElementById('carouselNextExternal');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            heroSwiper.slidePrev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            heroSwiper.slideNext();
        });
    }
}

// Initialize when DOM is ready or immediately if already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, starting carousel initialization...');
        setTimeout(initializeCarousel, 300);
    });
} else {
    console.log('DOM already loaded, starting carousel initialization...');
    setTimeout(initializeCarousel, 300);
}

// ==========================================
// GLIGHTBOX GALLERY INITIALIZATION
// ==========================================

function initializeGallery() {
    if (typeof GLightbox === 'undefined') {
        console.log('GLightbox not loaded yet, retrying in 200ms...');
        setTimeout(initializeGallery, 200);
        return;
    }
    
    console.log('GLightbox loaded successfully, initializing gallery...');
    
    // Initialize GLightbox for gallery
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        skin: 'clean',
        closeButton: true,
        closeOnOutsideClick: true,
        keyboardNavigation: true,
        draggable: true,
        dragAutoSnap: true,
        preload: true
    });
    
    console.log('Gallery initialized successfully!');
}

// Initialize gallery
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeGallery, 300);
    });
} else {
    setTimeout(initializeGallery, 300);
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
    console.log('=== INITIALIZING SLIDE VIEWER ===');
    
    try {
        updateSlideDisplay();
        updateSlideCounter();
        updateProgressBar();
        
        // Event listeners with error checking
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        console.log('prevSlide button:', prevBtn);
        console.log('nextSlide button:', nextBtn);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                console.log('PREV CLICKED - current index:', currentSlideIndex);
                previousSlide();
            });
        } else {
            console.error('prevSlide button not found!');
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                console.log('NEXT CLICKED - current index:', currentSlideIndex);
                nextSlide();
            });
        } else {
            console.error('nextSlide button not found!');
        }
        
        const autoPlayBtn = document.getElementById('autoPlayToggle');
        if (autoPlayBtn) {
            autoPlayBtn.addEventListener('click', toggleAutoPlay);
        }
        
        const speedSelect = document.getElementById('slideSpeed');
        if (speedSelect) {
            speedSelect.addEventListener('change', changeSpeed);
        }
        
        const thumbnailBtn = document.getElementById('thumbnailToggle');
        if (thumbnailBtn) {
            thumbnailBtn.addEventListener('click', toggleThumbnailGrid);
        }
        
        const closeBtn = document.getElementById('closeThumbnails');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeThumbnailGrid);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        // Auto-play when slides come into view
        setupAutoPlayOnScroll();
        
        console.log('=== SLIDE VIEWER INITIALIZED SUCCESSFULLY ===');
    } catch (error) {
        console.error('ERROR initializing slide viewer:', error);
    }
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
    console.log('nextSlide() called - current:', currentSlideIndex, 'total:', TOTAL_SLIDES);
    if (currentSlideIndex < TOTAL_SLIDES) {
        goToSlide(currentSlideIndex + 1);
    } else if (isAutoPlaying) {
        // Loop back to first slide when auto-playing
        goToSlide(1);
    }
    console.log('After nextSlide - new index:', currentSlideIndex);
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
