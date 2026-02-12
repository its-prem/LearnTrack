document.addEventListener('DOMContentLoaded', () => {
    
    // Add loading class to prevent FOUC (Flash of Unstyled Content)
    document.body.classList.add('loading');
    
    // Remove loading class after DOM is fully loaded
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);
    
    // --- 1. MOBILE MENU (SLIDE DOWN) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.m-link');
    const body = document.body;
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                body.style.overflow = '';
            }
        });
    }
    
    // --- 2. SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // --- 3. NAVBAR STICKY SHADOW & BACKGROUND ---
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 20) {
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.background = "rgba(255, 255, 255, 0.85)";
        }
        
        // Optional: Hide navbar on scroll down, show on scroll up
        // Uncomment below if you want this behavior
        /*
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */
        
        lastScroll = currentScroll;
    };
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    }, { passive: true });
    
    // --- 4. SMOOTH SCROLL FOR ANCHOR LINKS ---
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty or just '#' links
            if (!href || href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    menuToggle.classList.remove('open');
                    mobileMenu.classList.remove('open');
                    body.style.overflow = '';
                }
                
                // Smooth scroll to target
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- 5. BUTTON CLICK RIPPLE EFFECT (OPTIONAL) ---
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles if not already in CSS
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    .btn-primary, .btn-secondary, .btn-outline {
                        position: relative;
                        overflow: hidden;
                    }
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // --- 6. FORM SUBMISSION HANDLING ---
    const newsletterForm = document.querySelector('.news-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show loading state
                const originalButtonHTML = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                submitButton.disabled = true;
                
                // Simulate API call (replace with actual API call)
                setTimeout(() => {
                    // Success state
                    submitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                    emailInput.value = '';
                    
                    // Show success message (you can customize this)
                    alert('Thank you for subscribing! Check your email for confirmation.');
                    
                    // Reset button
                    setTimeout(() => {
                        submitButton.innerHTML = originalButtonHTML;
                        submitButton.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // --- 7. LAZY LOAD IMAGES (OPTIONAL) ---
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // --- 8. PERFORMANCE: DEBOUNCE RESIZE EVENT ---
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Add any resize-dependent code here
            // For example, recalculate orbit container size on mobile
        }, 250);
    }, { passive: true });
    
    // --- 9. ACCESSIBILITY: FOCUS VISIBLE ---
    // Add focus-visible polyfill behavior for better keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Add styles for keyboard navigation
    if (!document.querySelector('#keyboard-nav-styles')) {
        const style = document.createElement('style');
        style.id = 'keyboard-nav-styles';
        style.textContent = `
            body:not(.keyboard-nav) *:focus {
                outline: none;
            }
            body.keyboard-nav *:focus {
                outline: 2px solid #0066FF;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // --- 10. CONSOLE EASTER EGG (OPTIONAL) ---
    console.log(
        '%c👋 Welcome to LearnTrack!',
        'color: #0066FF; font-size: 20px; font-weight: bold;'
    );
    console.log(
        '%cInterested in joining our team? Check out our careers page!',
        'color: #64748B; font-size: 14px;'
    );
});

// --- 11. SCROLL TO TOP BUTTON (OPTIONAL) ---
// Create and add scroll-to-top button
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    button.className = 'scroll-top-btn';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #0066FF;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(0, 102, 255, 0.4);
            z-index: 999;
        }
        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
        }
        .scroll-top-btn:hover {
            background: #0052CC;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 102, 255, 0.5);
        }
        @media (max-width: 768px) {
            .scroll-top-btn {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }, { passive: true });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Uncomment to enable scroll-to-top button
// createScrollTopButton();