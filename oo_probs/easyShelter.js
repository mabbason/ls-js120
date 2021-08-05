class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  getOwnedPets() {
    return this.pets;
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.newOwners = [];
  }
  adopt(owner, pet) {
    owner.getOwnedPets().push(pet);
    if (!this.newOwners.includes(owner)) this.newOwners.push(owner);
  }

  printAdoptions() {
    this.newOwners.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.getOwnedPets().forEach(pet => {
        console.log(`a ${pet.species} named ${pet.name}`);
      });
      console.log("");
    });
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

//Write the classes and methods that will be necessary to
//make this code run, and log the following output:

/*
P Hanson has adopted the following pets:
a cat named Butterscotch
a cat named Pudding
a bearded dragon named Darwin

B Holmes has adopted the following pets:
a dog named Molly
a parakeet named Sweetie Pie
a dog named Kennedy
a fish named Chester

P Hanson has 3 adopted pets.
B Holmes has 4 adopted pets.
*/