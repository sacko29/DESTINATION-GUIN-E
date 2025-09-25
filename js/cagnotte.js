// ===== CAGNOTTE.JS =====
// JavaScript spécifique à la page cagnotte.html

document.addEventListener('DOMContentLoaded', function() {
    initDonationButtons();
    initShareFunctionality();
    initDonationCounter();
});

// ===== BOUTONS DE DON =====
function initDonationButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customInput = document.querySelector('.custom-input');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la sélection précédente
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Sélectionner ce bouton
            this.classList.add('selected');
            
            // Mettre à jour l'input personnalisé
            const amount = this.getAttribute('data-amount');
            if (customInput) {
                customInput.value = amount;
            }
        });
    });
    
    // Gestion de l'input personnalisé
    if (customInput) {
        customInput.addEventListener('input', function() {
            // Désélectionner les boutons prédéfinis
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Valider le montant
            const value = parseInt(this.value);
            if (value && value > 0) {
                this.classList.remove('error');
            } else {
                this.classList.add('error');
            }
        });
        
        customInput.addEventListener('focus', function() {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
        });
    }
}

// ===== FONCTIONNALITÉS DE PARTAGE =====
function initShareFunctionality() {
    // Bouton WhatsApp
    const whatsappBtn = document.querySelector('.share-btn.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', shareWhatsApp);
    }
    
    // Bouton copier lien
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyLink);
    }
    
    // Partage réseaux sociaux
    const socialBtns = document.querySelectorAll('.share-btn:not(.whatsapp):not(.large)');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList[1]; // twitter, facebook, sms
            shareOnPlatform(platform);
        });
    });
}

function shareWhatsApp() {
    const text = "Rejoignez-nous pour le grand nettoyage de Conakry le 21 décembre ! 🎯";
    const url = "https://www.cotizup.com/nettoieconakry";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    window.open(whatsappUrl, '_blank');
}

function copyLink() {
    const linkInput = document.querySelector('.link-input');
    if (!linkInput) return;
    
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    
    try {
        navigator.clipboard.writeText(linkInput.value).then(() => {
            showCopyFeedback();
        });
    } catch (err) {
        // Fallback pour anciens navigateurs
        document.execCommand('copy');
        showCopyFeedback();
    }
}

function showCopyFeedback() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    
    copyBtn.textContent = '✓ Copié !';
    copyBtn.style.background = '#27ae60';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

function shareOnPlatform(platform) {
    const text = "Je soutiens Destination Guinée pour le grand nettoyage de Conakry !";
    const url = "https://www.cotizup.com/nettoieconakry";
    const hashtags = "DestinationGuinee,21Decembre,nettoieconakry";
    
    let shareUrl;
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'sms':
            shareUrl = `sms:?body=${encodeURIComponent(text + " " + url)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// ===== COMPTEUR DE DONS ANIMÉ =====
function initDonationCounter() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    // Animation de la barre de progression
    setTimeout(() => {
        progressFill.style.transition = 'width 2s ease-in-out';
        progressFill.style.width = '8.45%';
    }, 500);
    
    // Simulation de mise à jour en temps réel (pour la démo)
    setInterval(() => {
        // En réalité, ici on ferait un appel API pour avoir les vrais chiffres
        updateCounterAnimation();
    }, 30000); // Toutes les 30 secondes
}

function updateCounterAnimation() {
    const amountEl = document.querySelector('.stat-number:first-child');
    const participantsEl = document.querySelector('.stat-number:nth-child(2)');
    
    if (amountEl && participantsEl) {
        // Petite animation de pulse pour indiquer une mise à jour
        amountEl.style.animation = 'pulse 0.6s ease';
        participantsEl.style.animation = 'pulse 0.6s ease';
        
        setTimeout(() => {
            amountEl.style.animation = '';
            participantsEl.style.animation = '';
        }, 600);
    }
}
