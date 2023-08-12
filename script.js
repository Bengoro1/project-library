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
  myLibrary.push(obj);
  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);
    for (const property in book) {
      const para = document.createElement('p');
      card.appendChild(para);
      para.textContent = `${firstLetterCapital(property)}: ${firstLetterCapital(book[property])}`;
    }
  });
}

addBookButton.addEventListener('click', () => {
  const form = document.createElement('form');
  const author = document.createElement('input');
  const title = document.createElement('input');
  const pages = document.createElement('input');
  const read = document.createElement('button');
  const s = document.createElement('button');
  form.setAttribute('class', 'book-form');
  container.appendChild(form);
  author.setAttribute('type', 'text');
  author.setAttribute('name', 'author');
  author.setAttribute('id', 'author');
  form.appendChild(author);
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.setAttribute('id', 'title');
  form.appendChild(title);
  pages.setAttribute('type', 'number');
  pages.setAttribute('name', 'pages');
  pages.setAttribute('id', 'pages');
  form.appendChild(pages);
  read.setAttribute('type', 'button');
  read.textContent = 'not read';
  read.addEventListener('click', () => {
    read.classList.toggle('read');
    read.className === 'read' ? read.textContent = 'read' : read.textContent = 'not read';
  });
  form.appendChild(read);
  s.setAttribute('type', 'submit');
  form.appendChild(s);
  s.addEventListener('click', (e) => {
    new Book(author.value, title.value, pages.value, read.textContent);
    e.preventDefault();
  });
});

function firstLetterCapital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
