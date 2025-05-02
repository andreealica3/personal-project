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
});


