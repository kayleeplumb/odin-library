const myLibrary = [];
bookCount = 0;


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // bool

    this.bookID = bookCount + 1;
    bookCount += 1;

    this.info = function() {
        let ifRead = this.read ? "read" : "not read yet";
        return(`${this.title} by ${author}, ${pages} pages, ${ifRead}`);
    };
}


function addBookToLibrary(title, author, pages, read) {
    const addBook = new Book(title, author, pages, read);
    myLibrary.push(addBook);
}


function updateOutput() {
    output.innerHTML = "";

    myLibrary.forEach(book => {
        let newEntry = "";
        
        // add book info
        newEntry += '<div class="bookSummary" id="' + book.bookID + '">';
        newEntry += '<div class="bookInfo">' + book.info() + '</div>';
        
        // add read checkmark
        newEntry += '<div><label for="readButton">Read?</label>';
        newEntry += '<input type="checkbox" class="' + book.bookID + '" id="readButton" name="read"';
        book.read ? newEntry += 'checked>': newEntry += '>';
        newEntry += '</div>';

        // add delete button
        newEntry += '<button type="button" class="deleteButton" id="' + book.bookID + '"> Delete Book </button>';
        
        newEntry += '</div>';
        output.innerHTML += newEntry;
    });

    checkForRead();
    checkForDeletes();
}


// if user checks/unchecks read button, myLibrary dictionary updates
function checkForRead() {
    const readCheckboxes = document.querySelectorAll("#readButton");

    readCheckboxes.forEach(readCheckbox => {
        readCheckbox.addEventListener("click", (event) => {
            myLibrary.forEach(book => {
                if (book.bookID == readCheckbox.className) {
                    book.read = book.read ? false : true;
                };   
            });
            updateOutput();
        });
    });
}


function checkForDeletes() {
    const deleteButtons = document.querySelectorAll(".deleteButton");
    // count how far into the array we are at so we can know where to delete
    let count = 0;

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", (event) =>{
            myLibrary.forEach(book => {
                if (book.bookID == deleteButton.id) {
                    myLibrary.splice(count, 1);
                }
                count += 1;
            });
            updateOutput();
        });
    });    
}


const newBookButton = document.querySelector("#newBookButton");
const newBookForm = document.querySelector("#newBookForm");
const confirmButton = document.querySelector("#confirm");
const cancelButton = document.querySelector("#cancel");
const output = document.querySelector("#output");

// show form when button clicked
newBookButton.addEventListener("click", () => {
    newBookForm.showModal();
});

// add new book to library
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

confirmButton.addEventListener("click", (event) =>{
    event.preventDefault(); // Don't submit this form to server
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    newBookForm.close();
    updateOutput();
});
