document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    let isOpen = false;

    // Fonction pour ouvrir la sidebar
    const openSidebar = () => {
        sidebar.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
        isOpen = true;
    };

    // Fonction pour fermer la sidebar
    const closeSidebar = () => {
        sidebar.classList.add('translate-x-full');
        document.body.style.overflow = '';
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

    // Fermer la sidebar lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isOpen) {
            closeSidebar();
        }
    });
});
