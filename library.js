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

// getter function even necessary here? will need for each element...
function getTitle(myLibArr) {
  return myLibArr.title;
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const book2 = new Book("Willy Wonka and the Chocolate Factory", "Roald Dahl", 227, "read");
const book3 = new Book("Principles", "Ray Dalio", 555, "read");
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

// are getters be necessary?
for (let i = 0; i < myLibrary.length; i++) {
  console.log(getTitle(myLibrary[i]));
}