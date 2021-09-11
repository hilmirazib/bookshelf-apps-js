const INCOMPLETE_BOOK = "incompleteBookshelfList";
const COMPLETE_BOOK = "completeBookshelfList";
const BOOK_ID = "bookId";
const addFileBook = {
	id: +new Date(),
	title: document.getElementById("inputBookTitle"),
	author: document.getElementById("inputBookAuthor"),
	year: document.getElementById("inputBookYear"),
	isComplete: document.getElementById("inputBookIsComplete"),
};

function addBook(){
	const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOK);
	const completeBookshelfList = document.getElementById(COMPLETE_BOOK);
	const txtId = addFileBook.id;
	const txtTitle = addFileBook.title.value;
	const txtAuthor = addFileBook.author.value;
	const txtYear = addFileBook.year.value;
	const txtComplete = addFileBook.isComplete.checked;
	console.log("ID " + txtId);
	console.log("Title Name " + txtTitle);
	console.log("Author Name " + txtAuthor);
	console.log("Year " + txtYear);
	const newBook = makeBookList(txtTitle, txtAuthor, txtYear, txtComplete);

	const bookObject = composeBookObject(txtTitle, txtAuthor, txtYear, txtComplete);
	newBook[BOOK_ID] = bookObject.id;
	books_array.push(bookObject);

	if (txtComplete){
		console.log("isComplete " + txtComplete);
		completeBookshelfList.append(newBook);

	}
	else{
		console.log("isComplete " + txtComplete);
		incompleteBookshelfList.append(newBook);
	}
	updateDataToStorage();

        
         
}
function makeBookList(title, author, year, isCompleted){
	const incompleteBook = document.getElementById(INCOMPLETE_BOOK);
	const completeBook = document.getElementById(COMPLETE_BOOK);

	const articleComplete = document.createElement("article");
	articleComplete.classList.add("book_item");
	const headerTitle = document.createElement("h3");
	headerTitle.innerText = title;
	const pAuthor = document.createElement("p");
	pAuthor.innerText = author;
	const pYear = document.createElement("p");
	pYear.classList.add("year")
	pYear.innerText = year;
	const isComplete = isCompleted;
	const divAction = document.createElement("div");
	divAction.classList.add("action");
	articleComplete.append(headerTitle, pAuthor, pYear, divAction);
	if(isCompleted){
		articleComplete.append(createNotFinishedButton());
		articleComplete.append(createTrashButton());
	}else{
		articleComplete.append(createFinishedButton());
		articleComplete.append(createTrashButton());
	}
    return articleComplete;
}

function createButton(ButtonClass, contentButton, eventListener){
	const newButton = document.createElement("button");
	newButton.classList.add(ButtonClass);
	newButton.innerText = contentButton;
	newButton.addEventListener("click", function (event) {
		eventListener(event);
	});
	return newButton;
}
function addBookToCompleted(bookElement) {
	const titleFinished = bookElement.querySelector(".book_item > h3").innerText;
    const authorFinished = bookElement.querySelector(".book_item > p").innerText;
    const yearFinished = bookElement.querySelector(".year").innerText;
    const newBookComplete = makeBookList(titleFinished, authorFinished, yearFinished, true);
  	console.log(newBookComplete);
 	const newBook = findBook(bookElement[BOOK_ID]);
 	newBook.isComplete = true;
 	newBookComplete[BOOK_ID] = newBook.id; 
    const bookListCompleted = document.getElementById(COMPLETE_BOOK);
    bookListCompleted.append(newBookComplete);
    bookElement.remove();

    updateDataToStorage();

} 
function undoBookFromCompleted(bookElement){
    const bookListInComplete = document.getElementById(INCOMPLETE_BOOK);
    const titleFinished = addFileBook.title.value;
    const authorFinished = addFileBook.author.value;
    const yearFinished = addFileBook.year.value;
    const newBookComplete = makeBookList(titleFinished, authorFinished, yearFinished, false);
    
    const newBook = findBook(bookElement[BOOK_ID]);
    newBook.isComplete = false;
    newBookComplete[BOOK_ID] = newBook.id;
    bookListInComplete.append(newBookComplete);
    bookElement.remove();

    updateDataToStorage();
}
function createFinishedButton() {
    return createButton("green", "Sudah selesai dibaca", function(event){
         addBookToCompleted(event.target.parentElement);
    });
}
function removeBookFromCompleted(bookElement) {
  	const bookPosition = findBookIndex(bookElement[BOOK_ID]);
  	books_array.splice(bookPosition, 1);
   	bookElement.remove();

   	updateDataToStorage();

}
function createNotFinishedButton() {
    return createButton("green", "Belum selesai dibaca", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}
function createTrashButton() {
    return createButton("red", "Hapus Buku",function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}
function searchBox(){
	let searchBookTitle;
	searchBookTitle = document.getElementById('searchBookTitle').value.toUpperCase();
	let book_list = document.getElementsByClassName("book_list");
	let book_item;
	for(let i=0;i<book_list.length;i++){
		book_item = book_list[i].getElementsByClassName("book_item");
		if (book_item[0].innerText.toUpperCase().indexOf(searchBookTitle) > -1) {
	        book_item[i].style.display = "flex";
	      }else{
	        book_item[i].style.display = "none";
	      }
	}
};

function refreshDataBooks() {
    const bookListInComplete = document.getElementById(INCOMPLETE_BOOK);
    let bookListCompleted = document.getElementById(COMPLETE_BOOK);

    for(fileBook of books_array){
        const newBookComplete = makeBookList(fileBook.title, fileBook.author, fileBook.year, fileBook.isComplete);
        newBookComplete[BOOK_ID] = fileBook.id;
        console.log(fileBook.title);
        if(fileBook.isComplete){
            bookListCompleted.append(newBookComplete);
        } else {
            bookListInComplete.append(newBookComplete);
        }
    }
}