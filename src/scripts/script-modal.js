document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélection des éléments DOM
    const modal = document.getElementById('project-modal');
    const closeModalButton = document.getElementById('close-modal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Éléments de la modale à mettre à jour dynamiquement
    const modalImage = document.getElementById('modal-image');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClient = document.getElementById('modal-client');
    const modalResults = document.getElementById('modal-results');
    const modalTags = document.getElementById('modal-tags');

    // Fonction pour fermer la modale
    const closeModal = () => {
        if (modal) modal.classList.add('hidden');
        document.body.style.overflow = ''; // Rétablir le scroll de la page
    };

    // Fonction pour ouvrir et remplir la modale
    const openModal = (item) => {
        // Récupérer les données de la carte cliquée via les attributs data-*
        const image = item.getAttribute('data-image');
        const category = item.getAttribute('data-category');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const client = item.getAttribute('data-client');
        const results = item.getAttribute('data-results'); 
        const tags = item.getAttribute('data-tags');       

        // Remplir les éléments principaux
        if (modalImage) {
            modalImage.src = image || '';
            modalImage.alt = title || '';
        }
        if (modalCategory) modalCategory.textContent = category || '';
        if (modalTitle) modalTitle.textContent = title || '';
        if (modalDescription) modalDescription.textContent = description || '';
        if (modalClient) modalClient.textContent = client || '';

        // Remplir les résultats (Liste avec flèche)
        if (modalResults) {
            modalResults.innerHTML = ''; // Vider les anciens résultats
            if (results) {
                results.split(',').forEach(result => {
                    const li = document.createElement('li');
                    li.className = 'flex items-start';
                    li.innerHTML = `<span class="text-red-600 mr-2 font-bold text-lg leading-none">&rarr;</span> <span class="pt-px">${result.trim()}</span>`;
                    modalResults.appendChild(li);
                });
            }
        }

        // Remplir les tags (Boutons/Bandes)
        if (modalTags) {
            modalTags.innerHTML = ''; // Vider les anciens tags
            if (tags) {
                tags.split(',').forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg whitespace-nowrap';
                    span.textContent = tag.trim();
                    modalTags.appendChild(span);
                });
            }
        }

        // Afficher la modale
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page derrière la modale
        }
    };

    // 2. Écouteurs d'événements pour l'ouverture
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (anchor) {
                // Si on clique sur un lien à l'intérieur de la carte, empêcher la navigation
                // et ouvrir la modale à la place.
                e.preventDefault();
                openModal(item);
                return;
            }
            // Clique n'importe où sur la carte => ouvrir la modale
            openModal(item);
        });
    });

    // Écoute globale pour couvrir les liens qui pourraient être ajoutés dynamiquement
    document.querySelectorAll('#portfolio-grid a').forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = e.target.closest('.portfolio-item');
            if (parent) {
                e.preventDefault();
                openModal(parent);
            }
        });
    });

    // 3. Écouteurs d'événements pour la fermeture
    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});