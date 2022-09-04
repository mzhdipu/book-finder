const spinner = document.getElementById("spinner");

const loadBook = async () => {
    // Create Dynamic Search value
    const searchText = document.getElementById("search-text");
    const searchValue = searchText.value;

    const errorMsg = document.getElementById("error-msg");

    if(searchText.value === ""){
        errorMsg.classList.remove("d-none");
    }
    else{
        errorMsg.classList.add("d-none");

        // SPINNER START 
        spinner.classList.remove("d-none");
    }

    const url = `http://openlibrary.org/search.json?q=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBook(data.docs);

    // SPINNER END 
    spinner.classList.add("d-none");

    searchText.value = ""

    const bookFound = document.getElementById("book-found");
    bookFound.innerHTML = `
     <h2>Total Found Books : ${data.docs.length}</h2>
    `;
    
}

const displayBook = (books) => {
    const displayBooks = document.getElementById("display-books");
    displayBooks.innerText = ""

    books.forEach(book => {
        // Object distructuring
        const {
            title,
            title_suggest,
            first_publish_year,
            author_name,
            cover_i,
            author_key
        } = book
        const colDiv = document.createElement("div");
        colDiv.classList.add("col");
        colDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="img-fluid" alt="">
                    <h5 class="card-title">${title}</h5>
                    <h4>${title_suggest}</h4>
                    <p class="card-text">${first_publish_year}</p>
                    <p class="fw-bold">${author_name}</p>
                    
                    <button onclick = "autorInfo('${author_key}');" class="btn btn-primary">Authore</button>

                </div>
            </div>
        `;
        displayBooks.appendChild(colDiv);
    })
}


const autorInfo = async (author_key) => {
    const autoreUrl = `https://openlibrary.org/authors/${author_key}.json`;
    const res = await fetch(autoreUrl);
    const data = await res.json();
    authoreInformation(data);
}

const authoreInformation = (authoreInfo) => {
    window.scrollTo(200, 0);
    
    const displayAuthoreInfo = document.getElementById("display-authore-info");
    displayAuthoreInfo.innerHTML = `
    <div>
        <img src="" alt="">
        <h2>${authoreInfo.name}</h2>
    </div>
    `;
}