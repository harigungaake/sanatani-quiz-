let selectedCategory = '';
let isStartBtnVisible = false; // Yeh flag track karega ki start button already visible hai ya nahi

function toggleCategory(card, category) {
  const wasSelected = card.classList.contains('selected');
  document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('selected'));
  selectedCategory = '';

  const startBtn = document.getElementById('startBtn');
  
  if (!wasSelected) {
    card.classList.add('selected');
    selectedCategory = category;

    if (!isStartBtnVisible) {
      startBtn.style.display = 'inline-block';
      startBtn.classList.remove('pop-in');
      void startBtn.offsetWidth; // Reflow trigger to restart animation
      startBtn.classList.add('pop-in');
      isStartBtnVisible = true;
    }
    
  } else {
    startBtn.style.display = 'none';
    isStartBtnVisible = false;
  }

  document.getElementById('message').textContent = '';
}

function startQuiz() {
  if (selectedCategory) {
    window.location.href = `quiz.html?category=${selectedCategory}`;
  }
}

// Hamburger menu toggle
document.querySelector('.menu').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('show');
});

// Click outside to close sidebar
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menu = document.querySelector('.menu');
  
  if (!sidebar.contains(event.target) && !menu.contains(event.target)) {
    sidebar.classList.remove('show');
  }
});
