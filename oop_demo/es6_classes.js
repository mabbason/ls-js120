
class HitSong {
  constructor(title, date) {
    this.title = title;
    this.dateCreated = date;
  }

  genericLyrics() {
    return 'Not too specific, not too edgy, but still relevent, upbeat.';
  }
}

class DanceHitSong extends HitSong {
  constructor(title, date) {
    super(title, date);
  }

  phatBeat() {
    return 'Four on the floor am I right??';
  }
  catchyHook() {
    return "little funky, almost annoying... but it won't leave your Head";
  }
}

let RockHitSong = class extends HitSong {
  constructor(title, date) {
    super(title, date);
  }

  lyricalHook() {
    return 'I could sing this all day... oh wait... I have been.';
  }
  static solidGuitarRiff() {
    return "More cowbell! No that's not it... DISTORTION!";
  }
}

let leanOn = new DanceHitSong('Lean On', 2015);
let bornToBeWild = new RockHitSong('Born To Be Wild', 1968);

console.log(RockHitSong.solidGuitarRiff());
console.log(bornToBeWild.lyricalHook());

console.log(bornToBeWild.solidGuitarRiff());

Object.create()
bornToBeWild.hasOwnProperty();

