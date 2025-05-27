document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const heroNav = document.querySelector('.nav');

  if (hamburger && heroNav) {
    hamburger.addEventListener('click', function() {
      heroNav.classList.toggle('open');
    });
  } else {
    console.log('Eroare: nu găsește hamburger sau nav.');
  }
});


