class Banner {
  constructor(message) {
    this.message = message;
    this.topBtmLine = '+--+';
    this.sideLine = '|  |';
  }

  displayBanner() {
    console.log([this.horizontalRule(),
      this.emptyLine(),
      this.messageLine(),
      this.emptyLine(),
      this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return this.topBtmLine.slice(0,2) +
      '-'.repeat(this.message.length) +
      this.topBtmLine.slice(2);
  }

  emptyLine() {
    return this.sideLine.slice(0,2) +
    ' '.repeat(this.message.length) +
    this.sideLine.slice(2);
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}
let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();

let banner2 = new Banner('');
banner2.displayBanner();