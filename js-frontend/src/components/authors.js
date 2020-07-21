class Authors {
    constructor() {
        this.authors = []
        this.adapter = new AuthorsAdapter()
        this.fetchAndLoadAuthors()
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners() {
        this.header = document.getElementById('header-title')
        this.booksContainer = document.getElementById('books-container')
        this.newAuthorName = document.getElementById('new-author-name')
        this.newBookTitle = document.getElementById('new-book-title')
        this.bookForm = document.getElementById('new-book-form')

        this.header.addEventListener('dblclick', this.fetchAndLoadAuthors.bind(this))
        this.bookForm.addEventListener('submit', this.createAuthor.bind(this))
    }

    createAuthor(e) {
        e.preventDefault()
        const name = this.newAuthorName.value
        const title = this.newBookTitle.value

        this.adapter.createAuthor(name, title)
        .then(author => {
            this.resetField()
            this.fetchAndLoadAuthors()
        })
    }

    fetchAndLoadAuthors() {
        this.authors = []
        this.adapter.getAuthors()
        .then(authors => {
            authors.forEach(author => this.authors.push(new Author(author)))
            this.render()
        })
    }

    displayAuthor(e) {
        fetch(`http://localhost:3000/authors/${e.target.dataset.id}/books`)
        .then(res => res.json())
        .then(books => {
            const container = document.getElementById('books-container')
            container.innerHTML = ''
            books.forEach(book => {
                const aBook = document.createElement('h3')
                aBook.innerHTML = book.title
                container.appendChild(aBook)
            })
        })
    }

    resetField() {
        this.newAuthorName.value = ''
        this.newBookTitle.value = ''
    }

    render() {
        const container = document.getElementById('books-container')

        container.innerHTML = this.authors.map(author => author.renderCard()).join('')

        document.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', this.displayAuthor)
        })
        // document.querySelectorAll('a').forEach(a => {
        //     console.log(a)
        //     a.addEventListener('click', this.displayAuthor)
        // })
    }
}