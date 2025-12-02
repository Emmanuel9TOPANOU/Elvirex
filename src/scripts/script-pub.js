
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionnez TOUS les boutons de détails
    const detailButtons = document.querySelectorAll('.detail-button');

    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            
            // Empêche l'événement de se propager aux conteneurs parents (comme la carte entière)
            event.stopPropagation(); 
            
            const partnerId = event.currentTarget.getAttribute('data-partner-id');
            
            if (partnerId) {
                // 1. Stocker l'ID dans le localStorage (Ceci est correct)
                localStorage.setItem('selectedPartnerId', partnerId);
                
                // 2. CORRECTION CLÉ : Rediriger vers la page de détails
                window.location.href = 'details.patner.html'; // CHANGEMENT ICI
            } else {
                console.error("Erreur: Le bouton cliqué n'a pas d'attribut data-partner-id.");
            }
        });
    });

   
});