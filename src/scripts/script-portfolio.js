document.addEventListener('DOMContentLoaded', function () {
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const portfolioGrid = document.getElementById('portfolio-grid');

    if (!filterButtonsContainer) {
        console.warn('Filtrage portfolio: conteneur de boutons (#filter-buttons) introuvable.');
        return;
    }

    if (!portfolioGrid) {
        console.warn("Filtrage portfolio: grille des projets (#portfolio-grid) introuvable. Le filtrage s'appliquera sur tous les éléments marqués.");
        // ne pas retourner — on peut filtrer via .portfolio-item
    }

    // Trouve les boutons existants dans le conteneur (statique dans le HTML)
    const buttons = Array.from(filterButtonsContainer.querySelectorAll('button'));
    if (buttons.length === 0) {
        console.warn('Filtrage portfolio: aucun bouton trouvé dans #filter-buttons.');
        return;
    }

    // Helper: remove accents and trim (défini une fois)
    const normalize = (s) => s && s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() : (s || '').trim();

    // Ajoute un dataset.category et les listeners à chaque bouton
    buttons.forEach((btn, idx) => {
        const text = btn.textContent.trim();
        // Normaliser la catégorie (minuscules)
        btn.dataset.category = normalize(text).toLowerCase();

        btn.addEventListener('click', () => {
            // Reset styles
            buttons.forEach(b => {
                b.classList.remove('bg-red-600', 'text-white', 'shadow-md');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });

            // Activer le bouton cliqué
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('bg-red-600', 'text-white', 'shadow-md');

            // Filtrer
            const selectedCategory = btn.dataset.category;
            // Sélectionne tous les éléments marqués comme projets (peu importe la rangée)
            const projects = Array.from(document.querySelectorAll('.portfolio-item'));

            projects.forEach(project => {
                const catEl = project.querySelector('p.uppercase');
                    const projectCategory = catEl ? normalize(catEl.textContent).toLowerCase() : '';

                if (selectedCategory === 'tous les projets' || projectCategory === selectedCategory) {
                    project.style.display = '';
                    // relancer animation
                    project.classList.remove('animate-fadeIn');
                    // trigger reflow to restart animation
                    // eslint-disable-next-line no-unused-expressions
                    project.offsetWidth;
                    project.classList.add('animate-fadeIn');
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Animation pour l'apparition des projets (si non déjà présente)
    if (!document.getElementById('portfolio-filter-style')) {
        const style = document.createElement('style');
        style.id = 'portfolio-filter-style';
        style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.45s ease-out forwards;
        }
        `;
        document.head.appendChild(style);
    }
});





document.addEventListener('DOMContentLoaded', () => {
            const menuBtn = document.getElementById('menuBtn');
            const sidebar = document.getElementById('sidebar');
            const closeSidebarBtn = document.getElementById('closeSidebar');
            let isOpen = false;

            // Fonction pour ouvrir la sidebar
            const openSidebar = () => {
                sidebar.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden'; // Empêche le scroll du body
                isOpen = true;
            };

            // Fonction pour fermer la sidebar
            const closeSidebar = () => {
                sidebar.classList.add('translate-x-full');
                document.body.style.overflow = ''; // Réactive le scroll du body
                isOpen = false;
            };

            // Gestionnaire d'événement pour le bouton menu
            menuBtn.addEventListener('click', () => {
                if (!isOpen) {
                    openSidebar();
                } else {
                    closeSidebar();
                }
            });

            // Gestionnaire d'événement pour le bouton de fermeture
            closeSidebarBtn.addEventListener('click', closeSidebar);

            // Fermer la sidebar en cliquant en dehors
            document.addEventListener('click', (e) => {
                if (isOpen && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                    closeSidebar();
                }
            });

            // Fermer la sidebar lors du redimensionnement de la fenêtre (passage à md/desktop)
            window.addEventListener('resize', () => {
                // 768px est la taille par défaut pour la breakpoint 'md' de Tailwind
                if (window.innerWidth >= 768 && isOpen) {
                    closeSidebar();
                }
            });
        });