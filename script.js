 const books = [];
 const RENDER_EVENT = 'render-book';
 const SAVED_EVENT = 'saved-book';
 const STORAGE_KEY = 'BOOKSHELF_APPS';
 let isCompleted = false;
 
 function generateId() {
   return +new Date();
 }
 
 function generateBookObject(id, title, author, bookYear, isCompleted) {
   return {
     id,
     title,
     author,
     bookYear,
     isCompleted
   }
 }
 
 function findBook(bookId) {
   for (const bookItem of books) {
     if (bookItem.id === bookId) {
       return bookItem;
     }
   }
   return null;
 }
 
 function findBookIndex(bookId) {
   for (const index in books) {
     if (books[index].id === bookId) {
       return index;
     }
   }
   return -1;
 }

 function centangBox(){
  const checkBox = document.getElementById('inputBookIsComplete');
  const span = document.getElementById('span');

  if (checkBox.checked == true) {
    span.innerText = 'Selesai Dibaca';
    isCompleted = true;
  } else {
    span.innerText = 'Belum Selesai Dibaca'
    isCompleted = false;
  }
  return isCompleted;
}
 
 function isStorageExist()  {
   if (typeof (Storage) === undefined) {
     alert('Browser kamu tidak mendukung local storage');
     return false;
   }
   return true;
 }
 
 function saveData() {
   if (isStorageExist()) {
     const parsed  = JSON.stringify(books);
     localStorage.setItem(STORAGE_KEY, parsed);
     document.dispatchEvent(new Event(SAVED_EVENT));
   }
 }
 
 function loadDataFromStorage() {
   const serializedData  = localStorage.getItem(STORAGE_KEY);
   let data = JSON.parse(serializedData);
 
   if (data !== null) {
     for (const book of data) {
       books.push(book);
     }
   }
 
   document.dispatchEvent(new Event(RENDER_EVENT));
 }
 
 
 function makeBook(bookObject) {
   const {id, title, author, bookYear, isCompleted} = bookObject;
 
   const textTitle = document.createElement('h3');
   textTitle.classList.add('judul')
   textTitle.innerText = title;
 
   const textAuthor = document.createElement('p');
   textAuthor.innerText = author;

   const textBookYear = document.createElement('p');
   textBookYear.innerText = bookYear;

   const buttonContainer = document.createElement('div')
   buttonContainer.classList.add('action')

   if (isCompleted === true) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('green');
    undoButton.innerText = 'Belum Selesai Dibaca';
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus Buku';
    deleteButton.addEventListener('click', function () {
      removeBook(id);
    });

    buttonContainer.append(undoButton, deleteButton);
  } else {

    const completeButton = document.createElement('button');
    completeButton.classList.add('green');
    completeButton.innerText = 'Selesai Dibaca';
    completeButton.addEventListener('click', function () {
      addTaskToCompleted(id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus Buku';
    deleteButton.addEventListener('click', function () {
      removeBook(id);
    });

    buttonContainer.append(completeButton, deleteButton);
  }
 
   const textContainer = document.createElement('article');
   textContainer.classList.add('book_item', 'card');
   textContainer.append(textTitle, textAuthor, textBookYear, buttonContainer);
   textContainer.setAttribute('id', `book-${id}`);

 
   return textContainer;
 }
 
 function addBook() {
   const textTitle = document.getElementById('title').value;
   const author = document.getElementById('author').value;
   const bookYear = document.getElementById('bookYear').value;

 
   const generatedID = generateId();
   const bookObject = generateBookObject(generatedID, textTitle, author, bookYear, isCompleted);
   books.push(bookObject);
 
   document.dispatchEvent(new Event(RENDER_EVENT));
   saveData();
 }
 
 function addTaskToCompleted(bookId ) {
   const bookTarget = findBook(bookId);
 
   if (bookTarget == null) return;
 
   bookTarget.isCompleted = true;
   document.dispatchEvent(new Event(RENDER_EVENT));
   saveData();
 }
 
 function removeBook(bookId ) {
   const bookTarget = findBookIndex(bookId);
 
   if (bookTarget === -1) return;
 
   books.splice(bookTarget, 1);
   document.dispatchEvent(new Event(RENDER_EVENT));
   saveData();
 }
 
 function undoTaskFromCompleted(bookId ) {
 
   const bookTarget = findBook(bookId);
   if (bookTarget == null) return;
 
   bookTarget.isCompleted = false;
   document.dispatchEvent(new Event(RENDER_EVENT));
   saveData();
 }
 
 document.addEventListener('DOMContentLoaded', function () {
 
   const submitForm  = document.getElementById('inputBook');
 
   submitForm.addEventListener('submit', function (event) {
     addBook();
   });
 
   if (isStorageExist()) {
     loadDataFromStorage();
   }
 });
 
 document.addEventListener(SAVED_EVENT, () => {
   console.log('Data berhasil di simpan.');
 });
 
 document.addEventListener(RENDER_EVENT, function () {
   const uncompletedBookList = document.getElementById('incompleteBookshelfList');
   const listCompleted = document.getElementById('completeBookshelfList');
 
   uncompletedBookList.innerHTML = '';
   listCompleted.innerHTML = '';
 
   for (const bookItem of books) {
     const bookElement = makeBook(bookItem);
     if (bookItem.isCompleted) {
       listCompleted.append(bookElement);
     } else {
       uncompletedBookList.append(bookElement);
     }
   }
 })

 function cariBuku() {
	let input = document.getElementById('searchBar').value;
	input = input.toLowerCase();
	let x = document.getElementsByClassName('book_item');
	
	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
		}
		else {
			x[i].style.display="";				
		}
	}
}


 


 