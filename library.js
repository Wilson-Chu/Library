/*
let myLibrary = [];

// would closures be better here?
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
*/

//button event listeners for create new book, add new book to page, close popup
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const newBookBtn = document.querySelector('#newBtn');
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const popUpForm = document.getElementById('popUp');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

//Book Constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value + ' pages';
    this.read = form.read.checked;
  }
}

//creates book from Book Constructor, adds to library
let myLibrary = [];
let newBook;

function addBookToLibrary() {
  //event.preventDefault();
  popUpForm.style.display = 'none';

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  setData();  //saves updated array in local storage
  render();
  form.reset();
}

// Creates cards UI
function render() {
  const display = document.getElementById('Library-container');
  const books = document.querySelectorAll('.book');
  books.forEach(book => display.removeChild(book));

  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
}

// Creates Book DOM elements, to use in render();
function createBook(item) {
  const library = document.querySelector('#Library-container');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authDiv = document.createElement('div');
  const pageDiv = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');


  bookDiv.classList.add('book');
  bookDiv.setAttribute('id', myLibrary.indexOf(item));

  titleDiv.textContent = item.title;
  titleDiv.classList.add('title');
  bookDiv.appendChild(titleDiv);

  authDiv.textContent = item.author;
  authDiv.classList.add('author');
  bookDiv.appendChild(authDiv);

  pageDiv.textContent = item.pages;
  pageDiv.classList.add('pages');
  bookDiv.appendChild(pageDiv);

  readBtn.classList.add('readBtn')
  bookDiv.appendChild(readBtn);
  if (item.read === false) {
    readBtn.textContent = 'Not Read';
    readBtn.style.backgroundColor = '#fa2840';
  } else {
    readBtn.textContent = 'Read';
    readBtn.style.backgroundColor = '#47e62c';
  }

  removeBtn.textContent = 'Remove';
  removeBtn.setAttribute('id', 'removeBtn');
  bookDiv.appendChild(removeBtn);

  library.appendChild(bookDiv);

  removeBtn.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    setData()
    render();
  });

  //add toggle ability to each book 'read' button on click
  readBtn.addEventListener('click', () => {
    item.read = !item.read;
    setData();
    render();
  });
};

// setting Library to be stored in local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
    objects = JSON.parse(objects);
    myLibrary = objects;
    render();
  }
}

restore();