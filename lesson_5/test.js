class Foo {
  init(parm) {
    this.parm = parm;
  }

  static bar() {
    // omitted code
  }

  qux() {
    // omitted code
  }
}

let foo = (new Foo()).init(10);

console.log(global.parm);
