document.addEventListener("DOMContentLoaded", function () {
    const devisForm = document.getElementById("devis-form");
    const contactContent = document.getElementById("contact-content");

    const btnContact = document.getElementById("btn-contact-general");
    const btnDevis = document.getElementById("btn-demande-devis");

    function showForm(show, hide, activeBtn, inactiveBtn) {
        hide.classList.add("hidden");
        show.classList.remove("hidden");

        show.style.opacity = 0;
        setTimeout(() => {
            show.style.transition = "opacity 0.35s ease";
            show.style.opacity = 1;
        }, 10);

        activeBtn.classList.remove("bg-gray-200", "text-black");
        activeBtn.classList.add("bg-red-600", "text-white");

        inactiveBtn.classList.remove("bg-red-600", "text-white");
        inactiveBtn.classList.add("bg-gray-200", "text-black");
    }

    btnContact.addEventListener("click", () => {
        showForm(contactContent, devisForm, btnContact, btnDevis);
    });

    btnDevis.addEventListener("click", () => {
        showForm(devisForm, contactContent, btnDevis, btnContact);
    });
});
