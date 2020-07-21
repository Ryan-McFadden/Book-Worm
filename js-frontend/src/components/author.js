class Author {
    constructor(authorJSON) {
        this.id = authorJSON.id
        this.name = authorJSON.name
        this.books = authorJSON.books
    }

    renderCard() {
        // const card = document.createElement('div')
        // card.dataset.id = this.id

        // this.books.forEach(book => {
        //     const cardTitle = document.createElement('h3')
        //     cardTitle.class = 'card-title'
        //     cardTitle.innerHTML = book.title
        //     card.appendChild(cardTitle)

        //     const cardContent = document.createElement('h5')
        //     cardContent.class = 'card-content'
        //     cardContent.innerHTML = `Author: <a href="#" data-id=${this.id}>${this.name}</a>`
        //     card.appendChild(cardContent)
        // })
        
        // return card
        const booksArray = []
        this.books.forEach(book => booksArray.push(
            `
                <div class="card" data-id=${this.id}>
                    <h3 class="card-title">${book.title}</h3>
                    <h5 class="card-content">Author: <a href="#" data-id=${this.id}>${this.name}</a></h5>
                </div>
            `
        ))
        return booksArray.join('')
    }
}