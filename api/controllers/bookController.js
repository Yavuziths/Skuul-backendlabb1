const {
    getAllBooks,
    addBook,
    getBookByKeyword,
    editBook,
    removeBook,
    updateBook
} = require('../repositories/bookRepository')

async function allBooks(req, res) {
    let data = await getAllBooks()
    res.send(data)
}
async function search(req, res) {
    let data = await getBookByKeyword(req.query.keyword)
    res.json(data)
}
async function remove(id, res) {
    let data = await removeBook(id)
    res.send(data)
}
async function add(req, res) {
    await addBook(
        req.query.title,
        req.query.author_id,
        req.query.genre,
        req.query.year
    )
    res.send()
}

async function update(req, res) {
    const { id } = req.params
    const { title, authorId, genre, year } = req.body
    try {
        await updateBook(id, title, authorId, genre, year)
        res.status(200).json({ message: 'Book updated successfully' })
    } catch (error) {
        console.error('Error updating book:', error)
        res.status(500).json({ message: 'Error updating book' })
    }
}

module.exports = {
    update,
    remove,
    allBooks,
    add,
    getBookByKeyword,
    editBook,
    search
}
