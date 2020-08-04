let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess.").toUpperCase();
console.log(word);






//BELOW ARE SOME VARIABLES I AM MAKING
let displayWord = new Array(0);
displayWord.length = word.length
displayWord.fill("_");
let form = document.getElementById("myForm");
let guess;
let gameWon;

const maxStrikes = 6; 
let strikes = 0; // the number of incorrect guesses made so far

let strikeLetters = new Array(0); // this will contain every letter that has been incorrectly guessed.

drawWordProgress(); // run this now, to draw the empty word at the start of the game.


form.addEventListener("submit", processGuess);

function processGuess(event) {
    // This preventDefault function is required to stop our form from refreshing the page. 
    event.preventDefault();
    guess = document.getElementById("guess").value.toUpperCase();
    form.reset();
    // the value of the <form>'s <input> element, toUpperCase()!
    // IF PLAYER TWO HAS NOT INCORRECTLY GUESSED TOO MANY TIMES
    if (!gameWon) {
        if (strikes < maxStrikes) {
            if (guess.length !== 1) {
                alert("Please enter a guess that is one letter.");
            } else {
                if(word.includes(guess)==true) {
                    for (i=0; i<word.length; i++) {  //Loop through word to find what letter is a match, call drawWordProgress to put up correct letter
                        if (word[i]==guess) {
                            drawWordProgress();
                        } 
                    }
                } else { //This piece should only run if the guess is wrong.
                    strikeLetters[strikes] = guess;
                    strikes++;
                    drawStrikeLetters();
                    drawGallows();
                    if (strikes >= 6) {
                        alert("Player 1 wins");
                    }
                }
            }       
        } else {
            alert("The game is over!");
        }
    }
}


// Manipulates the DOM to write all the strike letters to the appropriate section in hangman.html
function drawStrikeLetters() {
    document.getElementById("strikeList").innerHTML = strikeLetters.toString();
}
// Manipulates the DOM to write the successfully guessed letters of the word, replacing them with dashes if not yet guessed
    
    
function drawWordProgress() {    
        for (let i = 0; i < word.length; i++) {
            if (guess == word[i]) {
                displayWord[i] = word[i];
            } 
        } 
        document.getElementById("wordProgress").innerHTML = displayWord.join(" ");
        if (word == displayWord.join("")) {
            gameWon = true;
            alert("Player 2 has won!");
        }
} 


// Manipulates the DOM to update the image of the gallows for the current game state.
let img = document.getElementById("gallowsImg");
function drawGallows() { 
    switch (strikes) {
        case 0:
            img.src = "images/strike-0.png";
            break;
        case 1:
            img.src = "images/strike-1.png";
            break;
        case 2:
            img.src = "images/strike-2.png";
            break;
        case 3:
            img.src = "images/strike-3.png";
            break;
        case 4:
            img.src = "images/strike-4.png";
            break;
        case 5:
            img.src = "images/strike-5.png";
            break;
        case 6:
            img.src = "images/strike-6.png";
            break;
    }
}

