// === Track selected category ===
let selectedCategory = '';

// === Toggle quiz card selection ===
function toggleCategory(card, category) {
  const wasSelected = card.classList.contains('selected');
  const allCards = document.querySelectorAll('.quiz-card');
  const startBtn = document.getElementById('startBtn');
  const message = document.getElementById('message');

  // Remove previous selection
  allCards.forEach(cardEl => cardEl.classList.remove('selected'));
  selectedCategory = '';

  if (!wasSelected) {
    // Select new category
    card.classList.add('selected');
    selectedCategory = category;

    // Show start button
    startBtn.classList.add('visible');

    // Clear any previous message
    message.textContent = '';
  } else {
    // Hide start button if deselected
    startBtn.classList.remove('visible');
  }
}

// === Start quiz based on selected category ===
function startQuiz() {
  if (selectedCategory) {
    // Redirect to quiz page with category in URL
    window.location.href = `quiz.html?category=${selectedCategory}`;
  } 
}

// === Hamburger menu toggle for sidebar ===
document.querySelector('.menu').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('show');
});

// === Hide sidebar when clicking outside ===
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menu = document.querySelector('.menu');

  if (!sidebar.contains(event.target) && !menu.contains(event.target)) {
    sidebar.classList.remove('show');
  }
});