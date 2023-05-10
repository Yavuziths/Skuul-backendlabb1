const {
    getAllAuthors,
    addAuthor,
    getAuthorByKeyword,
    editAuthor,
    updateAuthorNow
} = require('../repositories/authorRepository')

async function search(req, res) {
    let data = await getAuthorByKeyword(req.query.keyword)
    console.log(data)
    return res.json(data)
}

async function searchAuthors(req, res) {
    let keyword = req.query.keyword

    try {
        let authors = await model.selectAuthorByKeyword(keyword)
        res.json(authors)
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
}

async function allAuthors(req, res) {
    let data = await getAllAuthors()
    res.send(data)
}

async function createAuthor(req, res) {
    try {
        const name = req.body.name
        await addAuthor(name)
        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

async function updateAuth(req, res) {
    const { id } = req.params
    const { name } = req.body
    try {
        await updateAuthorNow(id, name)
        res.status(200).json({ message: 'Author updated successfully' })
    } catch (error) {
        console.error('Error updating author:', error)
        res.status(500).json({ message: 'Error updating author' })
    }
}

module.exports = {
    updateAuth,
    createAuthor,
    allAuthors,
    searchAuthors,
    addAuthor,
    getAuthorByKeyword,
    editAuthor,
    search
}
