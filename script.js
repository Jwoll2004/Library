const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  for(let i = 0; i < myLibrary.length; i++){
    const card = document.createElement('div');
    card.setAttribute('data-index', i);
    card.classList.add('card');

    const cardbuttons = document.createElement('div');
    cardbuttons.classList.add('card-buttons');

    const readBtn = document.createElement('button');
    readBtn.classList.add('status-btn');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');

    if(myLibrary[i].read){
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
      <h3>${myLibrary[i].title}</h3>
      <p>Author: ${myLibrary[i].author}</p>
      <p>Pages: ${myLibrary[i].pages}</p>
    `;
    card.appendChild(cardbuttons);
    cardContainer.appendChild(card);
  }

}

//function that gets current form values, creates a book and returns it
function GetFormValues(){
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  const newBook = new Book(title, author, pages, read);
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

// select elements and add event listeners -------------------------------------------------------------------------------------------------------------------------------

const addBookBtn = document.querySelector('.add-book-btn');
const dialog = document.querySelector('.dialog');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');

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

// check if status button exists if yes, then addevnt listener to it and toggle read status else do nothing
// similarly for remove button

document.querySelector('.card-container').addEventListener('click', (event) => {
  if(event.target.classList.contains('status-btn')){
    const index = event.target.parentElement.parentElement.getAttribute('data-index');
    myLibrary[index].toggleRead();
    ResetCardContainer();
    DisplayBooksAsCards();
  }
  else if(event.target.classList.contains('remove')){
    const index = event.target.parentElement.parentElement.getAttribute('data-index');
    myLibrary.splice(index, 1);
    ResetCardContainer();
    DisplayBooksAsCards();
  }
});