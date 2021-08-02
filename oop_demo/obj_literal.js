

let pipe = {
  name: 'This is Not a Pipe',
  dateCreated: 1929,
  declareName () {
    console.log('This is Not a Pipe')
  },
};

console.log(pipe.hasOwnProperty('name'));
console.log(pipe.hasOwnProperty('dateCreated'));
console.log(pipe.hasOwnProperty('declareName'));

console.log(Object.hasOwnProperty('create'));
console.log(Object.hasOwnProperty('hasOwnProperty'));
console.log(Object.prototype.hasOwnProperty('create'));
console.log(Object.prototype.hasOwnProperty('hasOwnProperty'));

console.log(pipe.__proto__ === Object.prototype);
console.log(Object.getPrototypeOf(pipe) === Object.prototype);

console.log(pipe.hasOwnProperty('__proto__'));
console.log(pipe.hasOwnProperty('getPrototypeOf'))

console.log(Object.hasOwnProperty('__proto__'));
console.log(Object.hasOwnProperty('getPrototypeOf'));

console.log(Object.prototype.hasOwnProperty('__proto__'));
console.log(Object.prototype.hasOwnProperty('getPrototypeOf'));

