// ===== SCRIPT.JS =====
// JavaScript global pour toutes les pages

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initGlobalInteractions();
});

// ===== NAVIGATION MOBILE =====
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Créer le bouton hamburger si inexistant
    if (!menuToggle && window.innerWidth < 768) {
        createMobileMenu();
    }
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navMenu.classList.remove('active');
                document.querySelector('.menu-toggle')?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;
    
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    navContainer.appendChild(menuToggle);
}

// ===== ANIMATIONS AU SCROLL =====
function initAnimations() {
    // Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.mission-item, .gallery-item, .team-member');
    animateElements.forEach(el => observer.observe(el));
}

// ===== INTERACTIONS GLOBALES =====
function initGlobalInteractions() {
    // Gestionnaire de clic externe pour fermer le menu
    document.addEventListener('click', function(e) {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu && 
            !menuToggle.contains(e.target) && 
            !navMenu.contains(e.target) &&
            navMenu.classList.contains('active')) {
            
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Smooth scroll pour les ancres internes
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
    
    // Gestion du resize window
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
}

// ===== FONCTIONS UTILITAIRES GLOBALES =====
function formatNumber(number) {
    return new Intl.NumberFormat('fr-FR').format(number);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== GESTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// ===== API GLOBALE =====
window.DestinationGuinee = {
    utils: {
        formatNumber,
        debounce
    }
};
