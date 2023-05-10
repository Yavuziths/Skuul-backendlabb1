const db_context = require('../db_context')
const authorModel = require('../models/authorModel')

async function getAllAuthors() {
    let authors = []
    let data = await db_context.selectAllAuthors()
    data.forEach((author) => {
        authors.push(new authorModel(author.id, author.name))
    })
    return authors
}

async function getAuthorByKeyword(keyword) {
    let authors = []
    let data = await db_context.selectAuthorByKeyword(keyword)
    data.forEach((author) => {
        authors.push(new authorModel(author.id, author.name))
    })
    return authors
}

async function addAuthor(name) {
    await db_context.insertAuthor(name)
}

async function editAuthor(authorId, name) {
    await db_context.updateAuthor(authorId, name)
}

async function updateAuthorNow(id, name) {
    await db_context.updateAuthor(id, name)
}

module.exports = {
    updateAuthorNow,
    addAuthor,
    getAllAuthors,
    getAuthorByKeyword,
    editAuthor
}
