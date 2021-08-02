console.log(coolBeansArr.constructor);

console.log(coolBeansArr.hasOwnProperty('constructor'));

console.log(Array.hasOwnProperty('constructor'));

console.log(Array.prototype.hasOwnProperty('constructor'));

console.log(Array.prototype.constructor === coolBeansArr.constructor);

console.log(Object.getPrototypeOf(Array) === Function.prototype);