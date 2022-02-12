/* Event listeners to create new book card, add card, remove all cards, or close modal */
const newBookBtn = document.querySelector('#newBookBtn');
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const rmvAllBtn = document.querySelector('#rmvAllBtn');
rmvAllBtn.addEventListener('click', removeAll);

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const popUpForm = document.getElementById('modal');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

// Creating a Book object
class Book {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value + ' pages';
    this.read = form.read.checked;
  }
}

// Creates library array where all Book objects are stored
let myLibrary = [];
let newBook;

function addBookToLibrary() {
  popUpForm.style.display = 'none';

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  setData();  // Saves updated array into local storage
  render();
  form.reset();
}

// Creates cards UI
function render() {
  const display = document.getElementById('Library-container');
  const books = document.querySelectorAll('.bookCard');
  books.forEach(book => display.removeChild(book));

  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
}

// Creates Book Card DOM elements, to use in render()
function createBook(item) {
  const library = document.querySelector('#Library-container');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authDiv = document.createElement('div');
  const pageDiv = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');

  bookDiv.classList.add('bookCard');
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

  // Clicking toggles "Read/Not Read" button on each card
  readBtn.addEventListener('click', () => {
    item.read = !item.read;
    setData();
    render();
  });
};

// Library to be stored in user's local storage
function setData() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Populates Library from local storage after page is reloaded
function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
    //objects = JSON.parse(objects);
    //myLibrary = objects; /* these 2 lines are replaced with the one below, kept for clarity */
    myLibrary = JSON.parse(objects);
    render();
  }
}

// Deletes all cards at once
function removeAll() {
  myLibrary.splice(myLibrary[0], myLibrary.length);
  setData()
  render();
}

restore();