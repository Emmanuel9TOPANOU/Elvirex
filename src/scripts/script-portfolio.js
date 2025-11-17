document.addEventListener('DOMContentLoaded', function () {

    // ---------------- Filtre portfolio ----------------
    const filterButtonsContainer = document.getElementById('filter-buttons');
    if (filterButtonsContainer) {
        const buttons = Array.from(filterButtonsContainer.querySelectorAll('button'));
        const normalize = s => s && s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() : (s||'').trim();

        buttons.forEach(btn => {
            const text = btn.textContent.trim();
            btn.dataset.category = normalize(text).toLowerCase();

            btn.addEventListener('click', () => {
                buttons.forEach(b => {
                    b.classList.remove('bg-red-600','text-white','shadow-md');
                    b.classList.add('bg-gray-200','text-gray-700');
                });

                btn.classList.remove('bg-gray-200','text-gray-700');
                btn.classList.add('bg-red-600','text-white','shadow-md');

                const selectedCategory = btn.dataset.category;
                const projects = Array.from(document.querySelectorAll('.portfolio-item'));

                projects.forEach(project => {
                    const catEl = project.querySelector('p.uppercase');
                    const projectCategory = catEl ? normalize(catEl.textContent).toLowerCase() : '';

                    if (selectedCategory === 'tous les projets' || projectCategory === selectedCategory) {
                        project.classList.remove("hidden");
                        project.classList.remove("animate-fadeIn");
                        project.offsetWidth;
                        project.classList.add("animate-fadeIn");
                    } else {
                        project.classList.add("hidden");
                    }
                });
            });
        });

        if (!document.getElementById('portfolio-filter-style')) {
            const style = document.createElement('style');
            style.id = 'portfolio-filter-style';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.45s ease-out forwards; }
            `;
            document.head.appendChild(style);
        }
    }

    // ---------------- Sidebar ----------------
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    let isOpen = false;

    const openSidebar = () => {
        sidebar?.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
        isOpen = true;
    };
    const closeSidebar = () => {
        sidebar?.classList.add('translate-x-full');
        document.body.style.overflow = '';
        isOpen = false;
    };

    menuBtn?.addEventListener('click', () => isOpen ? closeSidebar() : openSidebar());
    closeSidebarBtn?.addEventListener('click', closeSidebar);

    document.addEventListener('click', e => {
        if (isOpen && sidebar && menuBtn && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            closeSidebar();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isOpen) closeSidebar();
    });

});
