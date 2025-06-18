document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const heroNav = document.querySelector('.nav');
  const header = document.querySelector('.header');

  function toggleMenu() {
    const isOpen = heroNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);

    // aici vine magia
    if (isOpen) {
      header.classList.add('no-border');
    } else {
      header.classList.remove('no-border');
    }
  }

  if (hamburger && heroNav && header) {
    hamburger.addEventListener('click', toggleMenu);
  } else {
    console.log('Eroare: nu găsește hamburger, nav sau header.');
  }
});



