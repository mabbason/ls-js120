# Practice 
# Code Reuse with Mixins
  # Problem 1
  If we have a Car class and a Truck class, how can you use the Speed object as a mix-in to make them goFast? How can you check whether your Car or Truck can now go fast?
  Response:
  ```javascript
  const Speed = {
    goFast() {
      console.log(`I'm a ${this.constructor.name} and going super fast!`);
    }
  };

  class Car {
    goSlow() {
      console.log(`I'm safe and driving slow.`);
    }
  }

  class Truck {
    goVerySlow() {
      console.log(`I'm a heavy truck and like going very slow.`);
    }
  }

  Object.assign(Car.prototype, Speed);
  Object.assign(Truck.prototype, Speed);

  let f150 = new Truck();
  let corolla = new Car();

  corolla.goFast();
  f150.goFast();
```

# Problem 2
In the last question, we used a mix-in named Speed that contained a goFast method. We included the mix-in in the Car class and then called the goFast method from an instance of the Car class. You may have noticed that the string printed when we call goFast includes the name of the type of vehicle we are using. How is that done?
Response:
It's simple enough to look at the `goFast()` method being added to the prototype object for both `Car` and `Truck`. So when `corolla` object is used to invoke the `goFast()` method `this` is referring to `corolla`, and `corolla.constructor` refers to `Car`. So there must be a `name` property on `Car`. But look at the following code...
```javascript
console.log(Car.name); // Car
// console.log(Car.hasOwnProperty(name)) // throws error, not defined
console.log(Object.getPrototypeOf(Car) === Function.prototype); // true
// console.log(Function.prototype.hasOwnProperty(name)) // same error
```
Hmmm, we can log `Car.name` but then it looks like `Car` doesn't have a `name` property. So lets go up the chain... nope again.

That's because `name` is a non-enumerable property on every function. It's not a reserved word, but it is used by JavaScript in much the same way and so should avoid being used. That being said, while not recommended, it is still possible to change it... see below.

```javascript
Object.defineProperty(Car, 'name', {
  value: 'Toyota',
});

console.log(Car.name); // Toyota

Car.name = 'Ford'; // error, cannot assign read only property
```

# Problem 3
Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named Auto and Motorcycle to represent automobiles and motorcycles. After they noticed that the information and calculations performed was common to both vehicle types, they decided to break out the commonality into a separate class named WheeledVehicle. Their code, thus far, looks like this:

```javascript
class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}
```

Their boss now wants them to incorporate a new type of vehicle: a Catamaran.

```javascript
class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}
```

Reponse:
```javascript
const Vehicle = {
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
};

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter,
  fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

Object.assign(WheeledVehicle.prototype, Vehicle);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter,
  fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}

Object.assign(Catamaran.prototype, Vehicle);
```