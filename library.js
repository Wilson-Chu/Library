let myLibrary = [];

function Book(title, author, numPages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary(book1);

console.log(myLibrary[0].title);