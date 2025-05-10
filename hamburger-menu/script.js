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
}

simulator.addEventListener('mousemove', updateDeviceIcon);


updateDeviceIcon();

window.addEventListener('resize', () => {

  if (simulator.offsetWidth > window.innerWidth) {
    simulator.style.width = '90%'; 
  }
  
  updateDeviceIcon();
});

