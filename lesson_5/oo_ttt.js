/*
Game (n)
Board (n)
Row (n)
Square (n)
Marker (n)
Player (n)
  Mark (v)
  Play (v)
  Human (n)
  Computer (n)
*/

class Board {
  constructor() {
    this.squares = {
      "1": "X",
      "2": " ",
      "3": " ",
      "4": " ",
      "5": "O",
      "6": " ",
      "7": " ",
      "8": " ",
      "9": " ",
    };

    //STUB
    // model 3X3 grid
    // data structure, array, object, etc?
    // what does the structure need to store
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
}

class Row {
  constructor() {
    //STUB 
    // need to identify a three square "row"
  }
}

class Square {
  constructor() {
    //STUB
    // need to track what player marker is in the square, or empty
  }
}

class Marker {
  constructor() {
    //STUB
    // a player's "piece" on the board
  }
}

class Player {
  constructor() {
    //STUB
    // need to track the player decision on where to place a square
  }

  mark() {
    //STUB
    //need to get the player's decision to store in the board
  }

  play() {
    //STUB
    //need to get the player's decision
  }
}

class Human extends Player {
  constructor() {
    //STUB
  }
}

class Computer extends Player {
  constructor() {
    //STUB
  }
}

class TTTGame {
  constructor() {
    //STUB
    // what is state for game? board, players
    this.board = new Board();
  }

  play() {
    // SPIKE
    this.displayWelcomeMsg();

    while (true) {
      this.board.display();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if(this.gameOver()) break;
      break;
    }

    this.displayResults();
    this.displayGoodbyeMsg();
    
  }

  displayWelcomeMsg() {
    console.log(`Welcome to Tic-Tac-Toe!`);
  }

  displayGoodbyeMsg() {
    console.log(`Thanks for playing Tic-Tac-Toe! Ya'll come back now!`);
  }

  firstPlayerMoves() {
    //STUB
  }

  secondPlayerMoves() {
    //STUB
  }

  displayResults() {
    //STUB
  }

  gameOver() {
    //STUB
    return false;
  }

}

let game = new TTTGame();
game.play();