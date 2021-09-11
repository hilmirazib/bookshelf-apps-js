const LOCAL_STORAGE_KEY = "BOOK_APPS";

let books_array = [];

function isStorageExist(){
  if(typeof(Storage) === undefined){
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}
function saveDataBook(){
  const parsed = JSON.stringify(books_array);
  localStorage.setItem(LOCAL_STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
  const serializedData = localStorage.getItem(LOCAL_STORAGE_KEY);
   
  let data = JSON.parse(serializedData);
   
  if(data !== null)
    books_array = data;
 
   document.dispatchEvent(new Event("ondataloaded"))
}
function updateDataToStorage() {
   if(isStorageExist())
       saveDataBook();
}
function composeBookObject(title, author, year, isComplete){
  return {
       id: +new Date(),
       title,
       author,
       year,
       isComplete
  };
}
function findBook(bookId) {
   for(fileBook of books_array){
       if(fileBook.id === bookId)
           return fileBook;
   }
   return null;
}
 
 
function findBookIndex(bookId) {
   let index = 0
   for (fileBook of books_array) {
       if(fileBook.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}