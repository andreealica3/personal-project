document.addEventListener('DOMContentLoaded', () => {
  const aboutButton = document.getElementById('aboutButton');
  const aboutContent = document.getElementById('aboutContent');

  if (aboutButton && aboutContent) {
    aboutButton.addEventListener('click', () => {
      aboutContent.classList.toggle('open');
      aboutButton.classList.toggle('open');
      const expanded = aboutButton.classList.contains('open');
      aboutButton.setAttribute('aria-expanded', expanded);
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.navbar ul');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      const expanded = navList.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', expanded);
    });
  }

const projects = [
  {
    title: "Stylized Profile Card",
    description: "A responsive card with image, name, and basic profile info.",
    icon: "fa-address-card",
    link: "profile-card/index.html"
  },
  {
    title: "Image Gallery",
    description: "A clean, responsive image grid with hover effects.",
    icon: "fa-images",
    link: "image-gallery/index.html"
  },
  {
    title: "Responsive Navigation Bar",
    description: "A mobile-friendly navigation menu with toggle animation.",
    icon: "fa-bars",
    link: "hamburger-menu/index.html"
  },
  {
    title: "Landing Page",
    description: "A modern landing page for showcasing a product or service.",
    icon: "fa-rocket",
    link: "landing-page/index.html"
  },
  {
    title: "Movie Verfication Form",
    description: "A modern verification form.",
    icon: "fa-rocket",
    link: "movie-verification/index.html"
  },
    {
    title: "BMI Calculator",
    description: "Calculates your Body Mass Index based on weight and height.",
    icon: "fa-weight-scale",
    link: "bmi-calculator/index.html"
  },
  {
    title: "Newsletter Sign-Up",
    description: "A creative newsletter form with input validation and style.",
    icon: "fa-newspaper",
    link: "projects/newsletter-signup/index.html"
  },
  {
    title: "404 Not Found Page",
    description: "A fun and custom-designed 404 error page.",
    icon: "fa-ban",
    link: "projects/404-page/index.html"
  },
  {
    title: "Pricing Table",
    description: "A modern and responsive pricing plan comparison section.",
    icon: "fa-sack-dollar",
    link: "projects/pricing-table/index.html"
  },
  {
    title: "Simple Contact Form",
    description: "A clean HTML/CSS contact form layout with input fields.",
    icon: "fa-pen-to-square",
    link: "projects/contact-form/index.html"
  },
  {
    title: "Login Page UI",
    description: "A stylish login form interface with floating labels.",
    icon: "fa-circle-user",
    link: "projects/login-page/index.html"
  },
  {
    title: "Registration Page UI",
    description: "A responsive sign-up page with clean styling and fields.",
    icon: "fa-user-plus",
    link: "projects/registration-page/index.html"
  },
  {
    title: "Testimonial Section",
    description: "A testimonial layout with user cards and star ratings.",
    icon: "fa-thumbs-up",
    link: "projects/testimonials/index.html"
  },
  {
    title: "Animated Loading Page",
    description: "A simple pre-loader with CSS animations for page loading.",
    icon: "fa-spinner",
    link: "projects/loader-page/index.html"
  },
  {
    title: "FAQ Accordion",
    description: "A collapsible FAQ section with smooth transitions.",
    icon: "fa-circle-question",
    link: "projects/faq-accordion/index.html"
  },
  {
    title: "Quiz App",
    description: "Interactive quiz with score tracking and multiple questions.",
    icon: "fa-question",
    link: "projects/quiz-app/index.html"
  },
  {
    title: "To-Do List",
    description: "Persistent to-do list saved in browser's localStorage.",
    icon: "fa-list-check",
    link: "projects/todo-list/index.html"
  },
  {
    title: "Password Generator",
    description: "Generates strong passwords with custom rules and length.",
    icon: "fa-lock",
    link: "projects/password-generator/index.html"
  },
  {
    title: "Counter App",
    description: "Simple counter with increment, decrement, and reset options.",
    icon: "fa-plus-minus",
    link: "projects/counter-app/index.html"
  },
  {
    title: "Light/Dark Toggle",
    description: "Theme toggle with persistent preference saved in localStorage.",
    icon: "fa-circle-half-stroke",
    link: "projects/dark-mode-toggle/index.html"
  },
  {
    title: "Clock & Countdown",
    description: "Live digital clock and customizable countdown timer.",
    icon: "fa-clock",
    link: "projects/clock-countdown/index.html"
  },
  {
    title: "Guess the Number",
    description: "Classic game where you guess a random number with hints.",
    icon: "fa-gamepad",
    link: "projects/guess-number/index.html"
  },
  {
    title: "Rock Paper Scissors",
    description: "Play against the computer with score tracking.",
    icon: "fa-hand-back-fist",
    link: "projects/rock-paper-scissors/index.html"
  },
  {
    title: "Clicker Game",
    description: "Tap as fast as you can! A game for speed and reaction.",
    icon: "fa-mouse",
    link: "projects/clicker-game/index.html"
  }
];


  const grid = document.getElementById("projects-container");
  const paginationContainer = document.getElementById("pagination");
  const cardsPerPage = 6;

  function createCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="card-content">
        <i class="fa-solid ${project.icon} project-icon"></i>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
        <span>Preview</span> <i class="fa-solid fa-circle-arrow-right"></i>
      </a>
    `;
    return card;
  }

  function renderPage(pageNumber) {
    grid.innerHTML = "";
    document.querySelectorAll(".project-card.placeholder").forEach(p => p.remove());

    const start = (pageNumber - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const pageProjects = projects.slice(start, end);

    pageProjects.forEach(project => {
      const card = createCard(project);
      grid.appendChild(card);
    });


    const missing = cardsPerPage - pageProjects.length;
    for (let i = 0; i < missing; i++) {
      const placeholder = document.createElement("div");
      placeholder.className = "project-card placeholder";
      grid.appendChild(placeholder);
    }
  }

  function setupPagination() {
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(projects.length / cardsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const button = document.createElement("button");
      button.className = "page-btn";
      button.dataset.page = i;

      button.addEventListener("click", () => {
        renderPage(i);
        document.querySelectorAll(".page-btn").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
      });

      paginationContainer.appendChild(button);
    }

    renderPage(1);
    paginationContainer.querySelector(".page-btn").classList.add("active");
  }

  setupPagination();
});
