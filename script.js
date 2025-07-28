// ====== DYNAMIC POPUP TO ENTER TARGET SCORE ======
const modal = document.createElement("div");
modal.className = "start-screen";
modal.innerHTML = `
  <div class="popup-box">
    <h2>Set Winning Score</h2>
    <input type="number" id="maxScoreInput" placeholder="e.g. 5" min="1" max="99" />
    <button id="startBtn">Start Game</button>
  </div>
`;
document.body.appendChild(modal);

// ====== GAME SETUP ======
const computerImg = document.querySelector('.computer img');
const playerImg = document.querySelector('.player img');
const computerScoreEl = document.querySelector('.computer-score');
const playerScoreEl = document.querySelector('.player-score');
const message = document.querySelector('.message');
const buttons = document.querySelectorAll('.options button');
const container = document.querySelector('.container');

let maxScore = 0;
let playerScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissor'];

// ====== START GAME BUTTON LOGIC ======
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "startBtn") {
    const maxScoreInput = document.getElementById("maxScoreInput");
    const val = parseInt(maxScoreInput.value);
    if (isNaN(val) || val < 1 || val > 99) {
      alert("Please enter a valid number between 1 and 99.");
      return;
    }
    maxScore = val;
    playerScore = 0;
    computerScore = 0;
    computerScoreEl.textContent = '0';
    playerScoreEl.textContent = '0';
    message.textContent = 'CHOOSE YOUR MOVE';

    modal.style.display = "none";
    container.style.display = "block";
  }
});

// ====== MAIN GAME LOGIC ======
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Add shake animations
    computerImg.classList.add('shakeComputer');
    playerImg.classList.add('shakePlayer');

    setTimeout(() => {
      computerImg.classList.remove('shakeComputer');
      playerImg.classList.remove('shakePlayer');

      // Normalize player's choice
      let playerChoice = button.textContent.toLowerCase();
      if (playerChoice === "stone") playerChoice = "rock";
      if (playerChoice === "scissors") playerChoice = "scissor";

      const computerChoice = choices[Math.floor(Math.random() * choices.length)];

      // Update gesture images
      playerImg.src = `${playerChoice}Player.jpg`;
      computerImg.src = `${computerChoice}Computer.jpg`;

      // Decide the round winner
      if (playerChoice === computerChoice) {
        message.textContent = "It's a Draw!";
      } else if (
        (playerChoice === 'rock' && computerChoice === 'scissor') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissor' && computerChoice === 'paper')
      ) {
        playerScore++;
        message.textContent = "You Win!";
      } else {
        computerScore++;
        message.textContent = "Computer Wins!";
      }

      // Update score display
      playerScoreEl.textContent = playerScore;
      computerScoreEl.textContent = computerScore;

      // Check for final winner
      if (playerScore === maxScore || computerScore === maxScore) {
        setTimeout(() => {
          const winner = playerScore === maxScore ? "You" : "Computer";
          alert(`${winner} won the game!`);

          // Reset everything
          modal.style.display = 'flex';
          container.style.display = 'none';
          document.getElementById("maxScoreInput").value = '';
        }, 100); // slight delay to show score before alert
      }

    }, 900); // match animation delay
  });
});
