let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// URL se category lena
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("nextBtn");

fetch(`data/${category}.json`)
  .then(res => res.json())
  .then(data => {
    // Random 10 questions pick karo
    questions = getRandomQuestions(data, 10);
    showQuestion();
  })
  .catch(err => {
    quizContainer.innerHTML = "Questions load नहीं हो पाए।";
    console.error(err);
  });

// Random selection helper
function getRandomQuestions(data, count) {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
function showQuestion() {
  const q = questions[currentQuestionIndex];

  document.getElementById("progress").innerText = `${currentQuestionIndex + 1} / ${questions.length}`;
  document.getElementById("question").innerText = `Q${currentQuestionIndex + 1}. ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // Purana feedback div hata do agar ho to
  const existingFeedback = document.getElementById("feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Options ko shuffle karo
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswerText(opt); // yeh new version hai, index nahi bhej rahe
    btn.classList.add("option-btn");  // Fade transition ke liye class add ki
    optionsDiv.appendChild(btn);
  });

  nextBtn.style.display = "none";

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.innerText = "Submit";
  } else {
    nextBtn.innerText = "अगला प्रश्न";
  }
}

function selectAnswerText(selectedText) {
  const q = questions[currentQuestionIndex];
  const correctAnswer = q.answer;

  const buttons = document.querySelectorAll("#options button");

  // Buttons ko disable kar do
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.color = "#fff";

    if (btn.innerText.trim() === correctAnswer) {
      btn.classList.add("correct-answer");
    } else {
      btn.classList.add("wrong-answer");
    }
  });

  // Selected button ko white color do
  buttons.forEach(btn => {
    if (btn.innerText.trim() === selectedText.trim()) {
      btn.style.color = "#fff";
    }
  });

  if (selectedText.trim() === correctAnswer) {
    score++;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    showFeedback(true);
  } else {
    quizContainer.classList.add("shake");
    showFeedback(false);
    setTimeout(() => {
      quizContainer.classList.remove("shake");
    }, 500);
  }

  nextBtn.style.display = "inline-block";
}


function showFeedback(isCorrect) {
  let feedbackDiv = document.getElementById("feedback");
  if (!feedbackDiv) {
    feedbackDiv = document.createElement("div");
    feedbackDiv.id = "feedback";
    quizContainer.appendChild(feedbackDiv);
  }
  feedbackDiv.innerText = isCorrect ? "सही उत्तर!" : "गलत उत्तर!";
  feedbackDiv.style.color = isCorrect ? "#11c311" : "#ff1b1b";
  feedbackDiv.style.fontSize = "15px";
  feedbackDiv.style.fontWeight = "bold";
  feedbackDiv.style.textAlign = "center";
  feedbackDiv.style.marginTop = "10px";
  feedbackDiv.style.marginLeft = "-150px";
  feedbackDiv.classList.add("feedback-animate");
}

// Animate and show next question
nextBtn.addEventListener("click", () => {
  quizContainer.classList.add("slide-out-left");

  quizContainer.addEventListener("animationend", function handler() {
    quizContainer.classList.remove("slide-out-left");
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
      quizContainer.classList.add("slide-in-right");
    } else {
      window.location.href = `result.html?score=${score}&total=${questions.length}`;
    }

    quizContainer.addEventListener("animationend", function handler2() {
      quizContainer.classList.remove("slide-in-right");
      quizContainer.removeEventListener("animationend", handler2);
    });

    quizContainer.removeEventListener("animationend", handler);
  });
});
