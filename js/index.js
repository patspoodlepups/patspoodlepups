function toggleMenu() {
  document.getElementById('nav-menu').classList.toggle('show');
}

// ==========================
// TESTIMONIAL CAROUSEL
// ==========================

const track = document.getElementById('carouselTrack');
const viewport = document.querySelector('.carousel-viewport');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.carousel-track .card');

let testimonialIndex = 0;

function getVisibleCardsCount() {
  return 1;
}

function updateCarousel() {
  if (!track || !viewport || !prevBtn || !nextBtn || !cards.length) {
    return;
  }

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(window.getComputedStyle(track).gap) || 0;

  const amountToMove = (cardWidth + gap) * testimonialIndex;

  track.style.transform = `translateX(-${amountToMove}px)`;

  const currentCard = cards[testimonialIndex];

  if (currentCard) {
    viewport.style.height = `${currentCard.getBoundingClientRect().height}px`;
  }

  prevBtn.disabled = testimonialIndex === 0;

  nextBtn.disabled = testimonialIndex >= cards.length - 1;
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (testimonialIndex < cards.length - 1) {
      testimonialIndex++;
      updateCarousel();
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (testimonialIndex > 0) {
      testimonialIndex--;
      updateCarousel();
    }
  });
}

window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel);

// ==========================
// PUPPY PHOTO CAROUSELS
// ==========================

document.querySelectorAll('.pup-carousel').forEach((carousel) => {
  const image = carousel.querySelector('.pup-carousel-image');

  const prevButton = carousel.querySelector('.pup-carousel-prev');

  const nextButton = carousel.querySelector('.pup-carousel-next');

  const dotsContainer = carousel.querySelector('.pup-carousel-dots');

  const images = JSON.parse(carousel.dataset.images);

  let currentIndex = 0;

  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement('button');

    dot.classList.add('pup-carousel-dot');

    dot.setAttribute('aria-label', `View photo ${index + 1}`);

    dot.addEventListener('click', () => {
      showImage(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = carousel.querySelectorAll('.pup-carousel-dot');

  function showImage(index) {
    currentIndex = index;

    image.style.opacity = '0';

    setTimeout(() => {
      image.src = images[currentIndex];
      image.style.opacity = '1';
    }, 100);

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentIndex);
    });
  }

  // Previous button
  prevButton.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;

    showImage(newIndex);
  });

  // Next button
  nextButton.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % images.length;

    showImage(newIndex);
  });

  // Click the actual picture to advance
  image.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % images.length;

    showImage(newIndex);
  });

  // Start on first picture
  showImage(0);
});
