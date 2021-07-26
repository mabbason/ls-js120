function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);

// console.log(maxi.hasOwnProperty('__proto__'));              // false
// console.log(Dog.hasOwnProperty('__proto__'));               // false
// console.log(Function.hasOwnProperty('__proto__'));          // false
// console.log(Object.hasOwnProperty('__proto__'));            // false
// console.log(Dog.prototype.hasOwnProperty('__proto__'));     // false
// console.log(Function.prototype.hasOwnProperty('__proto__'));// false
// console.log(Object.prototype.hasOwnProperty('__proto__'));  // true

// console.log(maxi.hasOwnProperty('prototype'));              // false
// console.log(Dog.hasOwnProperty('prototype'));               // false
// console.log(Function.hasOwnProperty('prototype'));          // false
// console.log(Object.hasOwnProperty('prototype'));            // false
// console.log(Dog.prototype.hasOwnProperty('prototype'));     // false
// console.log(Function.prototype.hasOwnProperty('prototype'));// false
// console.log(Object.prototype.hasOwnProperty('prototype'));  // true

console.log(maxi.hasOwnProperty('[[Prototype]]'));              // false
console.log(Dog.hasOwnProperty('[[Prototype]]'));               // false
console.log(Function.hasOwnProperty('[[Prototype]]'));          // false
console.log(Object.hasOwnProperty('[[Prototype]]'));            // false
console.log(Dog.prototype.hasOwnProperty('[[Prototype]]'));     // false
console.log(Function.prototype.hasOwnProperty('[[Prototype]]'));// false
console.log(Object.prototype.hasOwnProperty('[[Prototype]]'));  // true

