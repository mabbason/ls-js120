function objectsEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (let idx = 0; idx <= Object.keys(obj1).length; idx += 1) {
    if (Object.keys(obj1)[idx] !== Object.keys(obj2)[idx]) return false;
    if (Object.values(obj1)[idx] !== Object.values(obj2)[idx]) return false;
  }
  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false