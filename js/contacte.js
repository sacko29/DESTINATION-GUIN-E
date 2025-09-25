// ===== CONTACT.JS =====
// JavaScript spécifique à la page contact.html

document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initContactForm();
    initMapInteractions();
    initFAQ();
});

// ===== COMPTE À REBOURS =====
function initCountdown() {
    const eventDate = new Date('2025-12-21T08:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    
    if (!daysEl) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Mise à jour chaque minute
}

// ===== FORMULAIRE DE CONTACT =====
function initContactForm() {
    const form = document.getElementById('volunteer-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Validation en temps réel
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function validateForm() {
    const form = document.getElementById('volunteer-form');
    let isValid = true;
    
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    clearError(field);
    
    if (field.hasAttribute('required') && !value) {
        showError(field, 'Ce champ est obligatoire');
        isValid = false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Format d\'email invalide');
            isValid = false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(value)) {
            showError(field, 'Format de téléphone invalide');
            isValid = false;
        }
    }
    
    return isValid;
}

function showError(field, message) {
    clearError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.3rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

function clearError(e) {
    const field = e.target || e;
    const errorDiv = field.parentNode.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.classList.remove('error');
}

function submitForm() {
    const form = document.getElementById('volunteer-form');
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Simulation d'envoi
    submitBtn.innerHTML = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Ici, normalement on enverrait les données à un serveur
        showSuccessMessage();
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: #27ae60;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            text-align: center;
        ">
            ✅ Merci ! Votre inscription a été enregistrée. 
            Vous recevrez un email de confirmation.
        </div>
    `;
    
    const form = document.getElementById('volunteer-form');
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ===== INTERACTIONS CARTE =====
function initMapInteractions() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            // Mettre à jour le select du formulaire
            const locationName = this.querySelector('strong').textContent;
            const select = document.getElementById('location');
            if (select) {
                for (let option of select.options) {
                    if (option.text.includes(locationName)) {
                        option.selected = true;
                        break;
                    }
                }
            }
            
            // Animation de feedback
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// ===== FAQ ACCORDÉON =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les autres
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Ouvrir celui-ci si pas actif
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}
