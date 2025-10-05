// ==========================================================================
// VROOM 2025 - Premium JavaScript
// ==========================================================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main Initialization
function initializeApp() {
    hideLoadingScreen();
    initTheme();
    initSmoothScroll();
    initCounters();
    initForms();
    initModals();
    initMobileMenu();
    initScrollEffects();
    init3DEffects();
    
    console.log('✨ VROOM 2025 Premium Website Initialized!');
}

// ==========================================================================
// Loading Screen
// ==========================================================================

function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

// ==========================================================================
// Theme Management
// ==========================================================================

function initTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showNotification(`Thème ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, 'info');
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeBtn i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ==========================================================================
// Smooth Scroll
// ==========================================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                scrollToElement(target);
            }
        });
    });
}

function scrollToElement(element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        scrollToElement(element);
    }
}

// ==========================================================================
// Counter Animation
// ==========================================================================

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 98 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 98 ? '%' : '+');
        }
    }, 16);
}

// ==========================================================================
// Form Handling
// ==========================================================================

function initForms() {
    const contactForm = document.getElementById('contactForm');
    const devisForm = document.getElementById('devisForm');
    const locationForm = document.getElementById('locationForm');

    if (contactForm) contactForm.addEventListener('submit', handleContactForm);
    if (devisForm) devisForm.addEventListener('submit', handleDevisForm);
    if (locationForm) locationForm.addEventListener('submit', handleLocationForm);
}

async function handleContactForm(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');
    
    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    
    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('Message envoyé avec succès! Nous vous contacterons bientôt.', 'success');
        this.reset();
    }, 1500);
}

async function handleDevisForm(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');
    
    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    
    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('Demande de devis soumise avec succès! Nous vous contacterons sous 24h.', 'success');
        this.reset();
        closeDevisModal();
    }, 1500);
}

async function handleLocationForm(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');
    
    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    
    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('Réservation confirmée! Un conseiller vous contactera pour finaliser les détails.', 'success');
        this.reset();
        closeLocationModal();
    }, 1500);
}

// ==========================================================================
// Modal Management
// ==========================================================================

function initModals() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openDevisModal() {
    const modal = document.getElementById('devisModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeDevisModal() {
    const modal = document.getElementById('devisModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    closeDevisModal();
    closeLocationModal();
}

// ==========================================================================
// Mobile Menu
// ==========================================================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    }
}

// ==========================================================================
// Scroll Effects
// ==========================================================================

function initScrollEffects() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (navbar) {
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ==========================================================================
// 3D Effects & Parallax
// ==========================================================================

function init3DEffects() {
    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.service-card-3d, .vehicle-card-3d');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const distX = (e.clientX - cardX) / 50;
            const distY = (e.clientY - cardY) / 50;
            
            card.style.setProperty('--mouse-x', `${distX}px`);
            card.style.setProperty('--mouse-y', `${distY}px`);
        });
    });
}

// ==========================================================================
// Contact & Social Functions
// ==========================================================================

function openWhatsApp() {
    const phone = '+33768790959';
    const message = 'Bonjour VROOM, je suis intéressé par vos services automobiles.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function makeCall() {
    const phone = '+33768790959';
    window.open(`tel:${phone}`, '_self');
}

function sendEmail() {
    const email = 'contact@vroo-m.com';
    const subject = 'Demande d\'information - VROOM';
    const body = 'Bonjour VROOM,\n\nJe souhaiterais obtenir des informations sur vos services.';
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
}

function openSocial(platform) {
    const urls = {
        facebook: 'https://facebook.com/vroomci',
        instagram: 'https://instagram.com/vroomci',
        linkedin: 'https://linkedin.com/company/vroomci',
        twitter: 'https://twitter.com/vroomci',
        whatsapp: 'https://wa.me/+33768790959'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

function rentVehicle(vehicleName) {
    openLocationModal();
    
    setTimeout(() => {
        const vehicleSelect = document.getElementById('locationVehicle');
        if (vehicleSelect) {
            const option = Array.from(vehicleSelect.options).find(opt => 
                opt.text.includes(vehicleName)
            );
            if (option) {
                vehicleSelect.value = option.value;
            }
        }
    }, 100);
}

// ==========================================================================
// Electric Charging Functions
// ==========================================================================

function findNearestCharging() {
    if (navigator.geolocation) {
        showNotification('📍 Localisation en cours...', 'info');
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                showNotification(`🚗 Stations trouvées près de vous! (${lat.toFixed(2)}, ${lng.toFixed(2)})`, 'success');
                
                setTimeout(() => {
                    openDevisModal();
                }, 1500);
            },
            function(error) {
                showNotification('❌ Localisation non disponible. Veuillez activer la géolocalisation.', 'error');
            }
        );
    } else {
        showNotification('❌ Géolocalisation non supportée par votre navigateur.', 'error');
    }
}

// ==========================================================================
// Notification System
// ==========================================================================

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        border: 1px solid rgba(255,255,255,0.2);
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        ">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#0066FF'
    };
    return colors[type] || '#0066FF';
}

// ==========================================================================
// Language Toggle
// ==========================================================================

const languageBtn = document.getElementById('languageBtn');
if (languageBtn) {
    languageBtn.addEventListener('click', function() {
        const currentLang = this.textContent.trim();
        const newLang = currentLang === 'FR' ? 'EN' : 'FR';
        
        this.innerHTML = `<i class="fas fa-globe"></i> ${newLang}`;
        showNotification(`Langue changée en ${newLang}`, 'info');
    });
}

// ==========================================================================
// Performance & Error Handling
// ==========================================================================

// Lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// Error handling
window.addEventListener('error', function(e) {
    console.error('Website Error:', e.error);
});

// ==========================================================================
// Add notification animations to CSS
// ==========================================================================

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// ==========================================================================
// Export functions for global access
// ==========================================================================

window.scrollToSection = scrollToSection;
window.openDevisModal = openDevisModal;
window.closeDevisModal = closeDevisModal;
window.openLocationModal = openLocationModal;
window.closeLocationModal = closeLocationModal;
window.toggleMobileMenu = toggleMobileMenu;
window.openWhatsApp = openWhatsApp;
window.makeCall = makeCall;
window.sendEmail = sendEmail;
window.openSocial = openSocial;
window.rentVehicle = rentVehicle;
window.findNearestCharging = findNearestCharging;

console.log('');