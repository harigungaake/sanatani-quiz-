// URL se score aur total nikaalna
const params = new URLSearchParams(window.location.search);
const score = parseInt(params.get("score"));
const total = parseInt(params.get("total"));

// Score display karna
const scoreTextEl = document.getElementById("scoreText");
scoreTextEl.innerText = `${score}/${total}`;

// Score ke hisaab se color change
if (score <= 4) {
  scoreTextEl.style.color = "red";
} else if (score <= 7) {
  scoreTextEl.style.color = "orange";
} else {
  scoreTextEl.style.color = "green";
}

// Score ke hisaab se motivational message
const msgEl = document.getElementById("resultMessage");
const hintEl = document.querySelector(".hint");

if (score === total) {
  msgEl.innerText = "अद्भुत! आपने पूरे सही उत्तर दिए! आप प्रतिभाशाली हैं।";
  hintEl.style.display = "none";  // Hint ko hata do
  startConfetti();
} else if (score > total * 0.7) {
  msgEl.innerText = "बहुत बढ़िया! आपने अच्छा प्रदर्शन किया है। थोड़ी मेहनत और करें।";
  hintEl.style.display = "block";
  startConfetti();
} else if (score > total * 0.4) {
  msgEl.innerText = "अच्छा प्रयास! थोड़ा और अभ्यास करें तो और बेहतर कर सकते हैं।";
  hintEl.style.display = "block";
} else {
  msgEl.innerText = "प्रयास जारी रखें! अभ्यास से ही सुधार होगा।";
  hintEl.style.display = "block";
}

// Play again button
function goBack() {
  window.location.href = "index.html";
}


// Confetti animation (simple and lightweight)
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const confettiCount = 150;
  const confetti = [];

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Confetto {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H - H;
      this.size = randomRange(5, 10);
      this.speed = randomRange(2, 5);
      this.angle = Math.random() * 360;
      this.spin = randomRange(0.1, 0.3);
      this.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    }
    update() {
      this.y += this.speed;
      this.angle += this.spin;
      if (this.y > H) {
        this.y = -this.size;
        this.x = Math.random() * W;
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
      ctx.restore();
    }
  }

  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetto());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    confetti.forEach(c => {
      c.update();
      c.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  // Confetti ko 5 seconds ke baad hata dein
  setTimeout(() => {
    ctx.clearRect(0, 0, W, H);
  }, 5000);
}