


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

            // Défilement fluide vers la section des articles pour améliorer la visibilité
            const articlesTitle = document.getElementById('latest-articles-title') || document.querySelector('.container');
            if (articlesTitle) {
                // Laisser le temps au DOM d'appliquer les classes/affichages
                setTimeout(() => {
                    // Défilement plus lent/fluide (1s)
                    smoothScrollTo(articlesTitle, 1000, 'start');

                    // Centrer le premier article visible après filtrage
                    setTimeout(() => {
                        const firstVisible = Array.from(document.querySelectorAll('.blog-card'))
                            .find(card => window.getComputedStyle(card).display !== 'none' && !card.classList.contains('hidden'));
                        if (firstVisible) smoothScrollTo(firstVisible, 1000, 'center');
                    }, 400);
                }, 40);
            }
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



document.addEventListener('DOMContentLoaded', () => {
    // Fonction utilitaire pour lire un paramètre d'URL
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        // Retourne le slug ou null si non trouvé
        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Récupérer l'ID de l'article de l'URL (ex: blog.html?id=tendances-marketing-2025)
    const articleId = getUrlParameter('id');
    
    // Définir l'article à charger (par défaut, le premier article si aucun ID n'est spécifié)
    const articleToLoad = articlesData[articleId] || articlesData["tendances-marketing-2025"];

    // Vérifier si l'article existe avant de le charger
    if (articleToLoad) {
        loadArticleContent(articleToLoad);
    } else {
        // Gérer le cas où l'ID est invalide (Afficher un message, rediriger vers 404, etc.)
        console.error(`Article avec l'ID "${articleId}" non trouvé.`);
        // Optionnel : Afficher un message d'erreur à l'utilisateur.
    }
    
    // Assurez-vous que les liens "Articles Similaires" pointent vers le template dynamique
    updateSidebarLinks();


    function loadArticleContent(article) {
        // --- 1. Mise à jour des Métadonnées et du Titre de la Page
        document.title = `${article.titre} | Elvirex Communication`;
        
        // --- 2. Mise à jour de la Section d'Introduction (Héros)
        document.querySelector('.relative.bg-black h1').innerHTML = article.titre.replace('Marketing Digital', '<span class="text-yellow-600">Marketing Digital</span>'); 
        document.querySelector('.relative.bg-black .mb-4 span:first-child').textContent = article.categorie;
        // La lecture est statique dans le modèle, nous laissons la logique telle quelle si on n'a pas la donnée exacte.
        // document.querySelector('.relative.bg-black .mb-4 span:last-child').textContent = article.tempsLecture; 
        
        document.querySelector('.relative.bg-black .flex-items-center > div:first-child span').textContent = `Par ${article.auteur}`;
        document.querySelector('.relative.bg-black .flex-items-center > div:last-child span').textContent = `Publié le ${article.date}`;
        document.querySelector('.relative.bg-black img').src = article.image;

        // --- 3. Mise à jour du Contenu Principal
        const mainContent = document.querySelector('.article-main-content');
        const summaryParagraph = mainContent.querySelector('p.text-xl');
        summaryParagraph.textContent = article.accroche;

        // Sélectionner le conteneur du contenu dynamique (après la balise d'accroche)
        let insertionPoint = summaryParagraph;

        // Effacer le contenu dynamique statique existant (tout ce qui est entre l'accroche et les mots-clés)
        // Nous allons insérer le nouveau contenu juste après le paragraphe d'accroche (summaryParagraph).
        // Le code HTML statique entre l'accroche et les mots-clés doit être supprimé pour éviter la duplication.
        // Puisque le modèle est bien structuré, on se base sur le dernier élément créé pour insérer le suivant.
        
        // Retirer les éléments entre l'accroche et le bloc de mots-clés/auteur. 
        // L'implémentation est complexe à faire sans dénaturer le code d'origine,
        // donc nous allons simplement réécrire le contenu principal en utilisant l'insertionpoint.
        // NOTE: Dans un vrai projet, il faudrait rendre ces blocs de contenu statiques optionnels ou les retirer du HTML.
        
        // Solution simple : injecter tout le contenu dynamique
        article.contenu.forEach(item => {
            let element;
            
            if (item.type === 'h2') {
                element = document.createElement('h2');
                element.setAttribute('data-aos', 'fade-up');
                element.textContent = item.text;
            } else if (item.type === 'h3') {
                element = document.createElement('h3');
                element.setAttribute('data-aos', 'fade-up');
                element.textContent = item.text;
            } else if (item.type === 'p') {
                element = document.createElement('p');
                element.setAttribute('data-aos', 'fade-up');
                element.innerHTML = item.text; // Utilisation de innerHTML pour les balises <b> comme "moteur"
            } else if (item.type === 'blockquote') {
                element = document.createElement('blockquote');
                element.setAttribute('data-aos', 'zoom-in');
                element.className = "p-4 my-6 bg-red-100 border-l-4 border-red-700 text-gray-800 italic rounded-md";
                element.textContent = item.text;
            } else if (item.type === 'ul') {
                element = document.createElement('ul');
                item.items.forEach(listItemText => {
                    const li = document.createElement('li');
                    li.setAttribute('data-aos', 'fade-up');
                    li.textContent = listItemText;
                    element.appendChild(li);
                });
            }
            
            if (element) {
                 // Insérer le nouvel élément après le dernier point d'insertion
                 insertionPoint.insertAdjacentElement('afterend', element);
                 insertionPoint = element; // Le nouvel élément devient le point d'insertion suivant
            }
        });
        
        // --- 4. Mise à jour des Mots-Clés
        const keywordsContainer = document.querySelector('.flex.flex-wrap.gap-2');
        if (keywordsContainer) {
            keywordsContainer.innerHTML = '';
            article.motsCles.forEach(keyword => {
                const span = document.createElement('span');
                span.className = "text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200";
                span.textContent = `# ${keyword}`;
                keywordsContainer.appendChild(span);
            });
        }
        
        // Re-initialiser AOS pour que les nouvelles balises aient les animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    
    function updateSidebarLinks() {
        // Exemples de mise à jour des liens "Articles Similaires"
        const similarArticleLinks = document.querySelectorAll('.lg\\:col-span-1 ul a');
        
        // Le premier lien pointe vers le deuxième article simulé
        if (similarArticleLinks.length > 0) {
            // Le nom de la page detail est 'blog.html' d'après votre structure
            similarArticleLinks[0].href = 'blog.html?id=creer-identite-visuelle'; 
            
            // Les autres liens pourraient être mis à jour de la même manière (si les données existent)
            // similarArticleLinks[1].href = 'blog.html?id=secrets-social-media';
            // similarArticleLinks[2].href = 'blog.html?id=formation-adobe';
        }

        // Le lien "Voir tous les articles de Sophie"
        const authorLink = document.querySelector('.mt-12.p-6 a');
        if (authorLink) {
            authorLink.href = `blog.html?auteur=${articleToLoad.auteur.replace(' ', '-')}`;
        }
    }
});

// Lors d'appui sur Entrée dans la barre de recherche, défiler vers la section des articles
document.addEventListener('DOMContentLoaded', () => {
    const searchEl = document.getElementById('searchInput');
    const articlesTitle = document.getElementById('latest-articles-title') || document.querySelector('.container');

    if (!searchEl || !articlesTitle) return;

    searchEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            // Empêcher un éventuel comportement par défaut
            e.preventDefault();

            // Défilement fluide long vers le titre des articles (durée 1000ms)
            smoothScrollTo(articlesTitle, 1000, 'start');

            // Après le défilement, mettre le focus sur le premier article visible (si présent)
            setTimeout(() => {
                const firstVisible = Array.from(document.querySelectorAll('.blog-card'))
                    .find(card => window.getComputedStyle(card).display !== 'none' && !card.classList.contains('hidden'));
                if (firstVisible) smoothScrollTo(firstVisible, 1000, 'center');
            }, 500);
        }
    });
});

// --- Compteur dynamique des articles
// Met à jour le contenu de l'élément `#articles-count` avec le nombre d'articles visibles
window.updateArticlesCount = function() {
    const countEl = document.getElementById('articles-count');
    if (!countEl) return;

    const cards = document.querySelectorAll('.blog-card');
    let visible = 0;

    cards.forEach(c => {
        // offsetParent === null si display: none ou si élément non rendu
        const isHiddenByClass = c.classList.contains('hidden');
        const isDisplayNone = window.getComputedStyle(c).display === 'none';
        if (!isHiddenByClass && !isDisplayNone && c.offsetParent !== null) {
            visible += 1;
        }
    });

    countEl.textContent = visible;
};

// Appeler au chargement et lors d'interactions utilisateur (recherche / filtres)
document.addEventListener('DOMContentLoaded', () => {
    window.updateArticlesCount();
});

// Met à jour aussi lors d'une saisie ou d'un clic (permet de couvrir les filtres et la recherche)
document.addEventListener('input', () => {
    // petit délai pour laisser les handlers de filtrage s'exécuter
    setTimeout(window.updateArticlesCount, 40);
});
document.addEventListener('click', () => {
    setTimeout(window.updateArticlesCount, 40);
});

// Fonction utilitaire : défilement animé custom pour contrôler la durée
function smoothScrollTo(el, duration = 1000, block = 'start') {
    if (!el) return;

    // Calculer la position cible en tenant compte d'un header fixe éventuel
    const rect = el.getBoundingClientRect();
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    let targetY;
    if (block === 'center') {
        targetY = window.pageYOffset + rect.top + (rect.height / 2) - (window.innerHeight / 2) - headerHeight;
    } else { // 'start' ou par défaut
        targetY = window.pageYOffset + rect.top - headerHeight - 16;
    }

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);
        window.scrollTo(0, Math.round(startY + (distance * eased)));
        if (elapsed < duration) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}