document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner le premier élément portfolio
    const firstPortfolioItem = document.querySelector('.portfolio-item');
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.querySelector('#projectModal button');
    const modalOverlay = document.querySelector('#projectModal .bg-black');

    if (firstPortfolioItem && modal) {
        // Ajouter un gestionnaire d'événement pour ouvrir le modal
        firstPortfolioItem.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
        });

        // Fermer le modal lors du clic sur le bouton de fermeture
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Fermer le modal lors du clic sur l'overlay
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Fermer le modal avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Rétablir le défilement du body
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('projectModal');
    const modalImage = modal.querySelector('img');
    const modalCategory = modal.querySelector('p.text-red-600');
    const modalTitle = modal.querySelector('h2.text-3xl');
    const modalDescription = modal.querySelector('p.text-gray-600');
    const modalClient = modal.querySelector('p.text-gray-700');
    const modalResults = modal.querySelector('ul.space-y-2');
    const modalTechnologies = modal.querySelector('div.flex.flex-wrap');

    const closeModalBtn = document.getElementById('close-modal-button');
    const overlay = modal.querySelector('.absolute.inset-0');

    function openModal(item) {
        const img = item.querySelector('img');
        const category = item.querySelector('.category').textContent;
        const title = item.querySelector('.title').textContent;
        const description = item.querySelector('.description').textContent;
        const client = item.querySelector('.client')?.textContent || '';
        const resultsList = item.querySelectorAll('.results li');
        const techs = item.querySelector('.technologies')?.textContent.split(',') || [];

        modalImage.src = img.src;
        modalCategory.textContent = category;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalClient.textContent = client;

        modalResults.innerHTML = '';
        resultsList.forEach(li => {
            const newLi = document.createElement('li');
            newLi.className = 'flex items-center text-sm text-gray-700';
            newLi.innerHTML = `<span class="text-orange-500 font-bold mr-2 text-lg">&rarr;</span>${li.textContent}`;
            modalResults.appendChild(newLi);
        });

        modalTechnologies.innerHTML = '';
        techs.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full';
            span.textContent = tech.trim();
            modalTechnologies.appendChild(span);
        });

        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => openModal(item));
    });

    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
});




function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Empêche le défilement du fond
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Rétablit le défilement
        }
    }

    // Fermeture par clic sur l'arrière-plan
    document.addEventListener('click', function (e) {
        if (e.target.id === 'portfolio-modal') {
            closeModal('portfolio-modal');
        }
    });

    // Fermeture par la touche ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const openModalElement = document.getElementById('portfolio-modal');
            if (openModalElement && !openModalElement.classList.contains('hidden')) {
                closeModal('portfolio-modal');
            }
        }
    });