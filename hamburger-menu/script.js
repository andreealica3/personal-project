const simulator = document.querySelector('.simulator');
const deviceIcon = document.querySelector('.device-icon i');

function updateDeviceIcon() {
  const width = simulator.offsetWidth;

  if (width > 900) {
    deviceIcon.className = 'fa-solid fa-desktop';
  } else if (width > 600) {
    deviceIcon.className = 'fa-solid fa-tablet-screen-button';
  } else {
    deviceIcon.className = 'fa-solid fa-mobile-screen-button';
  }

  if (width <= 600) {
    simulator.classList.add('simulate-mobile');
  } else {
    simulator.classList.remove('simulate-mobile');
  }
}

simulator.addEventListener('mousemove', updateDeviceIcon);
updateDeviceIcon();

window.addEventListener('resize', () => {
  if (simulator.offsetWidth > window.innerWidth) {
    simulator.style.width = '90%';
  }
  updateDeviceIcon();
});


const primaryNavbar = document.querySelector('.primary-navbar');
const secondaryNavbar = document.querySelector('.secondary-navbar');
const primaryTitle = document.querySelector('.primary-title');
const secondaryTitle = document.querySelector('.secondary-title');
const primaryMenuLinks = document.querySelectorAll('.primary-menu ul li a');
const secondaryMenuLinks = document.querySelectorAll('.secondary-menu ul li a');

function adjustNavbar() {
  const width = simulator.offsetWidth;

  const navbarWidth = Math.min(Math.max(width * 0.8, 320), 1000);
  if (primaryNavbar) primaryNavbar.style.width = `${navbarWidth}px`;
  if (secondaryNavbar) secondaryNavbar.style.width = `${navbarWidth}px`;

  const titleFontSize = Math.min(Math.max(width * 0.020, 16), 24);
  if (primaryTitle) primaryTitle.style.fontSize = `${titleFontSize}px`;
  if (secondaryTitle) secondaryTitle.style.fontSize = `${titleFontSize}px`;

  const linkPadding = Math.min(Math.max(width * 0.01, 8), 14);
  primaryMenuLinks.forEach(link => {
    link.style.padding = `${linkPadding}px`;
  });
  secondaryMenuLinks.forEach(link => {
    link.style.padding = `${linkPadding}px ${linkPadding * 1.5}px`; 
  });
}

const resizeObserver = new ResizeObserver(() => {
  adjustNavbar();      
  updateDeviceIcon();  
});

resizeObserver.observe(simulator);


adjustNavbar();

const primaryHamburgerBtn = document.querySelector('.primary-navbar .hamburger-btn');
const primaryMenu = document.querySelector('.primary-menu');
const secondaryHamburgerBtn = document.querySelector('.secondary-navbar .hamburger-btn');
const secondaryMenu = document.querySelector('.secondary-menu');

if (primaryHamburgerBtn && primaryMenu) {
  primaryHamburgerBtn.addEventListener('click', () => {
    primaryMenu.classList.toggle('active');
  });
}

if (secondaryHamburgerBtn && secondaryMenu) {
  secondaryHamburgerBtn.addEventListener('click', () => {
    secondaryMenu.classList.toggle('active');
  });
}



