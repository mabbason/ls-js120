

let person = {
  eat: function() {
    console.log("I'm full");
  },

  sleep: function() {
    console.log("I'm rested");
  },

  init: function(name, wears) {
    this.name = name;
    this.wears = wears;
    return this;
  }
};

let milton = Object.create(person).init('Milton', 'The Pants');
let shelly = Object.create(person).init('Shelly', 'The Shorts');

milton.temper = function() {
  console.log(`Heeeerrrreeee's ${this.name}!!!`)
};

// milton.sleep();
// shelly.eat();

let miltonJr = Object.create(milton).init('Milton Jr', 'The Onesie');

miltonJr.eat();
console.log(miltonJr.wears);

console.log(Object.getPrototypeOf(miltonJr) === milton);
miltonJr.temper();
