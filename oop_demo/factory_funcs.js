

function hitSong(name, date) {
  return {
    name: name,
    dateCreated: date,
    genericLyrics () {
      return 'Not too specific, not too edgy, but still relevent, upbeat.';
    }, 
    phatBeat() {
      return 'Four on the floor am I right??';
    },
    catchyHook() {
      return "little funky, almost annoying... but it won't leave your Head";
    }
  }
};

let partyRock = hitSong('Party Rock Anthem', 2011);
let leanOn = hitSong('Lean On', 2015);

console.log(partyRock.constructor);
console.log(leanOn.constructor);