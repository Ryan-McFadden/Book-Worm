class AuthorsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/authors'
    }

    getAuthors() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    getAuthor(id) {
        return fetch(`http://localhost:3000/authors/${id}`).then(res => res.json())
    }

    createAuthor(name, title) {
        const AuthorData = {
            name: name,
            book: {
                title: title
            }
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(AuthorData)
        }).then(res => res.json())
    }
}