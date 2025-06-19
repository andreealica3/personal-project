    const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.navbar ul');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      const expanded = navList.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', expanded);
    });
  }