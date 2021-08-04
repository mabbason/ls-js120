
function HitSong(title, date) {
  this.title = title;
  this.dateCreated = date;
};
HitSong.prototype.genericLyrics = function () {
  return 'Not too specific, not too edgy, but still relevent, upbeat.';
}; 

function DanceHitSong(title, date) {
  HitSong.call(this, title, date)
};

DanceHitSong.prototype = Object.create(HitSong.prototype);
DanceHitSong.prototype.constructor = DanceHitSong;

DanceHitSong.prototype.phatBeat = function () {
  return 'Four on the floor am I right??';
};
DanceHitSong.prototype.catchyHook = function () {
  return "little funky, almost annoying... but it won't leave your Head";
}; 

function RockHitSong(title, date) {
  HitSong.call(this, title, date)
};

RockHitSong.prototype = Object.create(HitSong.prototype);
RockHitSong.prototype.constructor = RockHitSong;

RockHitSong.prototype.lyricalHook = function () {
  return 'I could sing this all day... oh wait... I have been.';
};
RockHitSong.prototype.solidGuitarRiff = function () {
  return "More cowbell! No that's not it... DISTORTION!";
}; 

let leanOn = new DanceHitSong('Lean On', 2015);
let bornToBeWild = new RockHitSong('Born To Be Wild', 1968);
