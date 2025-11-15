


document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("input[placeholder='Rechercher un article...']");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const articles = document.querySelectorAll(".blog-card");

    let activeCategory = "all"; // catégorie active par défaut

    // 🔍 Filtrage par recherche
    searchInput.addEventListener("input", () => {
        filterArticles();
    });

    // 🏷️ Filtrage par catégorie
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category;
            filterButtons.forEach(btn => btn.classList.remove("bg-red-600", "text-white"));
            button.classList.add("bg-red-600", "text-white");
            filterArticles();
        });
    });

    function filterArticles() {
        const searchValue = searchInput.value.toLowerCase();

        articles.forEach(article => {
            const category = article.dataset.category;
            const title = article.querySelector("h3").textContent.toLowerCase();
            const content = article.querySelector("p").textContent.toLowerCase();

            const matchCategory = activeCategory === "all" || category === activeCategory;
            const matchSearch = title.includes(searchValue) || content.includes(searchValue);

            if (matchCategory && matchSearch) {
                article.classList.remove("hidden");
            } else {
                article.classList.add("hidden");
            }
        });
    }
});





const searchInput = document.getElementById('searchInput');
const blogCards = document.querySelectorAll('.blog-card');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    blogCards.forEach(card => {
        const category = card.getAttribute('data-category').toLowerCase();
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        // Vérifie si la recherche correspond au titre, description ou catégorie
        if(title.includes(query) || description.includes(query) || category.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});