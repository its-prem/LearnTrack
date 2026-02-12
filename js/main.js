// ============================================
// LEARNTRACK - MAIN JAVASCRIPT
// ============================================

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate menu icon
    if (navLinks.classList.contains('active')) {
      menuToggle.textContent = '✕';
    } else {
      menuToggle.textContent = '☰';
    }
  });

  // Close menu when clicking on a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    }
  });
}

// ===== COURSE FILTERS (for courses.html) =====
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

if (filterButtons.length > 0 && courseCards.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter courses
      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          // Animate appearance
          card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#"
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
}

// ===== FADE IN ON SCROLL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .course-card, .track-card, .internship-card, .step-card').forEach(el => {
  observer.observe(el);
});

// ===== ENROLLMENT BUTTON CLICK TRACKING =====
const enrollButtons = document.querySelectorAll('.enroll-btn, .track-btn, .apply-btn');

enrollButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Add click animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
    
    // You can add analytics tracking here
    console.log('Button clicked:', button.textContent);
  });
});

// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-item h3');

if (stats.length > 0) {
  const animateCount = (element) => {
    const target = element.textContent;
    const number = parseInt(target.replace(/[^0-9]/g, ''));
    const suffix = target.replace(/[0-9]/g, '');
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const step = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= number) {
        element.textContent = number + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => statsObserver.observe(stat));
}

// ===== FORM VALIDATION ENHANCEMENT =====
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  
  inputs.forEach(input => {
    // Add validation on blur
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.style.borderColor = '#ff4444';
      } else {
        input.style.borderColor = 'var(--neon-green)';
      }
    });
    
    // Reset border on focus
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--neon-green)';
    });
  });
});

// ===== LOADING STATE FOR BUTTONS =====
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = 'Loading...';
    button.style.opacity = '0.7';
  } else {
    button.disabled = false;
    button.textContent = button.dataset.originalText;
    button.style.opacity = '1';
  }
}

// ===== COPY TO CLIPBOARD FUNCTIONALITY =====
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show success message
    const message = document.createElement('div');
    message.textContent = 'Copied to clipboard!';
    message.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--neon-green);
      color: var(--black);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      z-index: 9999;
      animation: fadeInUp 0.3s ease-out;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => message.remove(), 300);
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// ===== KEYBOARD NAVIGATION ENHANCEMENT =====
document.addEventListener('keydown', (e) => {
  // Press '/' to focus search (if search input exists)
  if (e.key === '/' && !e.target.matches('input, textarea')) {
    e.preventDefault();
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) searchInput.focus();
  }
  
  // Press 'Esc' to close mobile menu
  if (e.key === 'Escape' && navLinks) {
    navLinks.classList.remove('active');
    if (menuToggle) menuToggle.textContent = '☰';
  }
});

// ===== PRINT PAGE FUNCTIONALITY =====
function printPage() {
  window.print();
}

// ===== SHARE FUNCTIONALITY =====
async function shareContent(title, text, url) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      console.log('Content shared successfully');
    } catch (err) {
      console.log('Error sharing:', err);
    }
  } else {
    // Fallback: copy link to clipboard
    copyToClipboard(url);
  }
}

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== THEME TOGGLE (if needed in future) =====
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--neon-green);
  color: var(--black);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: none;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
`;

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTopButton.addEventListener('mouseenter', () => {
  backToTopButton.style.transform = 'translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', () => {
  backToTopButton.style.transform = 'translateY(0)';
});

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #7CFF00;');
console.log('%cInterested in building amazing things? Check out our courses at LearnTrack!', 'font-size: 14px; color: #000;');
console.log('%c🚀 Visit: learntrack.com', 'font-size: 14px; font-weight: bold; color: #7CFF00;');

// ===== PAGE LOAD COMPLETE =====
window.addEventListener('load', () => {
  console.log('✅ LearnTrack website loaded successfully!');
  
  // Hide loading spinner if exists
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.style.display = 'none';
  }
});

// ===== PREVENT ACCIDENTAL FORM SUBMISSION =====
document.addEventListener('submit', (e) => {
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  
  if (submitButton) {
    setButtonLoading(submitButton, true);
  }
});

// ===== UTILITY: Format Currency =====
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

// ===== UTILITY: Format Date =====
function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

console.log('🎓 LearnTrack JavaScript Initialized!');