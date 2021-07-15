/*
Problem:

Examples:

// let fooA = { bar: 1 };
// let fooB = Object.create(fooA);
// let fooC = Object.create(fooB);

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false

Data Structure:
object

Algorithm:
- write function, takes object, string, value as args
  - declare objToTest variable to objectArg value
  - loop while objToTest(obj NOT hasOwnProperty, and,
    obj getPrototypeOf NOT equal to default prototype)
    - assign objToTest to getPrototypeOf
  - if objToTest NOT to default prototype
    - assign the Arg property the Arg value

CODE
*/

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

function assignProperty(obj, prop, val) {
  let objToTest = obj;
  while (!objToTest.hasOwnProperty(prop) &&
         !(Object.getPrototypeOf(objToTest) === null)) {
    objToTest = Object.getPrototypeOf(objToTest);
  }
  if (objToTest.hasOwnProperty(prop)) {
    objToTest[prop] = val;
  }
}


assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

// console.log(Object.getPrototypeOf(emoObj) === Object.getPrototypeOf({}));