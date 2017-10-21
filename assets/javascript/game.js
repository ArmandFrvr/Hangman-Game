




var game = {
  "score": 0,
  "guessesRemaining": 0,
  "lettersGuessed": [],
  "currentWord" : "",
  "currentState": [],


  "dictionary": ["PICARD", "ENTERPRISE", "ROMULAN", "PHASER", "IMZADI", "Q",
                 "HOLODECK", "FERENGI", "KLINGON", "PRIME DIRECTIVE"],

  // Returns a random word.
  getWord: function() {
    return this.dictionary[randomNum(0, this.dictionary.length - 1)];
  },

  guessLetter: function(letter) {
    // if letter was already guessed, return.
    if (this.lettersGuessed.indexOf(letter) >= 0) {
      return;
    }

    // else if letter is not in word, add letter to lettersGuessed, decrease guessesRemaining, and return.
    // -- But if gussesRemaining hits 0, you lose this round.
    else if (!currentWord.includes(letter)) {
      this.lettersGuessed.push(letter);
      this.guessesRemaining--;

      if(this.guessesRemaining === 0) {
        alert("YOU ARE NOT A TREKKIE!!!  You lose this round.");
        this.reset(); // restart the game
        return;
      }
    }

    // Letter is in the word and not already guessed, so let's update stuff.
    else {
      // Add letter to list of guessed letters
      this.lettersGuessed.push(letter);

      // Replace the underscores with the letter for all occurrences of the letter in the word
      this.currentState.forEach(function(currentValue, index, arr) {
        if(this.currentWord.charAt(index) === letter) {
          arr[index] = letter;
        }
      });


      // If the word is complete, we win.
      if(this.currentState.indexOf("_") === -1) {
        alert("Congratulations!  You correctly guessed the word " + this.currentWord + ".")
        this.score++;

        // Do decorative stuff here (pic/music/whatever)

        this.reset();
      }

      return;
    }

  },

  reset: function() {
    this.currentState = [];
    this.lettersGuessed = [];
    this.currentWord = getWord();
    console.log("New word is: " + this.currentWord);
    this.guessesRemaining = this.currentWord.length + 5;

    for(var i = 0; i < this.currentWord.length; i++) {
      this.currentState.push("_");
    }
  }

}


//After the user wins/loses the game should automatically choose another word and make the user play it.

$(document).ready(function() {

  game.reset();

  document.onkeyup = function(event) {
    var playerKey = event.key;
    playerKey = playerKey.toUpperCase();

    game.guessLetter(playerKey);
  }








});


// Use key events to listen for the letters that your players will type.



function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);

}