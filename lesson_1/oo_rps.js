const readline = require('readline-sync');

const RPSGame = {
  winningScore: 5,
  choices: {
    rock: {
      letter: 'r',
      winningMoves: ['scissors', 'lizard'],
    },
    paper:{
      letter: 'p',
      winningMoves: ['rock', 'spock'],
    },
    scissors:{
      letter: 's',
      winningMoves: ['paper', 'lizard'],
    },
    lizard: {
      letter: 'l',
      winningMoves: ['paper', 'spock'],
    },
    spock: {
      letter: 'k',
      winningMoves: ['scissors', 'rock'],
    },
  },
  human: createHuman(),
  computer: createComputer(),
  roundsPlayed: 0,

  enterToContinue() {
    console.log('\nPress enter to continue.');
    readline.question();
  },

  displayWelcomeMsg() {
    console.log(`Welcome to Rock, Paper, Scissors, Lizard, Spock!`);
    console.log('________________________________________\n');
    console.log(`The match winner is the first to score ${this.winningScore} points\n`);
  },

  displayGoodbyeMsg() {
    console.clear();
    console.log(`Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!`);
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let textPad = Math.ceil((8 - humanMove.length) / 2);
    console.log(`\nYou chose      The computer chose`);
    console.log(`---------  vs  ------------------`);
    console.log(`${humanMove.padStart(humanMove.length + textPad, ' ').padEnd(textPad, ' ')}      ` +
    `${computerMove.padStart(13, ' ')}`);
    let winner = this.isRoundWinner();
    if (winner === 'human') {
      console.log(`        You win!`);
    } else if (winner === 'computer') {
      console.log(`    The computer won.`);
    } else {
      console.log(`       It's a tie.`);
    }
    console.log(`\nThe current match score is:`);
    console.log(`You: ${this.human.roundScore}  Computer: ${this.computer.roundScore}`);
  },

  playAgain() {
    let response;
    while (true) {
      console.log('\nWould you like to play again? y/n');
      response = readline.question().toLowerCase();
      if (['y', 'n'].includes(response)) break;
      console.log(`That is an invalid response.`);
    }
    return response === 'y';
  },

  isMatchWinner() {
    if ((this.human.roundScore >= this.winningScore) ||
        (this.computer.roundScore >= this.winningScore)) {
      return this.human.roundScore >= this.winningScore ? 'human' : 'computer';
    }
    return false;
  },

  isRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (this.choices[humanMove].winningMoves
      .includes(computerMove)) {
      return 'human';
    } else if (this.choices[computerMove].winningMoves
      .includes(humanMove)) {
      return 'computer';
    }
    return false;
  },

  initializeNewMatch() {
    this.human.roundScore = 0;
    this.computer.roundScore = 0;
    this.roundsPlayed = 0;
  },

  displayMatchResults() {
    if (this.isMatchWinner() === 'human') {
      console.log(`\nYou have won the whole match!`);
    } else {
      console.log(`\nThe computer has won the match.`);
    }
    console.log(`You have won ${this.human.matchScore} ${this.human.matchScore === 1 ? 'match' : 'matches'}, while the computer has won ${this.computer.matchScore}`);
  },

  increaseRoundPts(winner) {
    if (winner === 'human') {
      this.human.roundScore += 1;
    } else if (winner === 'computer') {
      this.computer.roundScore += 1;
    }
  },

  increaseMatchPts(winner) {
    if (winner === 'human') {
      this.human.matchScore += 1;
    } else {
      this.computer.matchScore += 1;
    }
  },

  storeMoveHistory(winner) {
    if (winner === 'human') {
      this.computer.losingChoiceHistory[this.computer.move] += 1;
    } else if (winner === 'computer') {
      this.human.losingChoiceHistory[this.human.move] += 1;
    }
  },

  endOfRoundCalculations(winner) {
    this.increaseRoundPts(winner);
    this.storeMoveHistory(winner);
    this.roundsPlayed += 1;
  },

  play() {
    this.displayWelcomeMsg();
    this.enterToContinue();
    while (true) {
      this.initializeNewMatch();
      while (!this.isMatchWinner()) {
        this.human.choose();
        this.computer.choose();
        this.endOfRoundCalculations(this.isRoundWinner());
        this.displayRoundWinner();
      }
      this.increaseMatchPts(this.isMatchWinner());
      this.displayMatchResults();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMsg();
  },
};

RPSGame.play();

// eslint-disable-next-line max-lines-per-function
function createPlayer() {
  return {
    move: null,
    losingChoiceHistory: {
      rock: 0,
      paper: 0,
      scissors: 0,
      lizard: 0,
      spock: 0,
    },
    roundScore: 0,
    matchScore: 0,

    getMostLosingChoices() {
      let history = this.losingChoiceHistory;
      let mostLosing = 1;
      let mostLosingChoicesArr = Object.keys(history)
        .filter(choice => {
          if (history[choice] >= mostLosing) {
            mostLosing = history[choice];
          }
          if (history[choice] >= mostLosing) return true;
          return false;
        });
      return mostLosingChoicesArr;
    }
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = Object.keys(RPSGame.choices);
      let currentChoice;
      let decisions = 0;
      do {
        decisions += 1;
        currentChoice = choices[Math.floor(Math.random() * choices.length)];
        if (!this.getMostLosingChoices().includes(currentChoice)) break;
      } while (decisions <= 1);

      this.move = currentChoice;
    },
  };
  return Object.assign(playerObject, computerObject);
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      if (RPSGame.roundsPlayed !== 0) RPSGame.enterToContinue();
      console.clear();
      let letterChoice;

      while (true) {
        let mostLossesArr = this.getMostLosingChoices();
        if (mostLossesArr.length !== 0 &&
          mostLossesArr.length !== Object.keys(RPSGame.choices).length) {
          console.log(`Your current most losing choice(s) are: ${mostLossesArr.join(', ')}`);
        }
        console.log('Please choose rock(r), paper(p), scissors(s), lizard(l), or spock(k):');
        letterChoice = readline.question().toLowerCase();
        if (Object.keys(RPSGame.choices).map(key => RPSGame.choices[key].letter)
          .includes(letterChoice)) break;
        console.log(`Sorry, that is an invalid choice.`);
      }
      this.move = Object.keys(RPSGame.choices)
        .filter(choice => RPSGame.choices[choice].letter === letterChoice)[0];
    },
  };
  return Object.assign(playerObject, humanObject);
}