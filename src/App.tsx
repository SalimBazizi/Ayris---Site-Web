import React, { useState, useEffect } from "react";
import { Droplets, Phone, Mail, MapPin, ShoppingCart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const productsRef = useRef(null);
  const deliveryRef = useRef(null);
  const extractRef = useRef(null);
  const postsRef = useRef(null);
  const navLineRef = useRef(null);

  const isProductsInView = useInView(productsRef, { once: true, margin: "-100px" });
  const isDeliveryInView = useInView(deliveryRef, { once: true, margin: "-100px" });
  const isExtractInView = useInView(extractRef, { once: true, margin: "-100px" });
  const isPostsInView = useInView(postsRef, { once: true, margin: "-100px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const waveVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -6, 0],
      transition: {
        duration: 2,
        ease: [0.4, 0, 0.2, 1],
        repeat: Infinity,
        times: [0, 0.5, 1],
      },
    },
  };

  const createWaveText = (text: string) => {
    return (
      <motion.div
        className="font-merriweather inline-flex"
        variants={waveVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="font-merriweather inline-block"
            variants={letterVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateActiveSectionFromScroll = () => {
      const scrollPosition = window.scrollY + 100;

      if (scrollPosition < window.innerHeight) {
        setActiveSection("accueil");
        updateNavLine("accueil-link");
      } else if (
        productsRef.current &&
        scrollPosition < (productsRef.current as HTMLElement).offsetTop
      ) {
        setActiveSection("about");
        updateNavLine("about-link");
      } else if (
        deliveryRef.current &&
        scrollPosition < (deliveryRef.current as HTMLElement).offsetTop
      ) {
        setActiveSection("products");
        updateNavLine("products-link");
      } else if (
        extractRef.current &&
        scrollPosition < (extractRef.current as HTMLElement).offsetTop
      ) {
        setActiveSection("gallery");
        updateNavLine("gallery-link");
      } else {
        setActiveSection("contact");
        updateNavLine("contact-link");
      }
    };

    const updateNavLine = (linkId: string) => {
      const line = document.getElementById("nav-line");
      const link = document.getElementById(linkId);
      const parent = link?.parentElement;

      if (line && link && parent) {
        const rect = link.getBoundingClientRect();
        const containerRect = parent.getBoundingClientRect();
        line.style.width = `${rect.width}px`;
        line.style.left = `${rect.left - containerRect.left}px`;
      }
    };

    window.addEventListener("scroll", updateActiveSectionFromScroll);
    return () => window.removeEventListener("scroll", updateActiveSectionFromScroll);
  }, []);

  return (
    <div className="bg-white font-montserrat relative">
      <style>
        {`
          /* Scrollbar Style */
          ::-webkit-scrollbar {
            width: 12px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(33, 182, 255, 0.1);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(33, 182, 255, 0.8);
            border-radius: 6px;
            border: 2px solid rgba(255, 255, 255, 0.1);
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(33, 182, 255, 1);
          }

          @keyframes wave {
            0%, 100% {
              transform: translate(0, 0) rotate(52deg);
            }
            25% {
              transform: translate(-5px, 5px) rotate(52deg);
            }
            50% {
              transform: translate(0, 10px) rotate(52deg);
            }
            75% {
              transform: translate(5px, 5px) rotate(52deg);
            }
          }
          .animate-wave {
            animation: wave 5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,44,143,0.1)] py-3"
            : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo AYRIS"
                className={`h-20 transition-all duration-500 md:h-20 ${
                  isScrolled ? "drop-shadow-none" : "drop-shadow-[0_0_15px_rgba(33,182,255,0.5)]"
                }`}
              />
            </div>
            {/* Menu Desktop */}
            <div className="gap-8 lg:gap-12 hidden items-center md:flex">
              <div className="flex gap-4 md:gap-6 lg:gap-8 items-center relative">
                <div
                  ref={navLineRef}
                  className={`bg-[#21b6ff] h-0.5 absolute -bottom-1 duration-300 transition-all ${
                    isScrolled ? "opacity-100" : "opacity-70"
                  }`}
                  style={{ width: "0", left: "0" }}
                  id="nav-line"
                ></div>
                <a
                  id="accueil-link"
                  href="#"
                  className={`nav-link relative font-medium text-sm md:text-base uppercase tracking-wider group ${
                    isScrolled
                      ? "text-[#002C8F] hover:text-[#21b6ff] transition-colors duration-300"
                      : "text-white hover:text-white/80"
                  } ${activeSection === "accueil" ? "text-[#21b6ff]" : ""}`}
                >
                  Accueil
                </a>
                <a
                  id="about-link"
                  href="#"
                  className={`nav-link relative font-medium text-sm md:text-base uppercase tracking-wider group ${
                    isScrolled ? "text-[#002C8F]" : "text-white"
                  } ${activeSection === "about" ? "text-[#21b6ff]" : ""}`}
                >
                  À propos
                </a>
                <button
                  id="products-link"
                  className={`nav-link relative font-medium text-sm md:text-base uppercase tracking-wider flex items-center gap-1 group ${
                    isScrolled ? "text-[#002C8F]" : "text-white"
                  } ${activeSection === "products" ? "text-[#21b6ff]" : ""}`}
                >
                  Produits
                  <ChevronDown
                    className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:rotate-180`}
                  />
                </button>
                <a
                  id="gallery-link"
                  href="#"
                  className={`nav-link relative font-medium text-sm md:text-base uppercase tracking-wider group ${
                    isScrolled ? "text-[#002C8F]" : "text-white"
                  } ${activeSection === "gallery" ? "text-[#21b6ff]" : ""}`}
                >
                  Galerie
                </a>
                <a
                  id="contact-link"
                  href="#"
                  className={`nav-link relative font-medium text-sm md:text-base uppercase tracking-wider group ${
                    isScrolled ? "text-[#002C8F]" : "text-white"
                  } ${activeSection === "contact" ? "text-[#21b6ff]" : ""}`}
                >
                  Contact
                </a>
              </div>
            </div>
            {/* Menu Mobile Button */}
            <button
              className={`${
                isScrolled ? "text-[#002C8F]" : "text-white"
              } md:hidden transition-colors duration-300`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </nav>
        </div>
        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/95 backdrop-blur-md md:hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  <a href="#" className="text-blue-900 font-medium py-2">
                    Accueil
                  </a>
                  <a href="#" className="text-blue-900 font-medium py-2">
                    À propos
                  </a>
                  <div className="relative">
                    <button
                      className="flex text-blue-900 font-medium gap-1 items-center py-2"
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                    >
                      Produits
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4"
                        >
                          <a href="#" className="text-blue-900/80 text-sm block py-2">
                            Eau de Source
                          </a>
                          <a href="#" className="text-blue-900/80 text-sm block py-2">
                            Eau Pétillante
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <a href="#" className="text-blue-900 font-medium py-2">
                    Galerie
                  </a>
                  <a href="#" className="text-blue-900 font-medium py-2">
                    Contact
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        className="flex items-center min-h-screen pt-24 md:h-[85vh] lg:h-[90vh] xl:h-[95vh] relative"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 1) 0%, rgba(33, 182, 255, 1) 100%)",
        }}
      >
        <div className="container mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8 relative z-10">
          <div className="flex flex-col gap-8 items-center md:flex-row md:gap-12 lg:gap-16">
            <div className="text-center w-full md:text-left md:w-1/2">
              <h1 className="text-4xl text-white font-bold font-merriweather md:text-[42px] lg:text-[52px] xl:text-6xl mb-6">
                {createWaveText("AYRIS,")}
                <br />
                {createWaveText("une eau pure")}
                <br />
                <span className="text-[45px] text-[#21b6ff] font-merriweather md:text-[52px] lg:text-[58px] xl:text-[65px]">
                  {createWaveText("POUR CHAQUE")}
                  <br />
                  {createWaveText("JOUR")}
                </span>
              </h1>
              <p className="text-base text-blue-100 font-montserrat md:text-[15px] lg:text-lg xl:text-xl mb-8 md:mb-10 lg:mb-12">
                Découvrez le goût pur de la nature avec notre eau
                <br className="hidden md:block" />
                minérale premium, provenant des profondeurs des sources de montagne.
              </p>
              <div className="flex flex-col justify-center md:justify-start gap-4 sm:flex-row">
                <button className="bg-[#21b6ff] rounded-full text-white w-48 active:translate-y-0 duration-300 font-medium hover:-translate-y-1 hover:bg-[#AEC556] md:px-6 lg:px-8 px-4 py-3 transition-all mx-auto md:mx-0">
                  En savoir plus
                </button>
              </div>
            </div>
            <div className="w-full hidden md:block md:w-1/2 md:mt-0 relative">
              <div className="bg-white/10 h-100 rounded-full w-100 absolute blur-3xl opacity-20 right-0 top-0"></div>
              <div className="flex justify-center items-center relative">
                <img
                  src="/ayris-bottle.png"
                  alt="Bouteille d'eau AYRIS"
                  className="h-auto w-[180px] animate-wave duration-500 hover:scale-105 md:w-[200px] lg:w-[260px] xl:w-[314px] me-4 mt-5 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Waves */}
        <div className="w-full -bottom-1 absolute left-0 overflow-hidden">
          <svg viewBox="0 0 720 100" className="h-auto w-full relative" preserveAspectRatio="none">
            <path
              className="wave wave-fast"
              fill="#ffffff"
              fillOpacity="0.2"
              d="M0,32L10,35C20,37,40,43,60,42C80,41,100,33,120,30C140,27,160,29,180,34C200,39,220,45,240,42C260,39,280,27,300,24C320,21,340,27,360,32C380,37,400,43,420,40C440,37,460,25,480,21C500,17,520,21,540,27C560,33,580,41,600,43C620,45,640,41,660,37C680,33,700,29,720,30L720,101L0,101Z"
            ></path>
            <path
              className="wave wave-medium"
              fill="#ffffff"
              fillOpacity="0.4"
              d="M0,32L10,35C20,37,40,43,60,42C80,41,100,33,120,30C140,27,160,29,180,34C200,39,220,45,240,42C260,39,280,27,300,24C320,21,340,27,360,32C380,37,400,43,420,40C440,37,460,25,480,21C500,17,520,21,540,27C560,33,580,41,600,43C620,45,640,41,660,37C680,33,700,29,720,30L720,101L0,101Z"
            ></path>
            <path
              className="wave wave-slow"
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L10,35C20,37,40,43,60,42C80,41,100,33,120,30C140,27,160,29,180,34C200,39,220,45,240,42C260,39,280,27,300,24C320,21,340,27,360,32C380,37,400,43,420,40C440,37,460,25,480,21C500,17,520,21,540,27C560,33,580,41,600,43C620,45,640,41,660,37C680,33,700,29,720,30L720,101L0,101Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Mineral Composition Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="-mt-20 md:py-32 overflow-hidden py-16 relative"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 0.03) 0%, rgba(33, 182, 255, 0.03) 100%)",
        }}
      >
        <motion.div
          variants={fadeInUp}
          className="container text-center mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8"
        >
          <p className="text-[#21b6ff] text-lg mb-2 mt-8">Ce qu'il y a dedans</p>
          <h2 className="text-[#002C8F] text-3xl font-bold font-merriweather mb-4 md:text-5xl">
            Composition minérale
          </h2>
          <div className="flex justify-center mb-12">
            <div className="w-[150px] overflow-hidden">
              <svg width="300" height="30" viewBox="0 0 300 30" className="wave-container">
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                />
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                  style={{ opacity: 0.5 }}
                />
              </svg>
            </div>
          </div>
          <div className="max-w-6xl mx-auto relative">
            <div className="justify-center absolute hidden inset-0 items-center md:flex">
              <div className="h-[800px] w-[800px] relative">
                <img
                  src="/glass-water-composition.png"
                  alt="Verre d'eau"
                  className="h-full p-24 w-full object-contain"
                />
              </div>
            </div>
            <div className="mb-8 md:hidden">
              <img
                src="/glass-water-composition.png"
                alt="Verre d'eau"
                className="h-64 w-auto mx-auto object-contain"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:gap-y-20 md:grid-cols-2 relative z-10">
              {/* Left Side */}
              <div className="md:space-y-20 space-y-8">
                <div className="text-center md:pr-80 md:text-right">
                  <h3 className="text-[#002C8F] text-xl font-bold font-merriweather mb-1 md:text-2xl">
                    Calcium+
                  </h3>
                  <p className="text-[#21b6ff] font-medium mb-2">5-12 mg/dm3</p>
                  <p className="text-gray-600 text-sm italic">
                    Contribue à la solidité des os et des dents.
                  </p>
                </div>
                <div className="text-center md:pr-80 md:text-right">
                  <h3 className="text-[#002C8F] text-xl font-bold font-merriweather mb-1 md:text-2xl">
                    Magnésium
                  </h3>
                  <p className="text-[#21b6ff] font-medium mb-2">2-5 mg/dm3</p>
                  <p className="text-gray-600 text-sm italic">
                    Essentiel pour le bon fonctionnement musculaire.
                  </p>
                </div>
                <div className="text-center md:pr-80 md:text-right">
                  <h3 className="text-[#002C8F] text-xl font-bold font-merriweather mb-1 md:text-2xl">
                    Sodium
                  </h3>
                  <p className="text-[#21b6ff] font-medium mb-2">20-25 mg/dm3</p>
                  <p className="text-gray-600 text-sm italic">
                    Maintient l'équilibre hydrique du corps.
                  </p>
                </div>
              </div>
              {/* Right Side */}
              <div className="md:space-y-20 space-y-8">
                <div className="text-center md:pl-80 md:text-left">
                  <h3 className="text-[#002C8F] text-xl font-bold font-merriweather mb-1 md:text-2xl">
                    Chlore
                  </h3>
                  <p className="text-[#21b6ff] font-medium mb-2">~46 mg/dm3</p>
                  <p className="text-gray-600 text-sm italic">
                    Contribue à la digestion et à l'équilibre acido-basique.
                  </p>
                </div>
                <div className="text-center md:pl-80 md:text-left">
                  <h3 className="text-[#002C8F] text-xl font-bold font-merriweather mb-1 md:text-2xl">
                    Acidité
                  </h3>
                  <p className="text-[#21b6ff] font-medium mb-2">6,8-7,3</p>
                  <p className="text-gray-600 text-sm italic">
                    pH équilibré pour une meilleure absorption.
                  </p>
                </div>
                <div className="text-center md:pl-80 md:text-left">
                  <h3 className="text-[#002C8F] text-xl font-bold font-merriweather mb-1 md:text-2xl">
                    Minéralisation
                  </h3>
                  <p className="text-[#21b6ff] font-medium mb-2">90-140 mg/dm3</p>
                  <p className="text-gray-600 text-sm italic">
                    Teneur optimale en minéraux essentiels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        ref={productsRef}
        initial="hidden"
        animate={isProductsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="md:py-24 py-16"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 0.05) 0%, rgba(33, 182, 255, 0.05) 100%)",
        }}
      >
        <motion.div
          variants={fadeInUp}
          className="container text-center mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8"
        >
          <p className="text-[#21b6ff] text-lg mb-2">Nos produits</p>
          <h2 className="text-[#002C8F] text-3xl font-bold font-merriweather mb-4 md:text-5xl">
            Choisissez votre eau
          </h2>
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="w-[150px] overflow-hidden">
              <svg width="300" height="30" viewBox="0 0 300 30" className="wave-container">
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                />
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                  style={{ opacity: 0.5 }}
                />
              </svg>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-3 md:gap-6 sm:grid-cols-2"
          >
            {/* Première ligne */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/pack-12x0.5L.jpg"
                  alt="Bouteille 0.25L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-base text-blue-900 font-merriweather font-semibold lg:text-xl mb-2 md:mb-3 sm:text-lg">
                  Bouteille 0.25L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 sm:text-sm">
                  Parfaite pour les déplacements courts
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-white text-xs w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] lg:text-base md:px-6 md:py-3 px-4 py-2 sm:text-sm to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/0.5L.jpg"
                  alt="Bouteille 0.5L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-base text-blue-900 font-merriweather font-semibold lg:text-xl mb-2 md:mb-3 sm:text-lg">
                  Bouteille 0.5L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 sm:text-sm">
                  Idéale pour une journée active
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-white text-xs w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] lg:text-base md:px-6 md:py-3 px-4 py-2 sm:text-sm to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/pack-12x0.5L.jpg"
                  alt="Bouteille 1.5L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-base text-blue-900 font-merriweather font-semibold lg:text-xl mb-2 md:mb-3 sm:text-lg">
                  Bouteille 1.5L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 sm:text-sm">
                  Format familial quotidien
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-white text-xs w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] lg:text-base md:px-6 md:py-3 px-4 py-2 sm:text-sm to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            {/* Deuxième ligne */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/0.5L.jpg"
                  alt="Bidon 5L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-base text-blue-900 font-merriweather font-semibold lg:text-xl mb-2 md:mb-3 sm:text-lg">
                  Bidon 5L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 sm:text-sm">
                  Solution économique familiale
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-white text-xs w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] lg:text-base md:px-6 md:py-3 px-4 py-2 sm:text-sm to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            {/* Produit central - Bidon 8L */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-gradient-to-br border-2 border-blue-100/50 h-[400px] p-4 rounded-3xl backdrop-blur-sm from-blue-50/80 group hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 md:scale-110 product-card scale-100 sm:h-[450px] to-white/80 transform"
            >
              <div className="bg-gradient-to-r rounded-full text-white text-xs -top-3 absolute font-semibold from-[#AEC556] md:px-4 md:py-2 md:text-sm px-3 py-1 right-4 to-[#8FAF3D] z-[99]">
                Le plus populaire
              </div>
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/pack-12x0.5L.jpg"
                  alt="Bidon 8L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-blue-900 text-xl font-bold font-merriweather mb-2 md:mb-3 md:text-2xl">
                  Bidon 8L
                </h3>
                <p className="text-gray-600 text-sm mb-4 md:mb-6 md:text-base">
                  Notre best-seller pour une hydratation optimale
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-sm text-white w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] md:px-6 md:py-3 md:text-base px-4 py-2 to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/0.5L.jpg"
                  alt="Pack 6x1.5L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-blue-900 text-lg font-merriweather font-semibold mb-2 md:mb-3 md:text-xl">
                  Pack 6x1.5L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 md:text-sm">
                  Pack familial économique
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-sm text-white w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] md:px-6 md:py-3 md:text-base px-4 py-2 to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/0.5L.jpg"
                  alt="Pack 12x0.5L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-blue-900 text-lg font-merriweather font-semibold mb-2 md:mb-3 md:text-xl">
                  Pack 12x0.5L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 md:text-sm">
                  Pack pour événements
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-sm text-white w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] md:px-6 md:py-3 md:text-base px-4 py-2 to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/pack-12x0.5L.jpg"
                  alt="Pack 24x0.25L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-blue-900 text-lg font-merriweather font-semibold mb-2 md:mb-3 md:text-xl">
                  Pack 24x0.25L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 md:text-sm">
                  Pack pour professionnels
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-sm text-white w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] md:px-6 md:py-3 md:text-base px-4 py-2 to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="flex flex-col bg-white/80 border border-white/20 h-[400px] p-4 rounded-3xl backdrop-blur-sm duration-300 group hover:border-blue-100/50 hover:shadow-[0_8px_30px_rgba(0,44,143,0.2)] lg:h-[600px] lg:p-8 md:h-[500px] md:p-6 product-card sm:h-[450px] transition-all"
            >
              <div className="h-[250px] rounded-t-3xl -mt-4 -mx-4 group lg:-mt-8 lg:-mx-8 lg:h-[420px] mb-4 md:-mt-6 md:-mx-6 md:h-[350px] overflow-hidden relative sm:h-[300px]">
                <div className="bg-gradient-to-br absolute duration-300 from-blue-50/50 group-hover:scale-105 inset-0 to-white/50 transform transition-transform"></div>
                <img
                  src="public/0.5L.jpg"
                  alt="Pack 12x1.5L"
                  className="h-full w-full duration-300 group-hover:scale-110 object-cover relative transform transition-transform z-10"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-blue-900 text-lg font-merriweather font-semibold mb-2 md:mb-3 md:text-xl">
                  Pack 12x1.5L
                </h3>
                <p className="text-gray-600 text-xs mb-4 md:mb-6 md:text-sm">
                  Pack familial grande capacité
                </p>
              </div>
              <button className="bg-gradient-to-r rounded-xl text-sm text-white w-full duration-300 font-medium from-blue-600 hover:-translate-y-1 hover:from-[#AEC556] hover:to-[#8FAF3D] md:px-6 md:py-3 md:text-base px-4 py-2 to-blue-500 transform transition-all">
                Découvrir
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Environmental Impact Section */}
      <motion.section
        ref={deliveryRef}
        initial="hidden"
        animate={isDeliveryInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="overflow-hidden py-24 relative"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 1) 0%, rgba(33, 182, 255, 1) 100%)",
        }}
      >
        <div className="container mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8 relative z-10">
          <div className="flex flex-col gap-12 items-center md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="rounded-3xl group overflow-hidden relative">
                <div className="bg-gradient-to-br absolute duration-500 from-[rgb(174,197,86)]/30 group-hover:opacity-100 inset-0 opacity-0 to-[rgb(174,197,86)]/50 transition-opacity"></div>
                <img
                  src="public/eco-friendly.jpg"
                  alt="Eco-friendly practices"
                  className="h-[500px] w-full duration-500 group-hover:scale-110 object-cover transform transition-transform"
                />
                <div className="bg-[rgb(174,197,86)] p-3 rounded-full shadow-lg absolute right-4 top-4">
                  <svg
                    className="h-8 text-white w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-white w-full md:w-1/2">
              <div className="bg-[rgb(174,197,86)]/20 rounded-full backdrop-blur-sm inline-block mb-6 px-6 py-2">
                <span className="text-white font-medium">Eco-Responsable</span>
              </div>
              <h2 className="text-4xl font-bold font-merriweather mb-6 md:text-5xl">
                Notre Impact Environnemental
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Notre engagement pour l'environnement se traduit par des actions concrètes et
                mesurables. Nous visons à réduire notre empreinte carbone tout en préservant les
                ressources naturelles.
              </p>

              <div className="space-y-6">
                <div className="flex bg-white/10 border border-white/30 p-4 rounded-2xl backdrop-blur-sm duration-300 gap-4 hover:bg-white/20 items-center transition-all">
                  <div className="flex bg-white/20 h-12 justify-center rounded-xl w-12 items-center">
                    <svg
                      className="h-6 text-white w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Énergie Renouvelable</h3>
                    <p className="text-white/80">100% de nos sites alimentés en énergie verte</p>
                  </div>
                </div>

                <div className="flex bg-white/10 border border-white/30 p-4 rounded-2xl backdrop-blur-sm duration-300 gap-4 hover:bg-white/20 items-center transition-all">
                  <div className="flex bg-white/20 h-12 justify-center rounded-xl w-12 items-center">
                    <svg
                      className="h-6 text-white w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Gestion de l'Eau</h3>
                    <p className="text-white/80">Réduction de 40% de notre consommation d'eau</p>
                  </div>
                </div>

                <div className="flex bg-white/10 border border-white/30 p-4 rounded-2xl backdrop-blur-sm duration-300 gap-4 hover:bg-white/20 items-center transition-all">
                  <div className="flex bg-white/20 h-12 justify-center rounded-xl w-12 items-center">
                    <svg
                      className="h-6 text-white w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Économie Circulaire</h3>
                    <p className="text-white/80">Recyclage de 95% de nos déchets industriels</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button className="bg-[rgb(174,197,86)] border-[rgb(174,197,86)] border-2 rounded-xl text-white duration-300 font-medium hover:bg-white hover:text-[rgb(174,197,86)] px-8 py-3 transition-all">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How we extract water Section */}
      <motion.section
        ref={extractRef}
        initial="hidden"
        animate={isExtractInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-24"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 0.04) 0%, rgba(33, 182, 255, 0.04) 100%)",
        }}
      >
        <motion.div
          variants={fadeInUp}
          className="container mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8"
        >
          <div className="text-center mb-8">
            <p className="text-[#21b6ff] text-lg mb-2">Notre processus</p>
            <h2 className="text-[#002C8F] text-5xl font-bold font-merriweather mb-4">
              Comment nous extrayons l'eau
            </h2>
          </div>
          <div className="flex justify-center mb-12">
            <div className="w-[150px] overflow-hidden">
              <svg width="300" height="30" viewBox="0 0 300 30" className="wave-container">
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                />
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                  style={{ opacity: 0.5 }}
                />
              </svg>
            </div>
          </div>
          <div className="rounded-3xl shadow-2xl group image-hover overflow-hidden relative">
            <img
              src="/public/processus-extraction.png"
              alt="Processus d'extraction de l'eau"
              className="h-[600px] w-full duration-700 group-hover:scale-110 object-cover transform transition-transform"
            />
            <div className="bg-gradient-to-t absolute duration-500 from-black/60 group-hover:opacity-100 inset-0 opacity-0 to-transparent transition-opacity"></div>
            <div className="p-8 text-white absolute bottom-0 duration-500 group-hover:translate-y-0 left-0 right-0 transform transition-transform translate-y-full">
              <h3 className="text-2xl font-bold font-merriweather mb-4">Source Naturelle</h3>
              <p className="text-white/90">
                Notre eau provient de sources naturelles profondes, protégées et préservées.
              </p>
            </div>
            <div className="flex justify-center gradient-bg items-center">
              <button className="flex bg-white h-24 justify-center rounded-full text-blue-600 w-24 group hover:bg-blue-50 hover:scale-110 items-center transition-transform">
                <svg
                  className="h-12 w-12 duration-300 group-hover:scale-110 transform transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-center text-gray-600 max-w-3xl mt-8 mx-auto">
            Notre processus d'extraction unique préserve la pureté naturelle de l'eau tout en
            maintenant ses propriétés minérales essentielles.
          </p>
        </motion.div>
      </motion.section>

      {/* Recent Posts Section */}
      <motion.section
        ref={postsRef}
        initial="hidden"
        animate={isPostsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-20"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 0.03) 0%, rgba(33, 182, 255, 0.03) 100%)",
        }}
      >
        <motion.div
          variants={fadeInUp}
          className="container mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8"
        >
          <div className="text-center mb-8">
            <p className="text-[#21b6ff] text-lg mb-2">Dernières actualités</p>
            <h2 className="text-[#002C8F] text-5xl font-bold font-merriweather mb-4">
              Articles récents
            </h2>
          </div>
          <div className="flex justify-center mb-12">
            <div className="w-[150px] overflow-hidden">
              <svg width="300" height="30" viewBox="0 0 300 30" className="wave-container">
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                />
                <path
                  d="M0 15 Q12.5 0, 25 15 Q37.5 30, 50 15 Q62.5 0, 75 15 Q87.5 30, 100 15 Q112.5 0, 125 15 Q137.5 30, 150 15 Q162.5 0, 175 15 Q187.5 30, 200 15 Q212.5 0, 225 15 Q237.5 30, 250 15 Q262.5 0, 275 15 Q287.5 30, 300 15"
                  fill="none"
                  stroke="#21b6ff"
                  strokeWidth="2"
                  className="wave-path"
                  style={{ opacity: 0.5 }}
                />
              </svg>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:gap-8 sm:grid-cols-2"
          >
            {[
              {
                image: "/images/articles/mineral-composition.jpg",
                title: "Que contient votre eau ?",
                excerpt:
                  "Découvrez les bienfaits des minéraux présents dans notre eau et leur importance pour votre santé quotidienne.",
                date: "25 septembre 2024",
              },
              {
                image: "/images/articles/water-benefits.jpg",
                title: "Pourquoi boire de l'eau ?",
                excerpt:
                  "Les raisons essentielles de s'hydrater correctement et les avantages d'une bonne hydratation pour votre corps.",
                date: "25 septembre 2024",
              },
              {
                image: "/images/articles/headache-prevention.jpg",
                title: "L'eau peut prévenir les maux de tête",
                excerpt:
                  "Comment une hydratation régulière peut vous aider à éviter les maux de tête et améliorer votre bien-être.",
                date: "25 septembre 2024",
              },
            ].map((post, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,44,143,0.12)] duration-500 group hover:-translate-y-4 hover:shadow-[0_12px_40px_rgba(0,44,143,0.3)] overflow-hidden transition-all"
              >
                <div className="overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full group-hover:scale-110 object-cover transform transition-transform"
                  />
                </div>
                <div className="flex flex-col h-full p-8">
                  <h3 className="text-[#002C8F] text-center text-ellipsis text-xl font-merriweather font-semibold mb-4 overflow-hidden whitespace-nowrap">
                    {post.title}
                  </h3>
                  <p className="text-center text-gray-600 mb-6">{post.excerpt}</p>
                  <div className="flex justify-center text-gray-500 text-sm items-center mb-6">
                    <span>{post.date}</span>
                  </div>
                  <div className="flex justify-center">
                    <button className="flex text-[#21b6ff] duration-300 font-medium gap-2 group hover:text-[#002C8F] items-center transition-colors">
                      Lire plus
                      <svg
                        className="h-4 w-4 duration-300 group-hover:translate-x-1 transform transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="md:py-24 overflow-hidden py-16 relative"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 0.03) 0%, rgba(33, 182, 255, 0.03) 100%)",
        }}
      >
        <div className="container mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8">
          <div className="text-center mb-8">
            <p className="text-[#21b6ff] text-lg mb-2">Contactez-nous</p>
            <h2 className="text-[#002C8F] text-3xl font-bold font-merriweather mb-4 md:text-5xl">
              Une question ? Écrivez-nous
            </h2>
          </div>
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="w-[150px] overflow-hidden">
              <svg width="300" height="30" viewBox="0 0 300 30" className="wave-container">
                {/* ... existing code ... */}
              </svg>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,44,143,0.12)] lg:p-12 md:p-8"
            >
              <form className="md:space-y-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-gray-700 text-sm block font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      className="border border-gray-200 rounded-xl w-full focus:border-[#21b6ff] focus:outline-none focus:ring-[#21b6ff] focus:ring-1 md:px-4 md:py-3 px-3 py-2 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm block font-medium mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      className="border border-gray-200 rounded-xl w-full focus:border-[#21b6ff] focus:outline-none focus:ring-[#21b6ff] focus:ring-1 md:px-4 md:py-3 px-3 py-2 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 text-sm block font-medium mb-2">Sujet</label>
                  <input
                    type="text"
                    className="border border-gray-200 rounded-xl w-full focus:border-[#21b6ff] focus:outline-none focus:ring-[#21b6ff] focus:ring-1 md:px-4 md:py-3 px-3 py-2 transition-colors"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>

                <div>
                  <label className="text-gray-700 text-sm block font-medium mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="border border-gray-200 rounded-xl w-full focus:border-[#21b6ff] focus:outline-none focus:ring-[#21b6ff] focus:ring-1 md:px-4 md:py-3 px-3 py-2 resize-none transition-colors"
                    placeholder="Écrivez votre message ici..."
                  ></textarea>
                </div>

                <div className="flex justify-center md:pt-4 pt-2">
                  <button
                    type="submit"
                    className="bg-[#21b6ff] rounded-xl text-white w-full duration-300 font-medium group hover:-translate-y-1 hover:shadow-lg md:px-8 md:py-4 md:w-auto overflow-hidden px-6 py-3 relative transition-all"
                  >
                    <span className="flex justify-center gap-2 items-center relative z-10">
                      Envoyer le message
                      <svg
                        className="h-5 w-5 duration-300 group-hover:translate-x-1 transform transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                    <div className="bg-[#002C8F] absolute duration-300 group-hover:opacity-100 inset-0 opacity-0 transition-opacity"></div>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer
        className="text-white md:py-16 py-12"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 44, 143, 0.98) 0%, rgba(33, 182, 255, 0.98) 100%)",
        }}
      >
        <div className="container mx-auto px-12 md:px-8 lg:px-12 xl:px-8 2xl:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 mb-8 md:gap-12 md:mb-12 sm:grid-cols-2">
            <div>
              <div className="flex justify-center text-xl font-bold font-merriweather gap-2 items-center mb-4 md:mb-6 md:text-2xl sm:justify-start">
                <Droplets className="h-6 w-6 md:h-8 md:w-8" />
                AQUATERRA
              </div>
              <p className="text-blue-200 text-center sm:text-left">
                Eau minérale naturelle premium pour vos besoins quotidiens en hydratation.
              </p>
            </div>
            <div>
              <h3 className="text-center text-lg font-merriweather font-semibold mb-4 md:mb-6 md:text-xl sm:text-left">
                Liens rapides
              </h3>
              <ul className="text-center md:space-y-3 sm:text-left space-y-2">
                {["À propos", "Produits", "Galerie", "Contact"].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-center text-lg font-merriweather font-semibold mb-4 md:mb-6 md:text-xl sm:text-left">
                Informations
              </h3>
              <ul className="md:space-y-3 space-y-2">
                {[
                  { icon: Phone, text: "+213 34 36 02 969" },
                  { icon: Mail, text: "ayrisfr@yahoo.fr" },
                  { icon: MapPin, text: "RN 26 BUZEROUAL AKBOU, 06001 W. BEJAIA ALGERIA" },
                ].map((contact, index) => (
                  <li
                    key={index}
                    className="flex justify-center gap-2 items-center sm:justify-start"
                  >
                    <contact.icon className="h-4 text-blue-300 w-4 md:h-5 md:w-5" />
                    <span className="text-blue-200 text-sm md:text-base">{contact.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-center text-lg font-merriweather font-semibold mb-4 md:mb-6 md:text-xl sm:text-left">
                Suivez-nous
              </h3>
              <div className="flex justify-center gap-4 sm:justify-start">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                    ),
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    ),
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex bg-white/10 h-10 justify-center rounded-full w-10 hover:bg-white/20 items-center transition-colors"
                  >
                    <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-blue-800 border-t text-blue-200 text-center md:pt-8 pt-6">
            <p className="text-sm md:text-base">&copy; 2025 SARL. NOMADE. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
