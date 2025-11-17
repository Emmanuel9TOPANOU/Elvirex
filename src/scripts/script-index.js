// Initialisation de AOS (Animate On Scroll)
AOS.init({
    duration: 500,    // durée des animations par défaut
    once: false,       // animations se répètent à chaque scroll
    mirror: true,      // animations fonctionnent dans les deux sens
    offset: 150,       // décalage en pixels avant que l'animation ne se déclenche
    delay: 100,        // délai avant le début de l'animation
    easing: 'ease-in-out', // type d'animation
    anchorPlacement: 'center-bottom' // point d'ancrage pour le déclenchement
});

// Gestion du bouton "Retour en haut"
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Fonction pour vérifier la position de défilement et afficher/masquer le bouton
function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) { // Afficher le bouton après 300px de défilement
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.remove('opacity-100');
    }
}

// Fonction pour remonter en haut de la page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Pour un défilement fluide
    });
}

// Écouteurs d'événements
window.addEventListener('scroll', toggleScrollToTopButton);
scrollToTopBtn.addEventListener('click', scrollToTop);








const slides = [
            // Slide 0: Initialisé en HTML
            {
                image: "src/assets/images/Elvi_07.jpg", tag: "Communication - Digital - Créativité",
                title: "Donner vie à votre image de marque", subtitle: "Agence de communication globale du Bénin",
                text: "Stratégie digitale, création de contenu et accompagnement sur mesure"
            },
            // Slide 1
            {
                image: "src/assets/images/Elvi_08.jpg", tag: "Stratégie - Marketing",
                title: "Propulsez votre croissance numérique", subtitle: "Votre partenaire pour le succès en ligne",
                text: "Des campagnes ciblées et des analyses précises pour des résultats mesurables."
            },
            // Slide 2
            {
                image: "src/assets/images/Elvi_09.jpg", tag: "Identité - Design",
                title: "Créez une présence inoubliable", subtitle: "Experts en branding et UX/UI",
                text: "Un design percutant qui captive et fidélise votre audience."
            }
        ];

        let currentSlide = 0;
        const slideCount = slides.length;
        const intervalTime = 7000; 
        const fadeDuration = 1500; 

        // Éléments du DOM (mis à jour avec le bouton)
        const bgImage = document.getElementById('bg-image');
        const slideTag = document.getElementById('slide-tag');
        const slideTitle = document.getElementById('slide-title');
        const slideSubtitle = document.getElementById('slide-subtitle');
        const slideText = document.getElementById('slide-text');
        const ctaButton = document.getElementById('cta-button'); // Le bouton
        // Tous les éléments qui doivent glisser et s'estomper
        const animatedElements = [slideTag, slideTitle, slideSubtitle, slideText, ctaButton]; 
        const indicatorsContainer = document.getElementById('slide-indicators');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // --- Fonctions de base ---

        function updateContent(index) {
            const slide = slides[index];
            
            // 1. DÉCLENCHER LE FADE-OUT ET LE GLISSEMENT SORTANT
            // On rend l'image invisible
            bgImage.classList.add('opacity-0');
            
            // On rend le texte invisible et on le décale vers le bas (translate-y-4)
            animatedElements.forEach(el => {
                el.classList.add('opacity-0', 'translate-y-4');
                el.classList.remove('translate-y-0');
            });

            setTimeout(() => {
                // 2. CHANGER LE CONTENU pendant la phase invisible
                bgImage.src = slide.image;
                slideTag.textContent = slide.tag;
                slideTitle.textContent = slide.title;
                slideSubtitle.textContent = slide.subtitle;
                slideText.textContent = slide.text;

                // 3. DÉCLENCHER LE FADE-IN ET LE GLISSEMENT ENTRANT
                // On rend l'image visible
                bgImage.classList.remove('opacity-0');
                
                // Le texte revient à sa position 0, et devient visible (grâce aux transitions)
                animatedElements.forEach(el => {
                    el.classList.remove('opacity-0', 'translate-y-4');
                    el.classList.add('translate-y-0');
                });

            }, fadeDuration); // Attendre la durée du fondu sortant

            updateIndicators(index);
        }

        // Le reste des fonctions (updateIndicators, nextSlide, prevSlide, resetTimer) reste identique.

        function updateIndicators(index) {
            indicatorsContainer.innerHTML = ''; 
            for (let i = 0; i < slideCount; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('w-2.5', 'h-2.5', 'rounded-full', 'transition', 'duration-300', 'cursor-pointer');
                if (i === index) {
                    indicator.classList.add('bg-yellow-500');
                    indicator.classList.remove('bg-white', 'opacity-50');
                } else {
                    indicator.classList.add('bg-white', 'opacity-50', 'hover:opacity-75');
                    indicator.classList.remove('bg-yellow-500');
                }
                indicator.addEventListener('click', () => {
                    currentSlide = i;
                    updateContent(currentSlide);
                    resetTimer();
                });
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateContent(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateContent(currentSlide);
        }

        let slideInterval;
        function resetTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        // Initialisation : Affichage instantané du contenu HTML, puis démarrage du timer
        document.addEventListener('DOMContentLoaded', () => {
            if (slideCount > 0) {
                updateIndicators(currentSlide);
                resetTimer();
            }
        });

        // Événements Manuels
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer(); 
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer(); 
        });


    // Fonction pour faire compter les chiffres
    function animateCounter(element) {
        const target = +element.getAttribute('data-target');
        let count = 0;
        const increment = target / 100; // ajustable pour vitesse

        function update() {
            count += increment;
            if(count < target) {
                element.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                element.innerText = target + (target >= 100 ? ' +' : '');
            }
        }
        update();
    }

    // Observer pour lancer l'animation quand l'élément est visible
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // éviter de répéter
            }
        });
    }, {threshold: 0.5});

    counters.forEach(counter => observer.observe(counter));

