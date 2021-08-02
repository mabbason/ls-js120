



console.log(pipe.constructor);

pipe.constructor = 'Rene Magritte';



console.log(pipe.constructor);

console.log(pipe);

console.log(pipe.__proto__ === Object.prototype);
console.log(Object.getPrototypeOf(pipe) === Object.prototype);


console.log(pipe.hasOwnProperty('constructor'));
console.log(Object.getPrototypeOf(pipe) === Object.prototype);
console.log(Object.prototype.hasOwnProperty('constructor'));
console.log(Object.prototype.constructor === pipe.constructor);
console.log(pipe.constructor === Object);

console.log(Object.constructor === Function.prototype.constructor);
console.log(Object.getPrototypeOf(Function) === Function.prototype);
console.log(Function.constructor === Function.prototype.constructor);
console.log(Object.getPrototypeOf(Function) === Function.prototype);



console.log(Object.prototype.hasOwnProperty('constructor'));
console.log(Object.prototype.constructor)

console.log(Object.getPrototypeOf(Object.prototype) === null);
console.log(Object.getPrototypeOf(Object) === Function.prototype);
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Function) === Function.prototype);
console.log(Function.prototype.constructor)