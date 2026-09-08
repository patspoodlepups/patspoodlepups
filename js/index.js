function toggleMenu() {
  document.getElementById('nav-menu').classList.toggle('show');
}

// Card testimonials
// Card testimonials
const track = document.getElementById('carouselTrack');
const viewport = document.querySelector('.carousel-viewport');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.carousel-track .card');

let currentIndex = 0;

// Always show one testimonial
function getVisibleCardsCount() {
  return 1;
}

function updateCarousel() {
  const visibleCards = getVisibleCardsCount();
  const cardWidth = cards[0].getBoundingClientRect().width;

  const gap = parseFloat(window.getComputedStyle(track).gap) || 0;

  // Move one card at a time
  const amountToMove = (cardWidth + gap) * currentIndex;
  track.style.transform = `translateX(-${amountToMove}px)`;

  // Find height of current card
  const currentCard = cards[currentIndex];

  if (currentCard) {
    viewport.style.height = `${currentCard.getBoundingClientRect().height}px`;
  }

  // Disable buttons at beginning/end
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= cards.length - 1;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

window.addEventListener('resize', () => {
  updateCarousel();
});

window.addEventListener('load', updateCarousel);
