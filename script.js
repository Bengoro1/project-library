const container = document.querySelector('.container');
const addBookButton = document.getElementById('addBookButton');
let myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  addToLibrary(this);
}

function addToLibrary(obj) {
  while (container.childNodes.length > 2) {
    container.removeChild(container.lastChild);
  }
  let i = 0;
  if (obj !== undefined) {
    myLibrary.push(obj);
  }
  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const removeBookButton = document.createElement('button');
    card.appendChild(removeBookButton);
    removeBookButton.dataset.index = i;
    removeBookButton.textContent = '×';
    removeBookButton.setAttribute('class', 'remove-book');
    container.appendChild(card);
    i++;
    for (const property in book) {
      if (property !== 'read') {
        const para = document.createElement('p');
        card.appendChild(para);
        para.textContent = `${firstLetterCapital(property)}: ${firstLetterCapital(book[property])}`;
      } else {
        const b = document.createElement('button');
        card.appendChild(b);
        b.style.color = 'white';
        b.addEventListener('click', () => {
          b.classList.toggle('read');
          b.className === 'read' ? b.textContent = 'read' : b.textContent = 'not read';
          b.className === 'read' ? b.style.backgroundColor = 'green' : b.style.backgroundColor = 'red';
        });
        if (book[property] === 'read') {
          b.setAttribute('class', 'read');
          b.textContent = 'read';
          b.style.backgroundColor = 'green';
        } else {
          b.textContent = 'not read';
          b.style.backgroundColor = 'red';
        }
      }
    }
    removeBookButton.addEventListener('click', (e) => {
      myLibrary.splice(e.currentTarget.dataset.index, 1);
      addToLibrary();
    });
  });
}

let bookForm;

addBookButton.addEventListener('click', () => {
  if (container.contains(bookForm)) {return}
  const form = document.createElement('form');
  const author = document.createElement('input');
  const title = document.createElement('input');
  const pages = document.createElement('input');
  const read = document.createElement('button');
  const s = document.createElement('button');
  const cancelFormButton = document.createElement('button');
  form.setAttribute('class', 'book-form');
  container.appendChild(form);
  bookForm = document.querySelector('.book-form'); 
  cancelFormButton.setAttribute('type', 'button');
  cancelFormButton.setAttribute('class', 'cancelForm');
  cancelFormButton.textContent = '×';
  form.appendChild(cancelFormButton);
  cancelFormButton.addEventListener('click', () => {
    form.remove();
  });
  author.setAttribute('type', 'text');
  author.setAttribute('name', 'author');
  author.required = true;
  title.placeholder = 'Title';
  author.placeholder = 'Author';
  form.appendChild(author);
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.required = true;
  form.appendChild(title);
  pages.setAttribute('type', 'number');
  pages.setAttribute('name', 'pages');
  pages.setAttribute('min', '1');
  pages.required = true;
  pages.placeholder = 'Pages';
  form.appendChild(pages);
  read.setAttribute('type', 'button');
  read.setAttribute('class', 'read');
  read.textContent = 'read';
  read.style.color = 'white';
  read.style.backgroundColor = 'green';
  read.addEventListener('click', () => {
    read.classList.toggle('read');
    read.className === 'read' ? read.textContent = 'read' : read.textContent = 'not read';
    read.className === 'read' ? read.style.backgroundColor = 'green' : read.style.backgroundColor = 'red';
  });
  form.appendChild(read);
  s.setAttribute('type', 'submit');
  form.appendChild(s);
  s.textContent = 'Add book to library';
  form.appendChild(s);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    new Book(author.value, title.value, pages.value, read.textContent);
  });
});

function firstLetterCapital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
