// ============================================
// HEALTH & WELLNESS WEBSITE - JAVASCRIPT
// ============================================

// Smooth Scrolling for Navigation Links
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

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email && validateEmail(email)) {
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background-color: #2ecc71;' : 'background-color: #e74c3c;'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Download Button Handler
const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const resource = this.closest('.resource-card').querySelector('h3').textContent;
        showNotification(`Starting download: ${resource}`, 'success');
        // In a real application, this would trigger an actual download
    });
});

// Affiliate Link Tracking
const affiliateButtons = document.querySelectorAll('.affiliate-btn');
affiliateButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const product = this.closest('.product-card').querySelector('h3').textContent;
        console.log(`Tracking click for: ${product}`);
        // This would be used for analytics tracking
    });
});

// Search Functionality
const searchButton = document.querySelector('.search-bar button');
const searchInput = document.querySelector('.search-bar input');

if (searchButton) {
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const query = searchInput.value;
        if (query.trim()) {
            performSearch(query);
        }
    });

    // Allow search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });
}

function performSearch(query) {
    console.log(`Searching for: ${query}`);
    showNotification(`Searching for "${query}"...`, 'success');
    // In a real application, this would perform an actual search
}

// Add Animation Styles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add Active Link Styling
const activeStyle = document.createElement('style');
activeStyle.innerHTML = `
    .navbar a.active {
        color: var(--primary-color) !important;
    }
    
    .navbar a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeStyle);

// Mobile Menu Toggle (for future implementation)
function setupMobileMenu() {
    const nav = document.querySelector('.navbar');
    const header = document.querySelector('header');
    
    // Check if mobile menu button exists
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle && window.innerWidth <= 768) {
        // Create menu toggle button
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--dark-text);
        `;
        
        // Show on mobile
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    console.log('Health & Wellness website loaded successfully!');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        setupMobileMenu();
    }, 250);
});

// Explore Category Button Navigation
const exploreButtons = document.querySelectorAll('.explore-btn');
exploreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.closest('.category-card').querySelector('h3').textContent;
        showNotification(`Exploring: ${category}`, 'success');
        // In a real application, this would navigate to the category page
    });
});

// Read More Button Navigation
const readMoreLinks = document.querySelectorAll('.read-more');
readMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const articleTitle = this.closest('.post-card').querySelector('h3').textContent;
        showNotification(`Opening: ${articleTitle}`, 'success');
        // In a real application, this would navigate to the article page
    });
});

// Product Review Rating Animation
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const rating = this.querySelector('.rating');
        if (rating) {
            rating.style.transform = 'scale(1.1)';
            rating.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        const rating = this.querySelector('.rating');
        if (rating) {
            rating.style.transform = 'scale(1)';
        }
    });
});

// Track Page Events
function trackPageEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // This would integrate with your analytics service (Google Analytics, Mixpanel, etc.)
}

// Track page view on load
trackPageEvent('page_view', {
    page: 'Health & Wellness Homepage',
    timestamp: new Date().toISOString()
});

// Export functions for external use
window.healthWellness = {
    showNotification,
    validateEmail,
    performSearch,
    trackPageEvent
};
