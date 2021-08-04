/*
Read the following code carefully. What do you think is logged on line 7.
Try to answer the question before you run the code.
*/

let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

/*
Response: undefined
the 'this' keyword is referring to the global object when it is
used for 'fullName'. So presumbably the global object doesn't have
firstName and lastName as properties and it is undefined.

Right idea, wrong answer. I didn't correctly make the final
connection to NaN.
*/