const inputs = document.querySelector(".word"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess span"),
  mistakes = document.querySelector(".wrong span"),
  resetBtn = document.querySelector(".reset"),
  hintBtn = document.querySelector(".showhint"),
  hintElement = document.querySelector(".hint"),
  typeInput = document.querySelector(".type-input");

//        Initializing game variables
let word,
  incorrectLetters = [],
  correctLetters = [],
  maxGuesses;

//      Select random word from word list and set up game
const startNewGame = () => {
  alert("New game started! Guess New Word >.<");

  //      Hide Hint Element
  hintElement.style.display = "none";
  hintElement.style.opacity = "0";

  //       Choose random word from db and setup game

  const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranWord.word;
  //      If word chars >= 5 then max guess = 8 else max guess = 6

  maxGuesses = word.length >= 5 ? 8 : 6;
  incorrectLetters = [];
  correctLetters = [];
  hintTag.innerText = ranWord.hint;
  guessLeft.innerText = incorrectLetters;
  mistakes.innerText = incorrectLetters;

  //      Create input for each letter of word
  inputs.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    inputs.appendChild(input);
  }
};
//        Handle user input and update game stats
const handleInput = (e) => {
  //ignore non-;etters input and letters that ahve already guessed
  const key = e.target.value.toLowerCase();
  if (
    key.match(/^[a-z]+$/i) &&
    !incorrectLetters.includes(`${key}`) &&
    !correctLetters.includes(`${key}`)
  ) {
    //check if the letter is in word
    if (word.includes(key)) {
      //update correct guess
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelectorAll("input")[i].value += key;
        }
      }
      correctLetters += key;
    } else {
      //Update incorrect guess
      maxGuesses--;
      incorrectLetters.push(`${key}`);
      mistakes.innerText = incorrectLetters;
    }
  }
  // Update remain guess and check for win lose conditions
  guessLeft.innerText = maxGuesses;
  if (correctLetters.length === word.length) {
    alert(`Congrats, you found the word ${word.toUpperCase()}`);
    startNewGame();
  } else if (maxGuesses < 1) {
    alert("Game Over! you dont have remaining guesses!");
    for (let i = 0; i < word.length; i++) {
      //fill inputs with correct words
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }
  // Clear input field
  typeInput.value = "";
};

//show hint element

const showHintElement = () => {
  hintElement.style.display = "block";
  hintElement.style.opacity = "1";
};

//        setup ekvent listeners

resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();
