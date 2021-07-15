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
