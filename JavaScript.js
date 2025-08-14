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


console.log(getComputerChoice());