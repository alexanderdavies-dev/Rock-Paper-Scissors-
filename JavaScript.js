console.log("Hello World!")

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    let compnum = getRandomInt(3)
        if (compnum === 0 ) {
            return "Rock";
        }
        else if (compnum === 1) {
            return "Paper";
        }
        else if (compnum === 2) {
            return "Scissors";
        }
}

function getHumanChoice() {
    let humanChoice = prompt("Please enter Rock, Paper or Scissors: ");
    return humanChoice;
}

function playGame() {
    console.log("Starting a five-round game!")

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    console.log(`You chose: ${humanChoice}, Computer chose ${computerChoice}`);

    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (humanChoice === computerChoice) {
        console.log("It's a draw!");
        return "draw";
    }
    else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        console.log(`You win! ${humanChoice} beats ${computerChoice}`);
        humanScore++;
        return "human";
    }
    else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
        computerScore++;
        return "computer";
    }
}

for (let round = 1; round <=5; round++) {
    console.log(`\n--- Round ${round} ---`);

    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);

    console.log(`Score after round ${round}: Human ${humanScore} - ${computerScore} Computer`);
}

if (humanScore > computerScore) {
    console.log("Congrats! You won the game!");
}
else if (computerScore> humanScore) {
    console.log("Bad luck! Computer won the game!");
}
else {
    console.log("The game was a draw!");
}
}

playGame()