console.log("Hello World!")


// Game state 
const gameState = {
    humanScore: 0,
    computerScore: 0,
    maxScore: 5,
    isGameOver: false
};

// define constants for choices
const CHOICES = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors",
};

// define constants for results
const RESULTS = {
    DRAW: "draw",
    HUMAN_WIN: "human",
    COMPUTER_WIN: "computer"
};

// generates a random number 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// generates the computer's choice randomly - updated to use array indexing
function getComputerChoice() {
    const choices = [CHOICES.ROCK, CHOICES.PAPER, CHOICES.SCISSORS];
    return choices[getRandomInt(3)];
}

function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log("It's a draw!");
        return RESULTS.DRAW;
    };


// define the win conditions - e.g. the win condition for a choice of rock is for the other choice to be scissors
    const winConditions = {
        [CHOICES.ROCK]: CHOICES.SCISSORS,
        [CHOICES.PAPER]: CHOICES.ROCK,
        [CHOICES.SCISSORS]: CHOICES.PAPER,
    };
    return winConditions[humanChoice] === computerChoice ? RESULTS.HUMAN_WIN : RESULTS.COMPUTER_WIN;
}

function updateScore(result) {
    if (result === RESULTS.HUMAN_WIN) {
        gameState.humanScore++;
    } else if (result === RESULTS.COMPUTER_WIN) {
        gameState.computerScore++;
    }
}

function updateUi(humanChoice, computerChoice, result) {
    document.getElementById("player-score").textContent = `Player: ${gameState.humanScore}`;
    document.getElementById("computer-score").textContent =`Computer: ${gameState.computerScore}`;
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(humanChoice, computerChoice);

    updateScore(result);
    updateUi(humanChoice, computerChoice);    

console.log(`Score: Human ${gameState.humanScore} - ${gameState.computerScore} Computer`);
}




 const buttons = document.querySelectorAll(".choice-btn");

 buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const choice = e.target.id.replace("-button", "") // turns "rock-button" into "rock"
        playRound(choice);
    });
 });

