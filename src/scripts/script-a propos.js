document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    let started = false;

    // Initialiser les compteurs à 0 sans clignotement
    counters.forEach(counter => {
        counter.style.opacity = "0"; // invisible au chargement
        counter.innerText = "0";
    });

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const speed = 200; // plus petit = plus rapide
            const increment = Math.ceil(target / speed);

            let count = 0;
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = count;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            // Apparition fluide du chiffre avant l’animation
            counter.style.transition = "opacity 0.5s ease";
            counter.style.opacity = "1";
            updateCount();
        });
    };

    // Déclenche l’animation quand la section entre dans la vue
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            startCounting();
        }
    }, { threshold: 0.4 });

    const section = document.querySelector(".bg-gradient-to-r");
    if (section) observer.observe(section);
});


  document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("about-section");
    const bgImage = new Image();
    const imageUrl = section.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');

    bgImage.src = imageUrl;
    bgImage.onload = () => {
      section.classList.add("opacity-100"); // transition douce à l’apparition
    };
  });
