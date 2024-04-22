const myLibrary = [];

function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // index of this book in the myLibrary array
  this.index = index;
}

Book.prototype.toggleRead = function(){
  this.read = !this.read;
}

function AddBookToLibrary(){
  // get form values
  const newBook = GetFormValues();

  myLibrary.push(newBook);

  // clear the form
  ClearForm();

  dialog.close();
  //reset card container
  ResetCardContainer();
  DisplayBooksAsCards();
}

function DisplayBooksAsCards(){
  const cardContainer = document.querySelector('.card-container');
  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardbuttons = document.createElement('div');
    cardbuttons.classList.add('card-buttons');
    const readBtn = document.createElement('button');
    readBtn.classList.add('status-btn');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');
    if(book.read){
      readBtn.classList.add('green');
      readBtn.textContent = 'Read';
    }
    else{
      readBtn.classList.add('red');
      readBtn.textContent = 'Not Read';
    }
    cardbuttons.appendChild(readBtn);
    cardbuttons.appendChild(removeBtn);
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
    `;
    card.appendChild(cardbuttons);
    cardContainer.appendChild(card);
  });
}

//function that gets current form values, creates a book and returns it
function GetFormValues(){
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  const newBook = new Book(title, author, pages, read, myLibrary.length);
  return newBook;
}

//function to clear form values
function ClearForm(){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#read').checked = false;
}

//function to reset card container
function ResetCardContainer(){
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = '';
}

// function to validate form
function ValidateForm() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  
  if (title.trim() === '' || author.trim() === '' || pages.trim() === '') {
    return false;
  }
  
  return true;
}

const addBookBtn = document.querySelector('.add-book-btn');
const dialog = document.querySelector('.dialog');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');
const statusbtn = document.querySelector('.status-btn');
const removebtn = document.querySelector('.remove');

addBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

dialog.addEventListener('click', (event) => {
  if(event.target === dialog){
    dialog.close();
  }
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (ValidateForm()) {
    AddBookToLibrary();
  }
  else{
    //display error message for 5 seconds. textcontent as "Please fill in all fields"
    const errormsg = document.querySelector('.error-msg');
    errormsg.textContent = 'Please fill in all fields!!!';
    setTimeout(() => {
      errormsg.textContent = '';
    }, 5000);

  }
});

removebtn.addEventListener('click', (event) => {
  const card = event.target.parentElement.parentElement;
  const index = card.querySelector('h3').textContent;
  myLibrary.splice(index, 1);
  ResetCardContainer();
  DisplayBooksAsCards();
});
