console.log(partyRock.hasOwnProperty('title'));
console.log(partyRock.hasOwnProperty('phatBeat'));

HitSong.prototype.phatBeat = function () {
  return 'Four on the floor am I right??';
};
HitSong.prototype.catchyHook = function () {
  return "little funky, almost annoying... but it won't leave your Head";
}; 

function RockHitSong() {
};
RockHitSong.prototype.lyricalHook = function () {
  return 'I could sing this all day... oh wait... I have been.';
};
RockHitSong.prototype.solidGuitarRiff = function () {
  return "More cowbell! No that's not it... DISTORTION!";
}; 

let partyRock = new HitSong('Party Rock Anthem', 2011);
let leanOn = new HitSong('Lean On', 2015);

console.log(Object.getPrototypeOf(partyRock) === HitSong.prototype);
console.log(Object.getPrototypeOf(leanOn) === HitSong.prototype);
console.log(Object.getPrototypeOf(HitSong.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype) === null);

console.log(Object.getPrototypeOf(HitSong) === Function.prototype);
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype) === null);

