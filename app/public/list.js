document.addEventListener('DOMContentLoaded', async function () {
    const bookList = document.querySelector('#bookList')

    function createBookListItem(book) {
        const li = document.createElement('li')
        const title = document.createElement('h2')
        const author = document.createElement('h3')
        const genre = document.createElement('p')
        const year = document.createElement('p')
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        title.innerText = book.title
        author.innerText = `Author ID: ${book.author_id}`
        genre.innerText = `Genre: ${book.genre}`
        year.innerText = `Year: ${book.year}`
        editButton.innerText = 'Edit'
        deleteButton.innerText = 'Delete'

        editButton.addEventListener('click', async () => {
            const newTitle = prompt(
                `Enter a new title for "${book.title}"`,
                book.title
            )
            const newAuthorId = prompt(
                `Enter a new author ID for "${book.title}"`,
                book.author_id
            )
            const newGenre = prompt(
                `Enter a new genre for "${book.title}"`,
                book.genre
            )
            const newYear = prompt(
                `Enter a new year for "${book.title}"`,
                book.year
            )

            if (newTitle && newAuthorId && newGenre && newYear) {
                const newData = {
                    title: newTitle,
                    author_id: newAuthorId,
                    genre: newGenre,
                    year: newYear
                }

                const response = await fetch(
                    `http://localhost:3001/book/${book.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newData)
                    }
                )

                if (response.ok) {
                    title.innerText = newTitle
                    author.innerText = `Author ID: ${newAuthorId}`
                    genre.innerText = `Genre: ${newGenre}`
                    year.innerText = `Year: ${newYear}`
                } else {
                    console.error(`Failed to update book with ID ${book.id}.`)
                }
            }
        })

        deleteButton.addEventListener('click', async () => {
            const confirmation = confirm(
                `Are you sure you want to delete "${book.title}"?`
            )

            if (confirmation) {
                try {
                    const response = await fetch(
                        `http://localhost:3001/book/${book.id}`,
                        {
                            method: 'DELETE'
                        }
                    )
                    if (response.ok) {
                        li.remove()
                    } else {
                        console.error(`Error deleting book with ID ${book.id}.`)
                    }
                } catch (error) {
                    console.error(
                        `Error deleting book with ID ${book.id}: ${error.message}.`
                    )
                }
            }
        })

        li.appendChild(title)
        li.appendChild(author)
        li.appendChild(genre)
        li.appendChild(year)
        li.appendChild(editButton)
        li.appendChild(deleteButton)

        return li
    }

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    }

    const responseBooks = await fetch('http://localhost:3001/book', options)
    const books = await responseBooks.json()

    for (const book of books) {
        const bookListItem = await createBookListItem(book)
        bookList.appendChild(bookListItem)
    }
})
