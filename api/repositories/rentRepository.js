const rentModel = require('../models/rentModel')
const db_context = require('../db_context')

async function getAllRents() {
    let rents = []
    let data = await db_context.selectAllRents()
    data.forEach((rent) => {
        rents.push(
            new rentModel(
                rent.id,
                rent.book_id,
                rent.rental_date,
                rent.return_date
            )
        )
    })
    return rents
}

async function getRentByKeyword(keyword) {
    let rents = []
    let data = await db_context.selectRentByKeyword(keyword)
    data.forEach((rent) => {
        rents.push(
            new rentModel(
                rent.id,
                rent.book_id,
                rent.rental_date,
                rent.return_date
            )
        )
    })
    return rents
}

async function addRent(book_id, rental_date, return_date) {
    await db_context.insertRent(book_id, rental_date, return_date)
}

async function editRent(rentId, book_id, rental_date, return_date) {
    await db_context.updateRent(rentId, book_id, rental_date, return_date)
}

module.exports = {
    getAllRents,
    getRentByKeyword,
    addRent,
    editRent
}
