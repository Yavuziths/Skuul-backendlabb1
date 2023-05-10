const express = require('express')
const router = express.Router()
const controller = require('../controllers/authorController')

router.get('/search', async (req, res) => {
    await controller.search(req, res)
})

router.get('/', async (req, res) => {
    await controller.allAuthors(req, res)
})

router.post('/', async (req, res) => {
    await controller.createAuthor(req, res)
})
router.put('/:id', async (req, res) => {
    await controller.updateAuth(req, res)
})

module.exports = router
