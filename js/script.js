document.addEventListener("DOMContentLoaded", function(){

	// berfungsi sebagai listener yang akan menjalankan kode di dalamnya jika DOM sudah di-load dengan baik.
	const submitForm = document.getElementById("inputBook");
	// berfungsi untuk mengambil element id "form" kedalam variable submitForm
	submitForm.addEventListener("submit", function(event){
		event.preventDefault();
		// untuk mencegah behaviour asli agar tidak dijalankan
		addBook();
	});
	const searchBook = document.getElementById("searchBook");
	searchBook.addEventListener("submit", function(event){
		event.preventDefault();
		searchBox();
	});
	if(isStorageExist()){
        loadDataFromStorage();
    }
});	

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataBooks();
});
