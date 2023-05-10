const {
    getAllRents,
    addRent,
    getRentByKeyword,
    editRent
} = require('../repositories/rentRepository')

async function search(req, res) {
    let data = await getRentByKeyword(req.query.keyword)
    console.log(data)
    return res.json(data)
}

module.exports = {
    getAllRents,
    addRent,
    getRentByKeyword,
    editRent,
    search
}
