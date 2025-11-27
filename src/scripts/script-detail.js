/**
 * JavaScript pour récupérer l'ID de l'URL et afficher les détails du partenaire.
 */

// --- SIMULATION DE BASE DE DONNÉES ---
// Dans une application réelle, ces données seraient chargées depuis une API ou un fichier JSON.
const partnerData = {
    "partenaire-1": {
        title: "Automobile & Mécanique",
        image: "src/assets/images/Elvi_33.jpg",
        description: "Garage automobile professionnel. Réparation, entretien et diagnostic de tous les types de véhicules.",

    },
    "partenaire-2": {
        title: "Technologies & IT",
        image: "src/assets/images/Elvi_39.jpg",
        description: "Solutions informatiques innovantes pour entreprises modernes. Installation, maintenance, etc.",

    },
    "partenaire-3": {
        title: "Restauration & gastronomie",
        image: "src/assets/images/Elvi_36.jpg",
        description: "Restaurant gastronomique proposant une cuisine Béninoise authentique et des plats...",

    },
    "partenaire-4": {
        title: "Mode & Habillement",
        image: "src/assets/images/Elvi_35.jpg",
        description: "Boutique de mode proposant vêtements tendance, accessoires et créations sur-mesure pour femmes...",

    },
    "partenaire-5": {
        title: "Agriculture & Agroalimentaire",
        image: "src/assets/images/Elvi_41.jpg",
        description: "Production et distribution de produits agricoles biologiques. Fruits, légumes et céréales de ...",

    },
    "partenaire-6": {
        title: "Santé & Bien-être",
        image: "src/assets/images/Elvi_38.jpg",
        description: "Centre de remise en forme moderne. Fitness, yoga, coaching personnalisé et programmes de...",

    },



};
// ------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtenez les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get('id'); // Récupère la valeur du paramètre 'id'

    // 2. Vérifiez si un ID est présent
    if (partnerId) {
        // 3. Trouvez les données du partenaire
        const data = partnerData[partnerId];

        // 4. Mettez à jour le contenu de la page
        if (data) {
            document.getElementById('partner-title').textContent = data.title;
            document.getElementById('partner-description').textContent = data.description;

            const imageElement = document.getElementById('partner-image');
            if (imageElement) {
                imageElement.src = data.image;
                imageElement.alt = data.title;
            }

            // Optionnel : Afficher un message de contact
            const container = document.getElementById('partner-details-container');
            if (container && data.contact) {
                container.innerHTML += `<p>Contact : <a href="mailto:${data.contact}">${data.contact}</a></p>`;
            }

        } else {
            // Cas où l'ID est dans l'URL mais la donnée n'est pas trouvée
            document.getElementById('partner-details-container').innerHTML = `
                <h1 class="text-red-500">Erreur de chargement</h1>
                <p>Aucun détail trouvé pour l'identifiant: ${partnerId}.</p>
            `;
        }
    } else {
        // Cas où aucun ID n'a été passé dans l'URL
        document.getElementById('partner-details-container').innerHTML = `
            <h1>Sélectionnez un partenaire</h1>
            <p>Veuillez revenir à la <a href="espace-pubs.html">page des publicités</a> pour sélectionner une carte.</p>
        `;
    }
});