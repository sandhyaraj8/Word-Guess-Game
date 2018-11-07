// //Global Variable
//--------------------------------------------------------------------
// Arrays and Variables for holding data
var wordOptions = ["lion", "tiger", "giraffe", "elephant", "dog", "rabbit", "cat", "leopard", "deer", "bear"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongletters = [];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;



//Functions (Reusable blocks of code that I will call upon when needed)
//----------------------------------------------------------------------

function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //Populate blanks and successes with right number of blanks.
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("-");
    }

    //Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" "); // .join makes the commas go away between blank spaces.
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;


    //Testing / Debugging
    console.log("selectedWord= "+selectedWord);
    console.log("lettersinWord= "+lettersinWord);
    console.log("numBlanks= "+numBlanks);
    console.log("blanksAndSuccesses= "+blanksAndSuccesses);
}

function checkLetters(letter) {
    //check if letter exists in the code
    // alert(letter);
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
            //        alert("letter Found");  (testing purpose)
        }
    }
    console.log("isLetterInWord=" +isLetterInWord);

    //Check where in word letter exists, then populate out blanksAndSuccesses array.
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    //letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    //testing
    console.log("blanksAndSuccesses= "+ blanksAndSuccesses);
    roundComplete();

}

function roundComplete(){
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + "| Guesses Left " + guessesLeft);

    // Update the HTML to reflect the most recent count status
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML =blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    //Check if user won
    if (lettersinWord.toString() == blanksAndSuccesses.toString()){
        winCount++;
        alert("You Won!");

        //Update the wind counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();

    }
    //check if user as lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You lost!");
    // update the html
    document.getElementById("lossCounter").innerHTML =lossCount;
    startGame();

    }
}


//Main process
//---------------------------------------------------------------------

//Initiates the code the first time
startGame();


//Register keyclicks

document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log('letterGuessed=' + letterGuessed);

    checkLetters(letterGuessed);
    //Testing /Debugging

}