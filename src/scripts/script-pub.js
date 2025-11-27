/**
 * JavaScript pour gérer le clic sur une carte et rediriger vers la page de détails.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélectionnez toutes les cartes avec la classe 'partner-card'
    const cards = document.querySelectorAll('.partner-card');

    cards.forEach(card => {
        // 2. Ajoutez un écouteur d'événement pour le clic
        card.addEventListener('click', (event) => {
            
            // 3. Récupérez l'identifiant unique à partir de l'attribut 'data-id'
            const partnerId = card.getAttribute('data-id');
            
            if (partnerId) {
                // 4. Créez l'URL de la page de détails en ajoutant l'ID comme paramètre
                // Exemple d'URL : details.patner.html?id=partenaire-123
                const detailPageUrl = `details.patner.html?id=${encodeURIComponent(partnerId)}`;
                
                // 5. Redirigez l'utilisateur
                window.location.href = detailPageUrl;
            } else {
                console.error("Erreur: La carte cliquée n'a pas d'attribut data-id.");
            }
        });
    });
});


/**
 * JavaScript pour gérer le clic sur le bouton "Voir les détails" et rediriger.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélectionnez TOUS les boutons de détails
    const detailButtons = document.querySelectorAll('.detail-button');

    detailButtons.forEach(button => {
        // 2. Ajoutez un écouteur d'événement pour le clic
        button.addEventListener('click', (event) => {
            
            // Empêche l'événement de se propager au conteneur parent (la carte), 
            // si vous aviez encore un écouteur sur la carte elle-même.
            event.stopPropagation(); 
            
            // 3. Récupérez l'identifiant unique à partir de l'attribut 'data-partner-id' du bouton
            const partnerId = button.getAttribute('data-partner-id');
            
            if (partnerId) {
                // 4. Créez l'URL de la page de détails en ajoutant l'ID comme paramètre
                const detailPageUrl = `details.patner.html?id=${encodeURIComponent(partnerId)}`;
                
                // 5. Redirigez l'utilisateur
                window.location.href = detailPageUrl;
            } else {
                console.error("Erreur: Le bouton cliqué n'a pas d'attribut data-partner-id.");
            }
        });
    });
});