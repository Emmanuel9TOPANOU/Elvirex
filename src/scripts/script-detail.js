
    
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuration de base et nettoyage de l'ID
    const partnerId = localStorage.getItem('selectedPartnerId')?.trim().toLowerCase();
    const dynamicContentContainer = document.getElementById('dynamic-content');

    if (!partnerId || !dynamicContentContainer) {
        // Afficher un message d'erreur et arrêter si l'ID n'est pas trouvé
        const staticContent = document.getElementById('partner-details-container');
        if (staticContent) {
            staticContent.innerHTML = '<div class="text-center p-10 text-white">Erreur : ID partenaire introuvable.</div>';
        }
        return;
    }

    // --- 2. Définition des données de tous les partenaires ---
    const partnersData = {
        'partenaire-1': {
            title: 'AutoExpert Cotonou',
            category: 'Automobile & Mécanique',
            description: 'AutoExpert Cotonou est le garage leader pour l’entretien et la réparation de véhicules. Notre expertise de 15 ans et notre clientèle de plus de 2000 personnes garantissent un service de haute qualité. Nous prenons en charge le diagnostic électronique, la révision complète et les réparations mécaniques complexes.',
            clients: '2000 +',
            experience: '15 ans',
            rating: '4.9/5',
            image: 'src/assets/images/Elvi_33.jpg',
            envImages: ['src/assets/images/garage_env1.jpg', 'src/assets/images/garage_env2.jpg', 'src/assets/images/garage_env3.jpg'],
            services: [
                'Diagnostic électronique et réparation',
                'Entretien et vidange complets',
                'Réparation mécanique et carrosserie',
                'Pneumatiques et géométrie',
                'Diagnostic Électronique et Réparation de Pannes Complexes',
                'Réparation et Entretien des Systèmes de Climatisation'
            ],
            contact: {
                whatsapp: '‪+229 0197234567‬', 
                location: 'Cotonou, Bénin',
                hours: ['Lun-Sam : 7h30 à 18h'],
                email: 'contact@autoexpert.bj'
            }
        },
        'partenaire-2': {
            title: 'TechSolutions Bénin',
            category: 'Technologies & IT',
            description: 'TechSolutions Bénin est votre partenaire de confiance pour tous vos besoins en technologie de l’information. Nous offrons des solutions complètes allant de l’installation de réseaux informatiques à la cybersécurité, en passant par le cloud computing et la transformation digitale de votre entreprise.',
            clients: '150 +',
            experience: '10 ans',
            rating: '4.8/5',
            image: 'src/assets/images/Elvi_39.jpg',
            envImages: ['src/assets/images/Elvi_40.jpg', 'src/assets/images/Elvi_40.jpg', 'src/assets/images/Elvi_40.jpg'],
            services: [
                'Installation et configuration de réseaux d’entreprise',
                'Solutions et cybersécurité avancées',
                'Consulting IT et transformation digitale',
                'Cloud computing et migration de données',
                'Serveurs et infrastructures réseaux',
                'Maintenance informatique préventive et corrective'
            ],
            contact: {
                whatsapp: '‪+229 60854321‬',
                location: 'Cotonou, Bénin',
                hours: ['Lun-Ven : 8h à 18h30', 'Sam-Dim : Fermé'],
                email: 'info@techsolutions.bj' 
            }
        },
        'partenaire-3': {
            title: 'Saveurs du Bénin',
            category: 'Restauration & gastronomie',
            description: 'Restaurant gastronomique proposant une cuisine Béninoise authentique et des plats raffinés. Nous mettons en avant les produits locaux et une ambiance chaleureuse pour une expérience culinaire inoubliable.',
            clients: '500 +',
            experience: '5 ans',
            rating: '4.7/5',
            image: 'src/assets/images/Elvi_36.jpg',
            envImages: ['src/assets/images/resto_int1.jpg', 'src/assets/images/resto_int2.jpg', 'src/assets/images/resto_int3.jpg'],
            services: [
                'Dégustation sur place',
                'Service traiteur pour événements',
                'Cours de cuisine béninoise',
                'Réservation en ligne',
                'Menus Dégustation Thématiques et Accords Mets & Vins/Boissons Locales',
                'Cours de Cuisine Béninoise Traditionnelle et Moderne'
            ],
            contact: {
                whatsapp: '‪+229 97654321‬', 
                location: 'Cotonou, Bénin',
                hours: ['Mar-Dim : 12h à 22h', 'Lun : Fermé'],
                email: 'contact@saveursdubenin.bj'
            }
        },
         'partenaire-4': {
            title: 'Élégance Mode',
            category: 'Mode & Habillement',
            description: 'Boutique de mode proposant vêtements tendance, accessoires et créations sur-mesure pour femmes...',
            clients: '500 +',
            experience: '5 ans',
            rating: '4.7/5',
            image: 'src/assets/images/Elvi_35.jpg',
            envImages: ['src/assets/images/resto_int1.jpg', 'src/assets/images/resto_int2.jpg', 'src/assets/images/resto_int3.jpg'],
            services: [
                'Conseil en Image & Stylisme Personnalisé',
                'Service de Retouches et de Ajustements sur Mesure',
                'Ateliers Mode et Tendances (Masterclass)',
                'Conception de Pièces Uniques/Sur-Mesure',
                'Location de Tenues de Cérémonie et de Luxe',
                'E-Stylisme et Personal Shopping à Distance'
            ],
            contact: {
                whatsapp: '‪+229 97654321‬', 
                location: 'Cotonou, Bénin',
                hours: ['Mar-Dim : 12h à 22h', 'Lun : Fermé'],
                email: 'contact@élégancemodubenin.bj'
            }
        },
         'partenaire-5': {
            title: 'BeninAgro Services',
            category: 'Agriculture & Agroalimentaire',
            description: 'Production et distribution de produits agricoles biologiques. Fruits, légumes et céréales de ..',
            clients: '500 +',
            experience: '5 ans',
            rating: '4.7/5',
            image: 'src/assets/images/Elvi_41.jpg',
            envImages: ['src/assets/images/resto_int1.jpg', 'src/assets/images/resto_int2.jpg', 'src/assets/images/resto_int3.jpg'],
            services: [
                'Conseil Agronomique et Suivi de Cultures Biologiques',
                'Fourniture des Intrants Agricoles de Qualité Certifiée',
                'Service de Transformation et de Valorisation des Produits',
                'Location et Maintenance des Équipements Agricoles Modernes',
                'Plateforme de Logistique et de Distribution en Circuit Court',
                'Formation Professionnelle en Gestion Agricole et Financière'
            ],
            contact: {
                whatsapp: '‪+229 97654321‬', 
                location: 'Cotonou, Bénin',
                hours: ['Mar-Dim : 12h à 22h', 'Lun : Fermé'],
                email: 'contact@beninagroservicedubenin.bj'
            }
        },
         'partenaire-6': {
            title: 'Centre de bien être',
            category: 'Santé & Bien-être',
            description: 'Centre de remise en forme moderne. Fitness, yoga, coaching personnalisé et programmes de.....',
            clients: '500 +',
            experience: '5 ans',
            rating: '4.7/5',
            image: 'src/assets/images/Elvi_38.jpg',
            envImages: ['src/assets/images/resto_int1.jpg', 'src/assets/images/resto_int2.jpg', 'src/assets/images/resto_int3.jpg'],
            services: [
                'Programmes de Fitness Personnalisés et Coaching',
                'Cours Collectifs Esprit-Corps (Yoga, Pilates, Méditation)',
                'Soins de Relaxation et Massages Thérapeutiques',
                'Consultations en Nutrition et Diététique',
                'Hydrothérapie et Thermothérapie (Sauna, Hammam, Bains Froids)',
                'Ateliers de Gestion du Stress et du Sommeil'
            ],
            contact: {
                whatsapp: '‪+229 97654321‬', 
                location: 'Cotonou, Bénin',
                hours: ['Mar-Dim : 12h à 22h', 'Lun : Fermé'],
                email: 'contact@centredebienetredubenin.bj'
            }
        },
        
    };

    const partner = partnersData[partnerId];

    if (!partner) {
        dynamicContentContainer.innerHTML = '<div class="text-center p-10 text-gray-800">Désolé, les détails pour ce partenaire ne sont pas encore disponibles.</div>';
        return;
    }

    // --- 3. Mise à jour des éléments de la Première Section (statique) ---
    // Cette partie assure que les données affichées correspondent au partenaire chargé.
    const partnerImage = document.getElementById('partner-image');
    if (partnerImage) partnerImage.src = partner.image;
    
    const partnerTitleMain = document.getElementById('partner-title-main');
    if (partnerTitleMain) partnerTitleMain.textContent = partner.title;
    
    const partnerCategory = document.getElementById('partner-category');
    if (partnerCategory) partnerCategory.textContent = partner.category;

    const partnerDescriptionShort = document.getElementById('partner-description-short');
    if (partnerDescriptionShort) partnerDescriptionShort.textContent = 
        (partner.description.length > 100 ? partner.description.substring(0, 100) + '...' : partner.description);

    const partnerRating = document.getElementById('partner-rating');
    if (partnerRating) partnerRating.textContent = partner.rating;

    const partnerClientsCount = document.getElementById('partner-clients-count');
    if (partnerClientsCount) partnerClientsCount.textContent = partner.clients;

    const partnerExperienceYears = document.getElementById('partner-experience-years');
    if (partnerExperienceYears) partnerExperienceYears.textContent = partner.experience;

    // Mise à jour du lien WhatsApp dans l'en-tête (nettoyage du numéro : supprime tous les non-chiffres)
    const waButtonHeader = document.getElementById('contact-whatsapp-header');
    if (waButtonHeader) {
        waButtonHeader.href = `https://wa.me/${partner.contact.whatsapp.replace(/\D/g, '')}`;
    }

    // --- 4. Construction dynamique du contenu HTML (Sections 2 et 3) ---
    
    // Services
    const servicesHtml = partner.services.map(service => `
        <div class="p-5 rounded-xl bg-white shadow hover:shadow-lg transition">
            <div class="w-10 h-10 rounded-md bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-white font-bold mb-3">
                <i class="ph ph-check-circle"></i>
            </div>
            <h4 class="text-black font-semibold">${service}</h4>
        </div>
    `).join('');

    // Images d'environnement
    const envImagesHtml = partner.envImages.map(imgSrc => `
        <img src="${imgSrc}" alt="Environnement de ${partner.title}"
            class="rounded-xl w-full h-52 object-cover shadow">
    `).join('');

    // Horaires (gestion des lignes multiples)
    const hoursDetail = partner.contact.hours.map((h, index) => 
        // Seule la première ligne n'a pas la classe text-sm si plusieurs lignes existent
        `<p class="text-gray-800${partner.contact.hours.length > 1 && index > 0 ? ' text-sm' : ''}">${h}</p>`).join('');


    // Contact
    const contactHtml = `
        <div class="grid md:grid-cols-2 gap-6">
            <div class="p-4 rounded-lg flex items-start gap-4">
                <div class="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    <i class="ph ph-whatsapp-logo text-lg text-[#E5B420]"></i>
                </div>
                <div>
                    <p class="text-gray-600 font-semibold text-sm">Whatsapp</p>
                    <p class="text-gray-800">${partner.contact.whatsapp}</p>
                </div>
            </div>

            <div class="p-4 rounded-lg flex items-start gap-4 ">
                <div class="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    <i class="ph ph-map-pin text-lg text-[#CA161A]"></i>
                </div>
                <div>
                    <p class="text-gray-600 font-semibold text-sm">Localisation</p>
                    <p class="text-gray-800">${partner.contact.location}</p>
                </div>
            </div>

            <div class="p-4 rounded-lg flex items-start gap-4 ">
                <div class="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    <i class="ph ph-clock text-lg text-[#E5B420]"></i>
                </div>
                <div>
                    <p class="text-gray-600 font-semibold text-sm">Horaires</p>
                    ${hoursDetail}
                </div>
            </div>

            <div class="p-4 rounded-lg flex items-start gap-4">
                <div class="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    <i class="ph ph-envelope-simple text-lg text-[#CA161A]"></i>
                </div>
                <div>
                    <p class="text-gray-600 font-semibold text-sm">Email</p>
                    <p class="text-gray-800">${partner.contact.email}</p>
                </div>
            </div>
        </div>

        <hr class="my-6 border-gray-100">

        <a href="https://wa.me/${partner.contact.whatsapp.replace(/\D/g, '')}" target="_blank"
            class="mt-4 w-full inline-flex items-center justify-center py-3 rounded-xl text-1xl bg-gradient-to-r from-red-600 to-orange-400 text-white font-semibold shadow-lg shadow-orange-300/50 hover:opacity-90 transition duration-300">
            <i class="ph ph-whatsapp-logo text-1xl mr-2"></i> Contacter ${partner.title} sur WhatsApp
        </a>

        <p class="text-xs text-gray-500 text-center mt-2">Cliquez pour démarrer une conversation directe</p>
    `;

    // Avantages (pour la dernière section)
    const advantagesHtml = `
        <div class="grid md:grid-cols-3 gap-10">

            <div class="flex flex-col items-center">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                    <i class="ph ph-medal"></i>
                </div>
                <h4 class="mt-3 font-semibold text-black">Expertise reconnue</h4>
                <p class="text-gray-600 text-sm mt-1">${partner.experience} d’expérience au service de la qualité</p>
            </div>

            <div class="flex flex-col items-center">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                    <i class="ph ph-users"></i>
                </div>
                <h4 class="mt-3 font-semibold text-black">Clients satisfaits</h4>
                <p class="text-gray-600 text-sm mt-1">${partner.clients} clients nous font confiance</p>
            </div>

            <div class="flex flex-col items-center">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                    <i class="ph ph-star"></i>
                </div>
                <h4 class="mt-3 font-semibold text-black">Note excellente</h4>
                <p class="text-gray-600 text-sm mt-1">${partner.rating} basée sur les clients</p>
            </div>
        </div>
    `;

    // Assemblage final du contenu HTML à injecter
    dynamicContentContainer.innerHTML = `
        <section class="py-16 bg-white font-sans">
            <div class="max-w-5xl mx-auto px-4">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-white text-2xl">
                        <i class="ph ph-users"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-black">Présentation de l’entreprise</h3>
                </div>
                <p class="text-gray-700 leading-relaxed text-lg">${partner.description}</p>
            </div>

            <div class="bg-[#F4F4F4] mt-12 py-12">
                <div class="max-w-5xl mx-auto px-4">
                    <h3 class="text-xl font-semibold text-black mb-6">Notre environnement</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        ${envImagesHtml}
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 bg-[#F8F8F8] font-sans">
            <div class="max-w-6xl mx-auto px-4 text-center mb-12">
                <h3 class="inline-flex items-center gap-2 text-black font-bold text-xl mb-2">
                    <span class="w-8 h-8 rounded-md bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-white text-lg">
                        <i class="ph ph-check-circle"></i>
                    </span>
                    Nos services
                </h3>
                <p class="text-gray-700 text-lg">
                    Découvrez l'ensemble des services proposés par <span class="font-semibold text-black">${partner.title}</span>
                </p>
            </div>

            <div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${servicesHtml}
            </div>

            <div class="max-w-4xl mx-auto mt-14 bg-white shadow-lg rounded-2xl p-8">
                <h3 class="flex items-center gap-3 text-gray-800 font-bold text-xl mb-6">
                    <span class="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-400 rounded-md flex items-center justify-center text-white">
                        <i class="ph ph-phone-call"></i> 
                    </span>
                    Informations de contact
                </h3>
                ${contactHtml}
            </div>
            
            <div class="max-w-6xl mx-auto px-4 mt-20 text-center">
                <h3 class="text-black font-bold text-xl mb-6">
                    Pourquoi choisir ${partner.title} ?
                </h3>
                ${advantagesHtml}
            </div>
        </section>
    `;
});




   
