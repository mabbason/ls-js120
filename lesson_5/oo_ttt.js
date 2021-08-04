const readline = require('readline-sync');

class Square {
  static BLANK_MARKER = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = " ") {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.BLANK_MARKER;
  }
}

class Board {
  constructor() {
    this.clear();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }

  clear() {
    this.squares = {};
    for (let cntr = 1; cntr <= 9; ++cntr) {
      this.squares[cntr] = new Square();
    }
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }

  joinOr(arr, sep = ', ', word = 'or') {
    let numSequence = '';

    if (arr.length === 1) {
      numSequence += arr[0];
    } else if (arr.length === 2) {
      numSequence += `${arr[0]} ${word} ${arr[1]}`;
    } else if (arr.length >= 3) {
      for (let index = 0; index < arr.length; index += 1) {
        if (index === arr.length - 1) {
          numSequence += `${word} ${arr[index]}`;
        } else {
          numSequence += `${arr[index]}${sep}`;
        }
      }
    }
    return numSequence;
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    console.clear();
    this.displayWelcomeMsg();

    while (true) {
      this.playGameOnce();

      if (!this.playAgain()) break;

    }

    this.displayGoodbyeMsg();
  }

  playGameOnce() {
    this.board.clear();
    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      console.clear();
      console.log("");

      this.computerMoves();
      if (this.gameOver()) break;
    }
    this.displayResults();
  }

  playAgain() {
    let response;
    while (true) {
      console.log('\nWould you like to take yer chances again? (y or n)');
      response = readline.question().toLowerCase();

      if (response === 'y' || response === 'n') {
        console.clear();
        break;
      }

      console.clear();
      console.log(`Lis'n pal... it's only 'y' or 'n'... try again`);

    }
    return response === 'y';
  }


  displayWelcomeMsg() {
    console.clear();
    console.log("Welcome to Danger Dan's Rootin' Tootin' Tic Tac Toe!");
  }

  displayGoodbyeMsg() {
    console.log(`Thanks for playing Rootin' Tootin' Tic-Tac-Toe! Ya'll come back now!`);
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Cowboy up and choose a square (${this.human.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log(`Sorry pardner, that ain't a valid choice.`);
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices =  this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Git 'er done.");
    } else if (this.isWinner(this.computer)) {
      console.log("I beat you! Bet yer din't see that comin'!!");
    } else {
      console.log("A tie game. Mmmhmmm... next.");
    }
  }

  gameOver() {
    return this.board.isFull() || this.somoneWon();
  }

  somoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

}

let game = new TTTGame();
game.play();