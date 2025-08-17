console.log("Hello World!")


// Game configuratino and constants
const CONFIG = {
    MAX_SCORE: 5,
    INITIAL_MESSAGE: "Choose your move to start the game!"
}

const CHOICES = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors",
};

const CHOICE_EMOJIS = {
    [CHOICES.ROCK]: "👊",
    [CHOICES.PAPER]: "✋",
    [CHOICES.SCISSORS]: "✌️",
}

const RESULTS = {
    DRAW: "draw",
    HUMAN_WIN: "human",
    COMPUTER_WIN: "computer"
};


const WIN_CONDITIONS = {
        [CHOICES.ROCK]: CHOICES.SCISSORS, //rock beats scissors
        [CHOICES.PAPER]: CHOICES.ROCK, //paper beats rock
        [CHOICES.SCISSORS]: CHOICES.PAPER, //scissors beats paper
    };


// game state management
const gameState = {
    humanScore: 0,
    computerScore: 0,
    maxScore: CONFIG.MAX_SCORE,
    isGameOver: false
};

// utility functions

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    const choices = Object.values(CHOICES);
    return choices[getRandomInt(choices.length)];
}

function capitalizeFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function formatChoice(choice) {
    const emoji = CHOICE_EMOJIS[choice] || "";
    const capitalized = capitalizeFirst(choice);
    return ` ${capitalized} ${emoji}`;
}

// Game logic functions
function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log("It's a draw!");
        return RESULTS.DRAW;
    };
// define the win conditions - e.g. the win condition for a choice of rock is for the other choice to be scissors
    return WIN_CONDITIONS[humanChoice] === computerChoice ? RESULTS.HUMAN_WIN : RESULTS.COMPUTER_WIN;
}

//Create the result message for each round
function getResultMessage(humanChoice, computerChoice, result) {
    const humanFormatted = formatChoice(humanChoice);
    const computerFormatted = formatChoice(computerChoice);

    const choicesMsg = `You chose ${humanFormatted}, Computer chose ${computerFormatted}.` ;

    if (result === RESULTS.DRAW) {
        return choicesMsg + " It's a draw! 🤝"
    } else if (WIN_CONDITIONS[humanChoice] === computerChoice) {
        return choicesMsg + ` ${humanFormatted} beats ${computerFormatted}, so you get a point!`;
    } else {
        return choicesMsg + ` ${computerFormatted} beats ${humanFormatted}, so Computer gets a point!`
    }
}

// Update the score based on the result of each round
function updateScore(result) {
    if (result === RESULTS.HUMAN_WIN) {
        gameState.humanScore++;
    } else if (result === RESULTS.COMPUTER_WIN) {
        gameState.computerScore++;
    }
}


// UI updates

function updateScoreboard() { 
    document.getElementById("player-score").textContent = `Player: ${gameState.humanScore}`;
    document.getElementById("computer-score").textContent =`Computer: ${gameState.computerScore}`;
}

function updateGameMessage(message) {
    document.getElementById("game-msg").textContent = message;
}

function updateUi(humanChoice, computerChoice, result) {
   updateScoreboard();
    
    if (result === "reset" ){
        updateGameMessage(CONFIG.INITIAL_MESSAGE);
    } else {
        const message = getResultMessage(humanChoice, computerChoice, result);
        updateGameMessage(message);
    }
}

function disableChoiceButtons(disabled = true) {
    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach(button => {
        button.disabled = disabled;
    });
}

// Check if game has ended and handle game over state
function gameFinish() {
    if (gameState.humanScore >= gameState.maxScore) {
        gameState.isGameOver = true;
        updateGameMessage("Congratulations, you won the game! 🏆");
        console.log("Player wins the game!")
        disableChoiceButtons(true);
        return true;
    } else if (gameState.computerScore >= gameState.maxScore) {
        gameState.isGameOver = true;
        updateGameMessage("Computer won the game, bad luck! 🤖");
        console.log("Computer wins the game!")
        disableChoiceButtons(true);
        return true;
    }
    return false;
}

// Reset the game to initial state
function resetGame() {
    gameState.humanScore = 0;
    gameState.computerScore = 0;
    gameState.isGameOver = false;


    // Reset the UI elements
    disableChoiceButtons(false);
    updateUi("", "", "reset");

    console.log("New game started!");
}

function playRound(humanChoice) {
    //prevent playing if the game is over.
    //gameState.isGameOver is already a boolean value (true or false), so don't need to compare it to anything!
    if (gameState.isGameOver) {
        document.getElementById("game-msg").textContent = "Game Over! Press reset to play again.";
        return ;
    }

    const computerChoice = getComputerChoice();
    const result = determineWinner(humanChoice, computerChoice);

    updateScore(result);
    updateUi(humanChoice, computerChoice, result);    

    if(!gameFinish()) {
        console.log(`Score: Human ${gameState.humanScore} - ${gameState.computerScore} Computer`);
    }    

}


//Event listeners and initialisation 
function initializeGame () {
 const buttons = document.querySelectorAll(".choice-btn");

 buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const choice = e.target.id.replace("-button", "") // turns "rock-button" into "rock"
        playRound(choice);
    });
 });

const resetButton = document.querySelector(".reset-btn");
if (resetButton) {
    resetButton.addEventListener("click", resetGame);
}

updateUi ("", "", "reset");

}

document.addEventListener("DOMContentLoaded", initializeGame);
