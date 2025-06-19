document.addEventListener('DOMContentLoaded', () => {
  const aboutButton = document.getElementById('aboutButton');
  const aboutContent = document.getElementById('aboutContent');
  let swipeLocked = false;

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
      image: "assets/images/profile-card.png",
      icon: "fa-address-card",
      link: "profile-card/index.html"
    },
    {
      title: "Image Gallery",
      image: "assets/images/gallery.png",
      icon: "fa-images",
      link: "image-gallery/index.html"
    },
    {
      title: "Responsive NavBar",
      image: "assets/images/navbar.png",
      icon: "fa-bars",
      link: "hamburger-menu/index.html"
    },
    {
      title: "Landing Page",
      image: "assets/images/landing.png",
      icon: "fa-rocket",
      link: "landing-page/index.html"
    },
    {
      title: "Movie Verfication Form",
      image: "assets/images/movie.png",
      icon: "fa-rocket",
      link: "movie-verification/index.html"
    },
    {
      title: "BMI Calculator",
      image: "assets/images/bmi.png",
      icon: "fa-weight-scale",
      link: "bmi-calculator/index.html"
    },
    {
      title: "Counter App",
      image: "assets/images/navbar.png",
      icon: "fa-plus-minus",
      link: "counter-app/index.html"
    },
    {
      title: "Newsletter Sign-Up",
      image: "assets/images/navbar.png",
      icon: "fa-newspaper",
      link: "counter-app/index.html"
    },
    {
      title: "404 Not Found Page",
      image: "assets/images/navbar.png",
      icon: "fa-ban",
      link: "counter-app/index.html"
    },
    {
      title: "Pricing Table",
      image: "assets/images/navbar.png",
      icon: "fa-sack-dollar",
      link: "counter-app/index.html"
    },
    {
      title: "Simple Contact Form",
      image: "assets/images/navbar.png",
      icon: "fa-pen-to-square",
      link: "counter-app/index.html"
    },
    {
      title: "Login Page UI",
      image: "assets/images/navbar.png",
      icon: "fa-circle-user",
      link: "counter-app/index.html"
    },
    {
      title: "Registration Page UI",
      image: "assets/images/navbar.png",
      icon: "fa-user-plus",
      link: "counter-app/index.html"
    },
    {
      title: "Testimonial Section",
      image: "assets/images/navbar.png",
      icon: "fa-thumbs-up",
      link: "counter-app/index.html"
    },
    {
      title: "Animated Loading Page",
      image: "assets/images/navbar.png",
      icon: "fa-spinner",
      link: "counter-app/index.html"
    },
    {
      title: "FAQ Accordion",
      image: "assets/images/navbar.png",
      icon: "fa-circle-question",
      link: "counter-app/index.html"
    },
    {
      title: "Quiz App",
      image: "assets/images/navbar.png",
      icon: "fa-question",
      link: "counter-app/index.html"
    },
    {
      title: "To-Do List",
      image: "assets/images/navbar.png",
      icon: "fa-list-check",
      link: "counter-app/index.html"
    },
    {
      title: "Password Generator",
      image: "assets/images/navbar.png",
      icon: "fa-lock",
      link: "counter-app/index.html"
    },
    {
      title: "Light/Dark Toggle",
      image: "assets/images/navbar.png",
      icon: "fa-circle-half-stroke",
      link: "counter-app/index.html"
    },
    {
      title: "Clock & Countdown",
      image: "assets/images/navbar.png",
      icon: "fa-clock",
      link: "counter-app/index.html"
    },
    {
      title: "Guess the Number",
      image: "assets/images/navbar.png",
      icon: "fa-gamepad",
      link: "counter-app/index.html"
    },
    {
      title: "Rock Paper Scissors",
      image: "assets/images/navbar.png",
      icon: "fa-hand-back-fist",
      link: "counter-app/index.html"
    },
    {
      title: "Clicker Game",
      image: "assets/images/navbar.png",
      icon: "fa-mouse",
      link: "counter-app/index.html"
    }
  ];

  const grid = document.getElementById("projects-container");
  const paginationContainer = document.getElementById("pagination");
  const cardsPerPage = 6;
  let currentPage = 1;

function createCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <div class="card-content">
      <i class="fa-solid ${project.icon} project-icon"></i>
      <h3>${project.title}<span class="underline"></span></h3>
      <img src="${project.image}" alt="${project.title}" class="project-preview" />
    </div>
  `;
  return card;
}

  function renderPage(pageNumber) {
    currentPage = pageNumber;
    grid.innerHTML = "";

    const start = (pageNumber - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const pageProjects = projects.slice(start, end);

    pageProjects.forEach(project => {
      const card = createCard(project);
      grid.appendChild(card);
    });

    updatePaginationButton(pageNumber);
  }

  function updatePaginationButton(page) {
    document.querySelectorAll(".page-btn").forEach(b => b.classList.remove("active"));
    const activeBtn = paginationContainer.querySelector(`.page-btn[data-page="${page}"]`);
    if (activeBtn) activeBtn.classList.add("active");
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
      });

      paginationContainer.appendChild(button);
    }

    renderPage(1);
    updatePaginationButton(1);
  }

  setupPagination();


  let touchStartX = 0;
  let touchEndX = 0;

  function handleSwipeGesture() {
    const totalPages = Math.ceil(projects.length / cardsPerPage);
    if (swipeLocked) return;

    if (touchEndX < touchStartX - 50 && currentPage < totalPages) {
      swipeLocked = true;
      renderPage(currentPage + 1);
      setTimeout(() => swipeLocked = false, 300);
    } else if (touchEndX > touchStartX + 50 && currentPage > 1) {
      swipeLocked = true;
      renderPage(currentPage - 1);
      setTimeout(() => swipeLocked = false, 300);
    }
  }


  // ➕ Swipe doar pe mobil
  function enableSwipe() {
    if (window.innerWidth <= 768) {
      grid.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      grid.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      });
    }
  }

  enableSwipe();

  window.addEventListener("resize", () => {
    enableSwipe();
  });
});
