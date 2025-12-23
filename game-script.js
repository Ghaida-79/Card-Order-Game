let cards = Array.from(document.querySelectorAll(".card"));
let game = document.querySelector(".game");

cards.sort(() => Math.random() - 0.5);
cards.forEach(card => game.appendChild(card));

let expected = 1;
let mistakes = 0;

let attemptsText = document.querySelector(".attempts");
let bestText = document.querySelector(".best");

let bestScore = localStorage.getItem("bestScore");
if (bestScore !== null) bestText.innerHTML = bestScore;

cards.forEach(card => {
  card.onclick = function() {
    let number = card.querySelector(".back").innerHTML;
    card.className += " flip";

    if (number == expected) {
      expected++;
    } else {
      mistakes++;
      attemptsText.innerHTML = mistakes;
      resetGame();
      return;
    }

    if (expected > 9) {
      alert("You win!🎉🎉");
      if (bestScore === null || mistakes < bestScore) {
        localStorage.setItem("bestScore", mistakes);
        bestText.innerHTML = mistakes;
        bestScore = mistakes;
      }
      mistakes = 0;
      attemptsText.innerHTML = 0;
      resetGame();
    }
  }
});

function resetGame() {
  expected = 1;
  cards.forEach(card => card.className = "card");
}