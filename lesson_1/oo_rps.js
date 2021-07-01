/*
# Write a textual description of the problem or exercise
  RPS is a two-player game where each player chooses one of
  three possible moves: rock, paper, or scissors. The winner
  is chosen by comparing their moves with the following rules:

  - Rock crushes scissors, i.e., rock wins against scissors.
  - Scissors cuts paper, i.e., scissors beats paper.
  - Paper wraps rock, i.e., paper beats rock.
  - If the players chose the same move, the game is a tie.

# Extract the significant nouns and verbs from the description
  Nouns: player, move, rule
  Verbs: choose, compare

# Organize and associate the verbs with the nouns
*/
const readline = require('readline-sync');

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMsg() {
    console.log(`Welcome to Rock, Paper, Scissors!`);
  },

  displayGoodbyeMsg() {
    console.log(`Thanks for playing Rock, Paper, Scissors. Goodbye!`);
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log(`You win!`);
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
               (computerMove === 'paper' && humanMove === 'rock') ||
               (computerMove === 'scissors' && humanMove === 'paper')) {
      console.log(`The computer won.`);
    } else {
      console.log(`It's a tie.`);
    }

  },

  playAgain() {
    let response;
    while (true) {
      console.log('Would you like to play again? y/n');
      response = readline.question().toLowerCase();
      if (['y', 'n'].includes(response)) break;
      console.log(`That is an invalid response.`);
    }
    return response === 'y';
  },

  play() {
    this.displayWelcomeMsg();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMsg();
  },
};

RPSGame.play();

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };
  return Object.assign(playerObject, computerObject);
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choiceLetterToWord(letter) {
      switch (letter) {
        case 'r' : return 'rock';
        case 'p' : return 'paper';
        default : return 'scissors';
      }
    },

    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock(r), paper(p), or scissors(s):');
        choice = readline.question();
        if (['r', 'p', 's'].includes(choice)) {
          choice = this.choiceLetterToWord(choice);
          break;
        }
        console.log(`Sorry, that is an invalid choice.`);
      }
      this.move = choice;
    },
  };
  return Object.assign(playerObject, humanObject);
}
/*
function createMove() {
  return {
    // possible state: type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state
  };
}

// Since we don't yet know where to put `compare`, let's define
// it as an ordinary function.
let compare = function(move1, move2) {
  // not yet implemented
};

*/