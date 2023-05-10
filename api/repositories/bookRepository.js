const bookModel = require('../models/bookModel')
const bookSearchModel = require('../models/bookSearchModel')
const db_context = require('../db_context')

async function getAllBooks() {
    let books = []
    let data = await db_context.selectAllBooks()
    data.forEach((book) => {
        books.push(
            new bookModel(
                book.id,
                book.title,
                book.author_id,
                book.genre,
                book.year
            )
        )
    })
    return books
}

async function getBookByKeyword(keyword) {
    let books = []
    let data = await db_context.selectBookByKeyword(keyword)

    for (let book of data) {
        let count = await db_context.selectFromRent(book.id)
        books.push(
            new bookSearchModel(
                book.id,
                book.title,
                book.author_id,
                book.genre,
                book.year,
                10 - count,
                Number(count)
            )
        )
    }

    return books
}

async function addBook(title, author_id, genre, year) {
    await db_context.insertBook(title, author_id, genre, year)
    return { message: 'Book created successfully' }
}

async function editBook(bookId, title, author_id, genre, year) {
    await db_context.updateBook(bookId, title, author_id, genre, year)
}

async function removeBook(bookId) {
    await db_context.deleteBookById(bookId)
}

async function updateBook(id, title, authorId, genre, year) {
    await db_context.updateBookById(id, title, authorId, genre, year)
}

module.exports = {
    updateBook,
    removeBook,
    getAllBooks,
    getBookByKeyword,
    addBook,
    editBook
}
