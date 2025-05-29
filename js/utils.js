function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function loadQuizData(category) {
  const response = await fetch(`data/${category}.json`);
  const data = await response.json();
  return data;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Aap yahan aur helper functions bhi add kar sakte hain