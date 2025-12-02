/**
 * Fichier : js/article-loader.js
 * Description : Gestion dynamique du contenu de la page article-detail.html
 * en fonction du paramètre 'id' dans l'URL.
 */

// Définir les données de tous vos articles dans un objet JavaScript
const ARTICLES_DATA = {
    'visuelle': {
        title: "Comment créer une identité visuelle forte",
        author: "Marc Dubois",
        date: "10 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Communication",
        content: `
            <p>L'identité visuelle est bien plus qu'un simple logo. C'est l'ensemble des éléments graphiques qui définissent votre marque et la rendent reconnaissable. Une identité forte garantit la <strong>cohérence</strong> et la <strong>mémorabilité</strong> de votre présence.</p>
            <h2>Les piliers de votre identité</h2>
            <p>Le processus commence par la définition de votre charte graphique, qui inclut la palette de couleurs, les typographies, et le style iconographique.</p>
            <ul>
                <li><strong>Le Logo :</strong> La pierre angulaire, il doit être simple et déclinable.</li>
                <li><strong>Les Couleurs :</strong> Elles évoquent des émotions et doivent correspondre à votre secteur.</li>
                <li><strong>La Typographie :</strong> Elle renforce le ton de votre communication (sérieux, créatif, moderne).</li>
            </ul>
            <p>Assurez-vous que tous vos supports (site web, cartes de visite, réseaux sociaux) respectent cette charte pour bâtir une marque solide.</p>
        `
    },
    'adobe': {
        title: "Formation : maîtriser Adobe Creative Suite",
        author: "Marc Dubois",
        date: "1 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Formations",
        content: `
            <p>Notre formation complète vous offre les compétences essentielles pour devenir un expert de la suite Adobe, indispensable pour tout professionnel du design et du marketing.</p>
            <h2>Modules clés</h2>
            <p>Le programme couvre les logiciels phares avec des exercices pratiques :</p>
            <ol>
                <li><strong>Adobe Photoshop :</strong> Retouche photo professionnelle et création de compositions.</li>
                <li><strong>Adobe Illustrator :</strong> Conception de logos, illustrations vectorielles et infographies.</li>
                <li><strong>Adobe InDesign :</strong> Mise en page de documents complexes (magazines, brochures, e-books).</li>
            </ol>
            <p>Inscrivez-vous dès aujourd'hui pour transformer vos idées en créations visuelles de haute qualité.</p>
        `
    },
    'socialmedia': {
        title: "Les secrets d'une stratégie social media réussie",
        author: "Julie Martin",
        date: "5 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Digital",
        content: `
            <p>Une stratégie social media efficace ne se limite pas à poster du contenu. Elle exige de la planification, de l'analyse et un engagement constant avec votre communauté.</p>
            <h2>Étapes de la stratégie</h2>
            <p>Pour générer de l'engagement et des leads, suivez ces principes :</p>
            <ul>
                <li><strong>Cible :</strong> Définissez précisément votre audience et les plateformes qu'elle utilise.</li>
                <li><strong>Contenu :</strong> Créez des formats variés (vidéos, carrousels, sondages) qui apportent de la valeur.</li>
                <li><strong>Calendrier :</strong> Maintenez une fréquence de publication régulière et optimisée.</li>
            </ul>
            <p>N'oubliez pas d'analyser vos performances pour ajuster constamment votre approche et maximiser votre retour sur investissement.</p>
        `
    },
    'tendances2025': {
        title: "10 tendances du marketing digital en 2025",
        author: "Sophie Laurent",
        date: "15 octobre 2025",
        image: "src/assets/images/Elvi_14.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Tendances",
        content: `
            <p>L'année 2025 sera marquée par une accélération de l'intégration de l'intelligence artificielle (IA) et une focalisation sur l'authenticité et la conversation.</p>
            <h2>Tendances Clés à Adopter</h2>
            <ol>
                <li><strong>IA Générative et Contenu :</strong> Utilisation d'outils comme ChatGPT et Midjourney pour la création rapide de brouillons et d'éléments visuels.</li>
                <li><strong>Marketing Conversationnel :</strong> Les chatbots avancés et les messageries privées (WhatsApp, Instagram DM) deviennent des canaux de vente primaires.</li>
                <li><strong>Personnalisation Avancée :</strong> Aller au-delà du simple nom, pour offrir des expériences de navigation et d'achat uniques basées sur le comportement réel.</li>
                <li><strong>SEO Évolué :</strong> L'optimisation pour la recherche vocale et les résumés générés par l'IA (SGE) devient cruciale.</li>
            </ol>
            <p>Adopter ces tendances vous permettra de maintenir votre pertinence et d'atteindre vos objectifs de croissance dans un paysage numérique en constante mutation.</p>
        `
    },
    'seolocal': {
        title: "Les 5 clés pour optimiser votre SEO local",
        author: "Marc Dubois",
        date: "10 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Tendances",
        content: `
            <p>Le SEO local est vital pour les entreprises ayant une présence physique. Il s'agit d'optimiser votre visibilité pour les recherches géolocalisées.</p>
            <h2>5 étapes pour dominer le local</h2>
            <ol>
                <li><strong>Google My Business :</strong> Remplissez intégralement et mettez à jour régulièrement votre fiche. C'est l'élément le plus important.</li>
                <li><strong>Citations locales :</strong> Assurez-vous d'avoir des mentions (NAP: Nom, Adresse, Téléphone) cohérentes sur les annuaires spécialisés.</li>
                <li><strong>Avis clients :</strong> Encouragez vos clients satisfaits à laisser des avis et répondez à tous, qu'ils soient positifs ou négatifs.</li>
                <li><strong>Mots-clés locaux :</strong> Intégrez des termes géographiques dans le contenu de votre site (ex: "meilleur café Paris 10e").</li>
                <li><strong>Optimisation mobile :</strong> La majorité des recherches locales se font sur mobile, votre site doit être parfaitement réactif.</li>
            </ol>
            <p>En vous concentrant sur ces cinq points, vous améliorerez significativement votre classement dans le "pack local" de Google Maps.</p>
        `
    },
    'uxui': {
        title: "Les erreurs à éviter dans votre stratégie UX/UI",
        author: "Marc Dubois",
        date: "1 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Digital",
        content: `
            <p>L'UX (Expérience Utilisateur) et l'UI (Interface Utilisateur) sont cruciales pour le succès d'une application ou d'un site. Éviter ces erreurs garantit une meilleure rétention.</p>
            <h2>Pièges courants en UX/UI</h2>
            <ul>
                <li><strong>Surcharge cognitive :</strong> Trop d'informations, trop de couleurs ou trop d'animations rend le site difficile à utiliser.</li>
                <li><strong>Incohérence :</strong> Utiliser des styles de boutons ou des typographies différents sur plusieurs pages crée de la confusion.</li>
                <li><strong>Mauvaise hiérarchie :</strong> Le manque de structure visuelle claire empêche l'utilisateur d'identifier rapidement les informations importantes.</li>
                <li><strong>Non-accessibilité :</strong> Ignorer les normes WCAG (contraste insuffisant, taille de police trop petite) exclut une partie de votre audience.</li>
            </ul>
            <p>Priorisez toujours la **simplicité**, la **cohérence** et l'**accessibilité** dans vos conceptions.</p>
        `
    },
    'storytelling': {
        title: "Le Storytelling : l'art de captiver votre audience",
        author: "Julie Martin",
        date: "5 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Communication",
        content: `
            <p>Le storytelling est la méthode la plus puissante pour humaniser votre marque et créer un lien émotionnel durable avec votre audience. Les faits racontent, les histoires vendent.</p>
            <h2>Comment construire un récit de marque</h2>
            <p>Un bon récit de marque suit une structure classique :</p>
            <ol>
                <li><strong>Le Héros (votre client) :</strong> Identifiez son problème ou son aspiration.</li>
                <li><strong>Le Défi :</strong> L'obstacle qu'il doit surmonter.</li>
                <li><strong>Le Mentor (votre marque) :</strong> Comment votre produit ou service l'aide à réussir.</li>
                <li><strong>La Victoire :</strong> Le succès que votre client obtient grâce à vous.</li>
            </ol>
            <p>En positionnant votre client comme le héros et non votre produit, vous rendez votre histoire pertinente et mémorable.</p>
        `
    },
    'lancementproduit': {
        title: "Formation : planifier un lancement de produit réussi",
        author: "Marc Dubois",
        date: "10 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Formations",
        content: `
            <p>Un lancement de produit réussi exige une coordination parfaite entre le développement, le marketing et la vente. Cette formation couvre la méthode "4 P" (Produit, Prix, Place, Promotion).</p>
            <h2>Phases clés du lancement</h2>
            <ul>
                <li><strong>Pré-lancement (Teasing) :</strong> Créer de l'attente et identifier les premiers ambassadeurs.</li>
                <li><strong>Jour du lancement (D-Day) :</strong> Assurer une expérience d'achat fluide et coordonner la communication.</li>
                <li><strong>Post-lancement :</strong> Recueillir les retours (feedback), gérer les avis clients et effectuer des optimisations continues.</li>
            </ul>
            <p>Une bonne planification réduit le risque d'échec et maximise l'impact initial sur le marché.</p>
        `
    },
    'cybersecurite': {
        title: "Protéger votre activité : les bases de la cybersécurité",
        author: "Marc Dubois",
        date: "1 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Digital",
        content: `
            <p>La cybersécurité n'est plus l'apanage des grandes entreprises. Chaque PME doit mettre en place des défenses de base pour prévenir les pertes de données et les interruptions d'activité.</p>
            <h2>Bonnes pratiques essentielles</h2>
            <ol>
                <li><strong>Mots de passe forts :</strong> Utilisez des combinaisons complexes et changez-les régulièrement.</li>
                <li><strong>Authentification Multi-Facteurs (MFA) :</strong> Activez-la partout où c'est possible pour une couche de sécurité supplémentaire.</li>
                <li><strong>Sauvegarde régulière :</strong> Assurez-vous que toutes les données critiques sont sauvegardées hors ligne (ou dans le cloud) pour une reprise rapide après incident.</li>
                <li><strong>Sensibilisation des employés :</strong> Formez votre personnel à identifier les tentatives de phishing et autres menaces.</li>
            </ol>
            <p>Investir dans la sécurité, c'est investir dans la pérennité de votre entreprise.</p>
        `
    },
    'mailmarketing': {
        title: "Le Mail Marketing : maximiser le taux d'ouverture",
        author: "Julie Martin",
        date: "5 octobre 2025",
        image: "src/assets/images/Elvi_17.jpg", // Cette image sera utilisée pour l'<img> du corps
        categoryDisplay: "Communication",
        content: `
            <p>Malgré l'essor des réseaux sociaux, le mail marketing reste l'un des canaux les plus rentables (ROI élevé). L'enjeu majeur est de faire ouvrir l'email.</p>
            <h2>Techniques pour un meilleur taux d'ouverture</h2>
            <ul>
                <li><strong>Objet personnalisé :</strong> Intégrez le nom de l'abonné ou référencez son historique d'achat.</li>
                <li><strong>Aperçu du texte (Preheader) :</strong> Utilisez cette ligne pour compléter l'objet et donner envie de cliquer.</li>
                <li><strong>Nettoyage de liste :</strong> Supprimez les adresses inactives pour améliorer votre réputation d'expéditeur et éviter les spams.</li>
                <li><strong>Segmentation :</strong> Envoyez le bon contenu à la bonne personne en fonction de ses centres d'intérêt.</li>
            </ul>
            <p>Un taux d'ouverture élevé est le premier pas vers un meilleur engagement et une augmentation des conversions.</p>
        `
    }
};

function loadArticleContent() {
    // 1. Lire le paramètre 'id' de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    // 2. Récupérer les données de l'article
    const article = ARTICLES_DATA[articleId];

    // 3. Gestion d'erreur (Article non trouvé)
    if (!article) {
        document.getElementById('detail-title').textContent = "Erreur 404 : Article non trouvé";
        document.getElementById('detail-category').textContent = "ERREUR";
        document.getElementById('detail-author').innerHTML = `<i class="ph ph-user-circle mr-2"></i> Inconnu`;
        document.getElementById('detail-date').innerHTML = `<i class="ph ph-calendar-blank mr-2"></i> --/--/----`;
        
        // Pas de changement d'image de fond pour la Hero Section, elle est statique
        
        // Injecter le message d'erreur dans le corps
        const articleContentDiv = document.getElementById('article-content');
        if (articleContentDiv) {
            articleContentDiv.innerHTML = '<p class="text-xl text-red-700 mt-8">Désolé, l\'identifiant de l\'article est incorrect ou l\'article n\'existe plus.</p>';
        }

        // Cacher l'image du corps si l'article n'est pas trouvé
        const articleImageElement = document.getElementById('article-image');
        if (articleImageElement) {
            articleImageElement.style.display = 'none'; // Masquer l'image
        }
        return;
    }

    // 4. Injection du contenu dans la HERO SECTION (les IDs restent les mêmes pour les textes)
    
    // La Hero Section est statique, donc pas de modification de l'image de fond ici.
    
    // Met à jour la catégorie
    document.getElementById('detail-category').textContent = article.categoryDisplay.toUpperCase();

    // Met à jour le titre
    document.getElementById('detail-title').textContent = article.title;
    
    // Met à jour l'auteur (avec icône)
    document.getElementById('detail-author').innerHTML = `<i class="ph ph-user-circle mr-2"></i> ${article.author}`;

    // Met à jour la date (avec icône)
    document.getElementById('detail-date').innerHTML = `<i class="ph ph-calendar-blank mr-2"></i> ${article.date}`;


    // 5. Injection du contenu dans le corps de l'article (maintenant avec l'image)
    
    // Injecte l'image spécifique de l'article dans la balise <img> du corps
    const articleImageElement = document.getElementById('article-image');
    if (articleImageElement) {
        articleImageElement.src = article.image; 
        articleImageElement.style.display = 'block'; // S'assurer qu'elle est visible si elle a été masquée par une erreur
    }

    const articleContentDiv = document.getElementById('article-content');
    if (articleContentDiv) {
        articleContentDiv.innerHTML = article.content;
    }
    


}




// Lancer la fonction au chargement de la page
window.onload = loadArticleContent;