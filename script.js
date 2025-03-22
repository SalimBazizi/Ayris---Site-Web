// Données des articles du blog
const blogPosts = [
  {
    id: 1,
    title: "Les bienfaits de l'eau minérale",
    image: "public/images/articles/water-benefits.jpg",
    excerpt: "Découvrez pourquoi l'eau minérale est essentielle pour votre santé.",
    date: "15 Mars 2024",
  },
  {
    id: 2,
    title: "Composition minérale : tout savoir",
    image: "public/images/articles/mineral-composition.jpg",
    excerpt: "Guide complet sur la composition minérale de l'eau.",
    date: "10 Mars 2024",
  },
  {
    id: 3,
    title: "Prévenir les maux de tête",
    image: "public/images/articles/headache-prevention.jpg",
    excerpt: "Comment l'hydratation aide à prévenir les maux de tête.",
    date: "5 Mars 2024",
  },
];

// Fonction pour créer les cartes d'articles du blog avec animation
function createBlogCards() {
  const blogGrid = document.querySelector(".blog-grid");
  if (!blogGrid) return;

  blogPosts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.innerHTML = `
      <div class="blog-image">
        <img src="${post.image}" alt="${post.title}">
        <div class="blog-overlay">
          <span class="read-more">Lire plus</span>
        </div>
      </div>
      <div class="blog-info">
        <span class="date">${post.date}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
    `;
    blogGrid.appendChild(card);

    // Animation d'apparition avec délai
    setTimeout(() => {
      card.style.transition = "all 0.5s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Gestion du menu mobile amélioré
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector(".header");

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

// Gestion du formulaire de contact amélioré
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
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

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Réinitialiser le formulaire
      contactForm.reset();
      formGroups.forEach((group) => group.classList.remove("focused"));

      // Afficher le message de succès
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé avec succès !';
      contactForm.appendChild(successMessage);

      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  });
}

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

// Initialise les animations au chargement de la page
document.addEventListener("DOMContentLoaded", initScrollAnimations);

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

// Animation des cartes au survol
document.querySelectorAll(".impact-item, .product-card, .blog-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
    card.style.boxShadow = "var(--hover-shadow)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "var(--card-shadow)";
  });
});

// Animation des icônes
document.querySelectorAll(".impact-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.transform = "scale(1.1) rotate(5deg)";
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "scale(1) rotate(0)";
  });
});

// Animation du menu mobile
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Animation du formulaire de contact
const form = document.getElementById("contact-form");
const formGroups = document.querySelectorAll(".form-group");

formGroups.forEach((group) => {
  const input = group.querySelector("input, textarea");
  const label = group.querySelector("label");

  input.addEventListener("focus", () => {
    group.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      group.classList.remove("focused");
    }
  });
});

// Gestion de la soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Animation du bouton
  const submitButton = form.querySelector(".submit-button");
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  // Simulation d'envoi
  setTimeout(() => {
    submitButton.innerHTML = '<i class="fas fa-check"></i>';

    // Réinitialisation après 2 secondes
    setTimeout(() => {
      submitButton.innerHTML = '<span>Envoyer</span><i class="fas fa-paper-plane"></i>';
      form.reset();
      formGroups.forEach((group) => group.classList.remove("focused"));
    }, 2000);
  }, 1500);
});

// Appeler la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  createBlogCards();
  initMobileMenu();
  initContactForm();
  initScrollAnimations();
});
