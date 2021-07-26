# Problem #1
What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```javascript
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);
```
Response: This will log 2 to the console. `baz` is an object created with `qux` as its prototype. So on `line 7` when JS looks for the property `foo` in `baz` it doesn't find it. So it goes up the prototypal chain to see if an object contains the `foo` property. It finds it in `qux` with the value of `1`. JS then uses the `+` operator with both number `1` values and the result is number value `2` which is logged to the console. 

# Problem #2
What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```javascript
let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);
```
Response: While similar to the first question, this is different. Since JS respects the "closest" property in the prototype chain if properties share the same name, when `baz` is assigned the `foo` property with the number value `2`, now the `baz` object has its own property `foo` which JS will treat as distinct from the `foo` property in `qux` as long as JS is "upstream" up `baz`. So when the values are summed and logged, JS is adding the separate `foo` values of `baz` and `qux`, 2 and 1 respectively, so the number value 3 is logged.

# Problem #3
What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

```javascript
let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);
```
Response: Again, very similar, but this time the `baz` object is left alone once created so when JS goes to add the two values, it is accessing the value referenced by `foo` in the object `qux` BOTH times since `baz.foo` is looking to its protoype, which is `qux.foo`. 

# Problem #5
Consider the following two loops:
```javascript
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
```
```javascript
Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});
```
If `foo` is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.

Response:
They will NOT always log the same result. `for/in` loops will log all the properties all the way up a prototype chain, while Object.keys returns an array of the properties for ONLY the object it is called on. 
for example:
```javascript
let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

for (let property in fooC) {
  console.log(`${property}: ${fooC[property]}`);
} // => logs "bar: 1"

Object.keys(fooC).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
}); // => logs nothing bc fooC doesn't have any of its OWN properties
```

# Problem #6
How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?

You can create an object w/o a prototype by using `Object.create(null)` 
You can also determine if an object has a prototype if `Object.getPrototypeOf(obj)` returns a value
other than `null`. 

# Implicit and Explicit Function Execution Contexts
# Problem #1
What will the following code output? Try to determine the results without running the code.

```javascript
function func() {
  return this;
}

let context = func();

console.log(context);
```

Response: This will log the global object, the func() is called and returns `this` which JS implicitly gets from the global context, which is then assigned to the variable `context`, which is then logged.

# Problem #2
What will the following code output? Explain the difference, if any, between this output and that of problem 1.

```javascript
let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context);
```
Repsonse: This will log the object `obj` to the console. The context is still implicitly derived by JS, but since the `func` function is now a method of `obj` and the assignment to `context` wasn't called explicitly, `this` in `func` had the value of `obj`, which was then logged to the console.

# Problem #3
What will the following code output?
```javascript
message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();
```
Response: This will first log "Hello from the global scope" because when message is assigned the string, it wasn't declared with a keyword, so it was made a property on the global object, which is what `this` is implicitly pointing to in the `deliverMessage()` function. Next the `foo` variable is declared and initialized to an object with `message` as a property. Then the `deliverMessage` keyword is added to `foo` and given the value of the same function as `deliverMessage` on the global object. Lastly when the `deliverMessage()` method is called on the `foo` object, `this` is pointing to the `foo` object, where the `message` property has the value of `Hello from the function scope`, which is logged to the console.

# Problem #4
What built-in methods have we learned about that we can use to specify a function's execution context explicitly?
Response: `call` and `apply`

# Problem #5
Take a look at the following code snippet. Use call to invoke the add method but with foo as execution context. What will this return?
```javascript
let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};
```
Response: bar.add.call(foo) will return 3. (1 + 2)

# Practice Problems: Hard Binding Functions with Contexts
# Problem #1
What method can we use to bind a function permanently to a particular execution context?

Response: We can use the `bind()` method to permanently alter the execution context of a function.

# Problem #2
What will the following code log to the console?
```javascript
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);
```
Response: This will log 'JavaScript' to the console.
//Bummer, I see where I misunderstood. 

# Problem #3
What will the following code output?
```javascript
let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo());
console.log(bar());
```
Response: It will throw an error, since `a` and `b` are presumably undefined on the global object. 
Bummer again, I was on the right path but I was interpreting `a` and `b` as variables not properties. I needed to remember what the value was if the property wasn't found. I understood what bind would do, but I missed the the global object nuance. I see that I would be correct with strict mode, but... yeah.

# Problem #4
What will the code below log to the console?
```javascript
let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);

negativity.logMessage = bar;
negativity.logMessage();
```
Response: This will log `JavaScript makes sense!` to the console, because the `bar()` function was bound to the `positivity` object. So even though the `logMessage()` method is defined, and then invoked on the `negativity` object, `bar` is still the function being referenced, and it will always be bound to the `positivity` object.

# Problem #5
What will the code below output?
```javascript
let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);
```
Response: same thing as the last problem, `bar()` function is bound to the `obj` object so regardless of how it is later called with the `otherObj` object, it will still reference the property `a` on the object it was bound to, in this case the `obj` object, so it will log `Amazebulous!`

# Practice Problems: Dealing with Context Loss

# Problem #1
The code below should output "Christopher Turk is a Surgeon". Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.
```javascript
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
```
Response: The `getDescription()` function accessed is defined within an object, BUT it is invoked within the function `logReturnVal()` so `this` is referring to the global object. Thus, `undefined is a undefined undefined`

# Problem #2
Modify the program from the previous problem so that logReturnVal accepts an additional context argument. If you then run the program with turk as the context argument, it should produce the desired output.
```javascript
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);
```

# Problem #3
Suppose that we want to extract getDescription from turk, but we always want it to execute with turk as its execution context. How would you modify your code to do that?
```javascript
let getDescription = turk.getDescription.bind(turk);
```
# Problem #4
Consider the following code:
```javascript
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```
Will this code produce the following output? Why or why not?
<!-- 
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim 
-->
This will log the following:
undefined: Arena
undefined: Daggerfall
undefined: Morrowind
undefined: Oblivion
undefined: Skyrim
because the function expression passed to forEach() lost its context when it went into forEach(). 

# Problem #5
Use let self = this; to ensure that TESgames.listGames uses TESGames as its context and logs the proper output.
Response: 
```javascript
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```
# Problem #6
The forEach method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:
Response:
```javascript
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
  }
};

TESgames.listGames();
```
# Problem #7
Use an arrow function to achieve the same result:
Response:
```javascript
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```

# Problem #8
Consider the following code:
```javascript
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
```
What will the value of foo.a be after this code runs?

Response: 
When `incrementA()` is called, the function within it is invoked within the global object context, which is the value of `this`, which presumably doesn't have the `a` property, so it is `undefined`. But then it reassigns `a` creating the `a` property, but `undefined + 1` is `NaN`. That happens each time `foo.incrementA()` is called, and so at the end the value of `global.a` is `NaN` while the value of `foo.a` remained unchanged at the number value `0`.

# Problem #9
Use one of the methods we learned in this lesson to invoke increment with an explicit context such that foo.a gets incremented with each invocation of incrementA.
Response:
```javascript
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a)
```

# Practice Problems - Factory Functions

# Problem #1
What are two disadvantages of working with factory functions?
Response: Two disadvantages of working with factory functions are that every object produced with this pattern is its own unique object, each with a full copy of the originally intended code. There are a lot of objects held in memory potentially.

Secondly, when examining an object created by the object factory, there is no way to tell "where it came from". There is nothing linking it back to the object factory. 

# Problem #2
Rewrite the following code to use object-literal syntax to generate the returned object:
```javascript
function makeObj() {
  return {
  obj.propA = 10;
  obj.propB = 20;
  };
}
```
# Problem #3
In this problem and the remaining problems, we'll build a simple invoice processing program. To get you started, here's the code to process a single invoice:
```javascript
let invoice = {
  phone: 3000,
  internet: 6500
};

let payment = {
  phone: 1300,
  internet: 5500
};

let invoiceTotal = invoice.phone + invoice.internet;
let paymentTotal = payment.phone + payment.internet;
let remainingDue = invoiceTotal - paymentTotal;

console.log(paymentTotal);         // => 6800
console.log(remainingDue);         // => 2700
```
# Constructors
# Problem #1
What naming convention separates constructor functions from other functions?
Response: the function name begins with a capital letter. 

# Problem #2
What happens if you run the following code? Why?
```javascript
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = Lizard();
lizzy.scamper(); // ?
```
Response: I believe it will throw an error because `lizzy` was assigned to the value returned by invoking the function `Lizard`. There is no explicit return in `Lizard()` so it returns the value `undefined`. Then on the last line, the `scamper()` method is attempted to be called on the `lizzy` object.... except that `lizzy` isn't an object. `lizzy` is currently holding the value `undefined`.

# Problem #3
Alter the code in problem 2 so that it produces the desired output: I'm scampering!.

Reponse: 
```javascript
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // ?
```

# Practice Problems - Constructors and Prototypes
# Problem #1
What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

```javascript
let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
```
Response: 
I believe this will throw an error because when the `area()` method is called on the `RECTANGLE` object, the execution context is the global object, on which the properties `width` and `height` are presumably missing.
Gah, I need to remember that `undefined` is the result of a missing property. I was onto the right idea, but I still didn't get how it was defining the execution context. 


# Problem #2
How would you fix the problem in the code from problem 1?
Reponse: 
I would use the `call()` method to change the execution context of the method call within the constructor function `Rectangle()`.
```javascript
this.area = RECTANGLE.area.call(this);
this.perimeter = RECTANGLE.perimeter.call(this);
```

# Problem #3
Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:

Response:
```javascript
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * (this.radius ** 2);
}
```

# Problem #4
What will the following code log to the console and why?
```javascript
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
```
Response: This will log `true` to the console because `ninja` is an object whose prototype is `Ninja()`. So when the `swingSword()` method is defined, it is defined up the prototypal chain from `ninja`. Lastly when the `swingSword()` method is called on the `ninja` object, JS doesn't find it on `ninja` itself, but it DOES find it up the chain from `ninja` so it is able to be called and references the `swung` property which is on `ninja` object itself. 

# Problem #5
What will the following code output and why? Try to answer without running the code.
```javascript
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());
```
Response: This will log the same thing as the previous question. But the difference was that instead of adding a method to the pre-existing `prototype` object on `Ninja`, the entire `prototype` object is reassigned to an object which includes essentially the same function.
Smh, I see the error in my thinking. I was viewing the prototype as whatever object was currently assigned to the `prototype` property of the constructor. But really, when the `new` object is created, the hidden `[[Prototype]]` reference is assigned to the object at the `prototype` property of the constructor at the time the object is created. Then in this example, while the constructor function was reassigned, the previously created object had no idea, it was only connected to the `prototype` object by the value at `[[Prototype]]`... which hasn't changed. 


# Problem #6
Implement the method described in the comments below:
```javascript
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
```
Response:
```javascript
Ninja.prototype.swing = function () {
  this.swung = true;
  return this;
}
```
# Problem #7
In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:
```javascript
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = Object.create(Object.getPrototypeOf(ninjaA));

ninjaA.constructor === ninjaB.constructor // => true
```
Response: see above.
Ah, I see the difference. I should have used the constructor route, that is how I could have accessed Ninja().

# Problem #8
Since a constructor is just a function, you can call it without the new operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the new operator. The function should return the same result with either form. Use the code below to check your solution:
```javascript
function User(first, last) {
  // ...
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
```
Response: 
```javascript
function User(first, last) {
  if(!(this instanceof User)) {
    return new User(first, last);
  }
  this.name = `${first} ${last}`;
}
```

# Practice Problems - Classes

# Problem 1
What do we mean when we say that classes are first-class values?
Response: Classes are just functions, which are objects and which can be passed around like any other value in JS.

# Problem 2
Consider the following class declaration:
```javascript
class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}
```
What does the static modifier do? How would we call the method manufacturer?
response: 
The static modifier places the method in the `Television` object itself, instead of the default location of `Television.prototype`. We would call it like so `Television.manufacturer()`.

# Practice Problems: Object Creation with Prototypes

# Problem 1
Use a factory function to create pet objects. The factory should let us create and use pets like this:
```javascript
let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
```
Response: 
```javascript
function createPet(animal, name) {
  return {
    animal: animal,
    name: name,
    
    sleep() {
      return `I am sleeping`;
    },
    wake() {
      return `I am awake`
    }
  }
}
```

# Problem 2
 Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:
 ```javascript
let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
 ```
 Response:
 ```javascript
let PetPrototype = {
  sleep() {
    console.log(`I am sleeping`);
  },
  
  wake() {
    console.log(`I am awake`);
  },
  
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
  
}
 ```

 # Problem 3
 Consider the objects created by the programs in problems 1 and 2. How do objects for the same animal differ from each other?
 Response:
 The objects created by the first pattern (factory function) are not connected back to the factory function `createPet()` in any way in the code. They are each independent. They have their own unique state and methods.

 Whereas the objects created by the second pattern (OLOO) are connected back to the `PetPrototype` object by the hidden `[[Prototype]]` reference which points back to `PetPrototype`. The instances of `PetPrototype` each have their own unique state, but their methods are inhereted from `PetPrototype` which is the "owner" of those methods and shares them down the chain to the pet instances. 

# Practice Problems: Subtyping with Classes
# Problem 1
Suppose we have the following classes:
```javascript
class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}
```
What would happen if we added a play method to the Bingo class, keeping in mind that there is already a method of this name in the Game class from which the Bingo class inherits? Explain your answer. What do we call it when we define a method like this?

Response:
The newly defined `play()` method downstream from the `play()` method in `Game` would override the `play()` method in `Game`, which would be unavailable to anything down stream from `Bingo` then. Overriding, is what we call a downstream method of the same name from a method upstream. 

# Problem 2
Let's practice creating a class hierarchy.

Create a class named Greeting that has a single method named greet. The method should take a string argument, and it should print that argument to the console.

Now, create two more classes that inherit from Greeting: one named Hello, and the other Goodbye. The Hello class should have a hi method that takes no arguments and logs "Hello". The Goodbye class should have a bye method that logs "Goodbye". Use the greet method from the Greeting class when implementing Hello and Goodbye; don't call console.log from either Hello or Goodbye.

Response: 

```javascript
class Greeting {
  greet(msg) {
    console.log(msg);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye");
  }
}
```
