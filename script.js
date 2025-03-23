// Détails des produits
const productDetails = {
  "Bouteille 0.25L": {
    description:
      "Notre format compact idéal pour les déplacements. Parfaite pour les enfants et les petites soifs, cette bouteille s'intègre facilement dans tous les sacs.",
    image: "assets/images/0.5L.jpg",
  },
  "Bouteille 0.5L": {
    description:
      "Le format équilibré pour une hydratation optimale tout au long de la journée. Idéale pour le sport et les activités quotidiennes.",
    image: "assets/images/pack-12x0.5L.jpg",
  },
  "Bouteille 1.5L": {
    description:
      "Notre format familial, parfait pour les repas et l'hydratation quotidienne à la maison ou au bureau.",
    image: "assets/images/0.5L.jpg",
  },
  "Bouteille 5L": {
    description:
      "Une solution économique pour les familles, idéale pour un stockage pratique et une utilisation prolongée.",
    image: "assets/images/pack-12x0.5L.jpg",
  },
  "Bouteille 8L": {
    description:
      "Notre plus grand format, parfait pour les événements ou une consommation intensive. Une solution économique et écologique.",
    image: "assets/images/0.5L.jpg",
  },
  "Pack 12x1.5L": {
    description:
      "Pack familial économique, idéal pour un approvisionnement mensuel. Une solution pratique pour toute la famille.",
    image: "assets/images/pack-12x0.5L.jpg",
  },
};

// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Initialisation du menu mobile
  initMobileMenu();

  // Initialisation des animations de cartes
  initCardAnimations();

  // Initialisation des animations d'icônes
  initIconAnimations();

  // Initialisation des animations d'impact
  initImpactAnimations();

  // Initialisation du modal des produits
  initProductModal();

  // Initialisation du formulaire de contact
  initContactForm();

  // Initialisation des animations de scroll
  initScrollAnimations();
});

// Fonction pour initialiser le menu mobile
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });

  // Fermer le menu mobile lors du clic sur un lien
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });
  });
}

// Fonction pour initialiser les animations de cartes
function initCardAnimations() {
  const cards = document.querySelectorAll(".impact-item, .product-card, .blog-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "var(--hover-shadow)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "var(--card-shadow)";
    });
  });
}

// Fonction pour initialiser les animations d'icônes
function initIconAnimations() {
  const icons = document.querySelectorAll(".impact-icon");

  icons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "scale(1.1) rotate(5deg)";
    });

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1) rotate(0)";
    });
  });
}

// Fonction pour initialiser les animations de la section Impact
function initImpactAnimations() {
  const impactSection = document.querySelector(".impact-section");
  if (!impactSection) return;

  const impactLeft = impactSection.querySelector(".impact-left");
  const impactRight = impactSection.querySelector(".impact-right");
  const metricItems = impactSection.querySelectorAll(".metric-item");

  const impactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px",
    }
  );

  if (impactLeft) impactObserver.observe(impactLeft);
  if (impactRight) impactObserver.observe(impactRight);
  metricItems.forEach((item) => impactObserver.observe(item));
}

// Fonction pour initialiser le modal des produits
function initProductModal() {
  const productModal = document.querySelector(".product-modal");
  const productModalClose = document.querySelector(".product-modal-close");
  const productButtons = document.querySelectorAll(".product-button");

  console.log("Modal:", productModal);
  console.log("Close button:", productModalClose);
  console.log("Product buttons:", productButtons.length);

  if (!productModal || !productModalClose || !productButtons.length) {
    console.error("Éléments du modal non trouvés");
    return;
  }

  productButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Button clicked");

      const productCard = button.closest(".product-card");
      if (!productCard) {
        console.error("Product card not found");
        return;
      }

      const productTitle = productCard.querySelector(".product-info h3").textContent;
      console.log("Product title:", productTitle);

      const productInfo = productDetails[productTitle];
      console.log("Product info:", productInfo);

      if (productInfo) {
        const modalImage = productModal.querySelector(".product-modal-image img");
        const modalTitle = productModal.querySelector(".product-modal-info h3");
        const modalDescription = productModal.querySelector(".product-description");

        modalImage.src = productInfo.image;
        modalImage.alt = productTitle;
        modalTitle.textContent = productTitle;
        modalDescription.textContent = productInfo.description;

        // Forcer un reflow avant d'ajouter la classe active
        void productModal.offsetWidth;

        productModal.style.display = "flex";
        setTimeout(() => {
          productModal.classList.add("active");
        }, 10);

        document.body.style.overflow = "hidden";
      } else {
        console.error("Product info not found for:", productTitle);
      }
    });
  });

  productModalClose.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  });

  productModal.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  function closeModal() {
    productModal.classList.remove("active");
    setTimeout(() => {
      productModal.style.display = "none";
      document.body.style.overflow = "";
    }, 400); // Attendre la fin de l'animation
  }
}

// Fonction pour initialiser le formulaire de contact
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  const formGroups = contactForm.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea");
    if (!input) return;

    input.addEventListener("focus", () => {
      group.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        group.classList.remove("focused");
      }
    });
  });

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;

    try {
      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Réinitialiser le formulaire
      contactForm.reset();
      formGroups.forEach((group) => group.classList.remove("focused"));

      // Afficher le message de succès
      submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';

      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur';

      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 2000);
    }
  });
}

// Variables pour le scroll
let lastScrollTop = 0;
let header = document.querySelector(".header");

// Fonction pour gérer le scroll de la navbar
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Ajoute la classe scrolled si on a défilé plus de 100px
  if (scrollTop > 100) {
    header.classList.add("scrolled");
    header.style.transform = "translateY(0)";
  } else {
    // Au top de la page
    header.classList.remove("scrolled");
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// Fonction pour observer les éléments et déclencher les animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); // Désactive l'observation une fois animé
    }
  });
}, observerOptions);

// Fonction pour initialiser les animations au scroll
function initScrollAnimations() {
  // Sélectionne tous les éléments avec les classes d'animation
  const animatedElements = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right, .fade-in, .scale-up"
  );

  // Observe chaque élément
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Animation des nombres dans les statistiques
function animateNumber(element) {
  const target = parseInt(element.textContent);
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const stepTime = duration / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, stepTime);
}

// Effet de parallaxe sur les images
document.addEventListener("mousemove", (e) => {
  const parallaxElements = document.querySelectorAll(".parallax");
  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    element.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});
