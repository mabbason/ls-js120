// > let helloVictor = createGreeter('Victor');
// > helloVictor.greet('morning');
// = Good Morning Victor

// eslint-disable-next-line max-lines-per-function
function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

let helloVictor = createGreeter('Victor');
helloVictor.greet('morning');

/*Response:
The execution context for the properties inside the function wasn't there.
Within the function the 'morning, afternoon, and evening' were undefined.
Using the `this` keyword with each 'timeOfDay' would restore the context
and fix the code.
*/