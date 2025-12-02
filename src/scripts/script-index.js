// ------------------ AOS ------------------
AOS.init({
    duration: 400,          // Durée des animations un peu rapide
    once: false,           
    mirror: true,
    offset: 150,
    delay: 50,
    easing: 'ease-in-out',
    anchorPlacement: 'center-bottom'
});

// ------------------ Bouton Retour en haut ------------------
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.remove('opacity-100');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', toggleScrollToTopButton);
scrollToTopBtn.addEventListener('click', scrollToTop);

// ------------------ Slider ------------------
const slides = [
    {
        image: "src/assets/images/Elvi_07.jpg",
        tag: "Communication - Digital - Créativité",
        title: "Donner vie à votre image de marque",
        subtitle: "Agence de communication globale du Bénin",
        text: "Stratégie digitale, création de contenu et accompagnement sur mesure"
    },
    {
        image: "src/assets/images/Elvi_08.jpg",
        tag: "Stratégie - Marketing",
        title: "Propulsez votre croissance numérique",
        subtitle: "Votre partenaire pour le succès en ligne",
        text: "Des campagnes ciblées et des analyses précises pour des résultats mesurables."
    },
    {
        image: "src/assets/images/Elvi_09.jpg",
        tag: "Identité - Design",
        title: "Créez une présence inoubliable",
        subtitle: "Experts en branding et UX/UI",
        text: "Un design percutant qui captive et fidélise votre audience."
    }
];

let currentSlide = 0;
const slideCount = slides.length;
const intervalTime = 4000;  // Changement automatique (4 secondes)
const fadeDuration = 600;   // Fade fluide (0.6s)
const staggerDelay = 100;   // Délai échelonné entre les éléments (0.1s)

const bgImage = document.getElementById('bg-image');
const slideTag = document.getElementById('slide-tag');
const slideTitle = document.getElementById('slide-title');
const slideSubtitle = document.getElementById('slide-subtitle');
const slideText = document.getElementById('slide-text');
const ctaButton = document.getElementById('cta-button');
const animatedElements = [slideTag, slideTitle, slideSubtitle, slideText, ctaButton];
const indicatorsContainer = document.getElementById('slide-indicators');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let isTransitioning = false;


function updateContent(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    const slide = slides[index];

    // Fade-out avec délai échelonné
    bgImage.style.transition = `opacity ${fadeDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    bgImage.classList.add('opacity-0');

    animatedElements.forEach((el, i) => {
        el.style.transition = `all ${fadeDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        el.classList.add('opacity-0', 'translate-y-4');
    });

    setTimeout(() => {
        // Changement du contenu
        bgImage.src = slide.image;
        slideTag.textContent = slide.tag;
        slideTitle.textContent = slide.title;
        slideSubtitle.textContent = slide.subtitle;
        slideText.textContent = slide.text;

        // Force reflow pour relancer les animations
        void bgImage.offsetWidth;

        // Fade-in avec délai échelonné
        bgImage.classList.remove('opacity-0');
        
        animatedElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.remove('opacity-0', 'translate-y-4');
            }, i * staggerDelay);
        });

        setTimeout(() => {
            isTransitioning = false;
        }, animatedElements.length * staggerDelay + fadeDuration);
    }, fadeDuration);

    updateIndicators(index);
}

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

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (slideCount > 0) {
        updateIndicators(currentSlide);
        updateContent(currentSlide);
        resetTimer();
    }
});

// Événements des boutons
prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });

// ------------------ Compteur ------------------
function animateCounter(element) {
    const target = +element.getAttribute('data-target');
    let count = 0;
    const increment = target / 100;

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

const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));
