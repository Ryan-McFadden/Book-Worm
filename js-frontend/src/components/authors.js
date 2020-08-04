class Authors {
    constructor() {
        this.authors = []
        this.adapter = new AuthorsAdapter()
        this.fetchAndLoadAuthors()
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners() {
        this.header = document.getElementById('header-title')
        this.newAuthorName = document.getElementById('new-author-name')
        this.newBookTitle = document.getElementById('new-book-title')
        this.bookForm = document.getElementById('new-book-form')
        this.filterForm = document.getElementById('new-filter-form')

        this.header.addEventListener('click', this.fetchAndLoadAuthors.bind(this))
        this.bookForm.addEventListener('submit', this.createAuthor.bind(this))
        this.filterForm.addEventListener('submit', this.filterByBook.bind(this))
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

    filterByBook(e) {
        e.preventDefault()
        const filter = document.getElementById('filter-field-input')
        const container = document.getElementById('books-container')
        container.innerHTML = ''

        const newAuthors = this.authors.map(author => author.books.filter(book => book.title.includes(filter.value)))
        console.log(newAuthors)
        newAuthors.forEach(author => author.forEach(book => {

            const aBook = document.createElement('div')
            aBook.setAttribute('class', 'card')

            const aBookTitle = document.createElement('h3')
            aBookTitle.setAttribute('class', 'card-title')
            aBookTitle.innerHTML = book.title
            aBook.appendChild(aBookTitle)

            container.appendChild(aBook)
        }))
        filter.value = ''
    }

    
    displayAuthor(e) {
        fetch(`http://localhost:3000/authors/${e.target.dataset.id}/books`)
        .then(res => res.json())
        .then(books => {
            const container = document.getElementById('books-container')
            container.innerHTML = ''
            books.forEach(book => {
                const aBook = document.createElement('div')
                aBook.setAttribute('class', 'card')

                const aBookTitle = document.createElement('h3')
                aBookTitle.setAttribute('class', 'card-title')
                aBookTitle.innerHTML = book.title
                aBook.appendChild(aBookTitle)

                const aBookAuthor = document.createElement('h5')
                aBookAuthor.setAttribute('class', 'card-content')
                aBookAuthor.innerHTML = `Author: ${book.author.name}`
                aBook.appendChild(aBookAuthor)

                container.appendChild(aBook)
            })
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