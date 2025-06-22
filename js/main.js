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
    card.classList.add('selected');
    selectedCategory = category;
    startBtn.classList.add('visible');
    message.textContent = '';
  } else {
    startBtn.classList.remove('visible');
  }
}

// === Start quiz based on selected category ===
function startQuiz() {
  if (selectedCategory) {
    window.location.href = `quiz.html?category=${selectedCategory}`;
  }
}

// === Hamburger menu toggle for sidebar ===
document.querySelector('.menu').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('show');
});

// === Options menu toggle (⋮ for logout) ===
const optionsDiv = document.querySelector('.options');
const logoutBtn = document.getElementById('logoutBtn');

optionsDiv.addEventListener('click', (event) => {
  event.stopPropagation();
  logoutBtn.classList.toggle('show');
});

// === Hide sidebar and logout button when clicking outside ===
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menu = document.querySelector('.menu');

  if (!sidebar.contains(event.target) && !menu.contains(event.target)) {
    sidebar.classList.remove('show');
  }

  if (!optionsDiv.contains(event.target) && !logoutBtn.contains(event.target)) {
    logoutBtn.classList.remove('show');
  }
});
