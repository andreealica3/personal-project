document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const heroNav = document.querySelector('.nav');

  function toggleMenu() {
    const isOpen = heroNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  if (hamburger && heroNav) {
    hamburger.addEventListener('click', toggleMenu);
  } else {
    console.log('Eroare: nu găsește hamburger sau nav.');
  }
});


