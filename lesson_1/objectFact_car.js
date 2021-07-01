// eslint-disable-next-line max-lines-per-function
function createCar (carMake, carFuelLevel, carEngineOn) {
  return {
    make: carMake,
    fuelLevel: carFuelLevel,
    engineOn: carEngineOn,

    startEngine() {
      this.engineOn = true;
    },

    drive() {
      this.fuelLevel -= 0.1;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  };
}

console.log(createCar('Jaguar', 0.4, 'off'));