function createBook(title, author, read = false) {
  return {
    Title: title,
    Author: author,
    read: read,

    getDescription() {
      let readStatus = this.read === true ? 'have' : 'haven\'t';
      return `${this.Title} was written by ${this.Author}. I ${readStatus} read it.`;
    },

    readBook() {
      this.read = true;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse');
console.log(book1.read);
book1.readBook();
console.log(book1.read);
console.log(book1.getDescription());
