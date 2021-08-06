/*The method franchise.allMovies is supposed to return the following array:
[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

Explain why this method will not return the desired object?
Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
*/

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    }).bind(this);
  },
};

console.log(franchise.allMovies(franchise));
// `this` loses context when nested within another
// function (unless it's an arrow function)
// so the value of `this` on line 17 is no longer the
// `franchise` object.