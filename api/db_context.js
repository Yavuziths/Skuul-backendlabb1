const pgp = require('pg-promise')()

const db = pgp(
    'postgres://postgres:Incognito910104!@localhost:5432/Librarylabb'
)

async function selectBookByKeyword(keyword) {
    let data = await db.any(`SELECT * FROM book WHERE title ILIKE $1`, [
        `${keyword}%`
    ])

    return data
}
async function selectFromRent(bookId) {
    let result = await db.result(
        `SELECT COUNT(*) FROM rent WHERE book_id = $1 AND return_date > NOW(); `,
        [bookId]
    )
    console.log(result.rows[0].count)
    return result.rows[0].count
}

async function checkForAuthors(author_name) {
    let data = await db.any(`SELECT * FROM author WHERE name ILIKE $1`, [
        `${author_name}%`
    ])
    return data
}

async function selectAllAuthors() {
    let data = await db.any(`SELECT * FROM author`)

    return data
}

async function selectAuthorByKeyword(keyword) {
    let data = await db.any(`SELECT * FROM author WHERE name ILIKE $1`, [
        `${keyword}%`
    ])

    return data
}

async function insertBook(title, author_id, genre, year) {
    await db.none(
        `INSERT INTO book (title, author_id, genre, year) VALUES ($1, $2, $3, $4)`,
        [title, author_id, genre, year]
    )
}

async function updateBookById(bookId, title, authorId, genre, year) {
    await db.none(
        `UPDATE book SET title = $1, author_id = $2, genre = $3, year = $4 WHERE id = $5`,
        [title, authorId, genre, year, bookId]
    )
}

async function insertAuthor(name) {
    await db.none(`INSERT INTO author (name) VALUES ($1)`, [name])
}

async function updateAuthor(authorId, name) {
    await db.none(`UPDATE author SET name = $1 WHERE id = $2`, [name, authorId])
}

async function selectAllRents() {
    let data = await db.any(`SELECT * FROM rent`)

    return data
}

async function insertRent(book_id, rent_date, return_date) {
    await db.none(
        `INSERT INTO rent (book_id,  rent_date, return_date) VALUES ($1, $2, $3)`,
        [book_id, rent_date, return_date]
    )
}

async function updateRent(rentId, book_id, rent_date, return_date) {
    await db.none(
        `UPDATE rent SET book_id = $1, rent_date = $2, return_date = $3 WHERE id = $4`,
        [book_id, rent_date, return_date, rentId]
    )
}

async function selectRentByBookId(bookId) {
    let data = await db.any(`SELECT * FROM rent WHERE book_id = $1`, [bookId])

    return data
}
async function selectAllBooks() {
    let data = await db.any(`SELECT * FROM book`)
    return data
}

async function deleteBookById(bookId) {
    let data = await db.none(`DELETE FROM book Where id = $1`, [bookId])
    return data
}

module.exports = {
    selectFromRent,
    checkForAuthors,
    deleteBookById,
    selectAllBooks,
    selectBookByKeyword,
    selectAllAuthors,
    selectAuthorByKeyword,
    insertBook,
    updateBookById,
    insertAuthor,
    updateAuthor,
    selectAllRents,
    selectRentByBookId,
    insertRent,
    updateRent
}
