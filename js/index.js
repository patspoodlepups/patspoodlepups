function toggleMenu() {
  document.getElementById('nav-menu').classList.toggle('show');
}

// Card testimonials
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;

function getVisibleCardsCount() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function updateCarousel() {
  const visibleCards = getVisibleCardsCount();
  const cardWidth = cards[0].getBoundingClientRect().width;

  // Pull the track gap value dynamically from computed CSS styles
  const gap = parseFloat(window.getComputedStyle(track).gap) || 0;

  // Calculate transform step sizing (width of single card + gap size)
  const amountToMove = (cardWidth + gap) * currentIndex;
  track.style.transform = `translateX(-${amountToMove}px)`;

  // Handle disabled states for endpoints
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= cards.length - visibleCards;
}

nextBtn.addEventListener('click', () => {
  const visibleCards = getVisibleCardsCount();
  if (currentIndex < cards.length - visibleCards) {
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

// Re-calculate positioning on window resizing events
window.addEventListener('resize', () => {
  const visibleCards = getVisibleCardsCount();
  // Snap back if resize pushes bounds out of index range
  if (currentIndex > cards.length - visibleCards) {
    currentIndex = Math.max(0, cards.length - visibleCards);
  }
  updateCarousel();
});

// Run calculation once during page setup
updateCarousel();
