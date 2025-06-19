const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.querySelector('.lightbox');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .chevron-left'); 
const nextBtn = document.querySelector('.lightbox .chevron-right'); 
let currentIndex = 0;

function closeLightbox() {
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.classList.add('closing');

    setTimeout(() => {
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
        lightboxImg.classList.remove('closing');
    }, 300); 
}

function updateLightboxImage() {
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = images[currentIndex].src;
}

images.forEach((image, index) => {
    image.addEventListener('click', function() {
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = image.src;
        lightbox.style.opacity = '1';
        lightbox.style.pointerEvents = 'auto';
        currentIndex = index; 
    });
});

closeBtn.addEventListener('click', function() {
    closeLightbox();
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Navigare Next
nextBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // 
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateLightboxImage();
});

// Navigare Previous
prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateLightboxImage();
});

