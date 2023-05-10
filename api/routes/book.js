const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookController')

router.get('/search', async (req, res) => {
    await controller.search(req, res)
})
router.get('/', async (req, res) => {
    await controller.allBooks(req, res)
})

router.delete('/:id', async (req, res) => {
    await controller.remove(req.params.id, res)
})

router.post('/', async (req, res) => {
    await controller.add(req, res)
})

router.put('/:id', async (req, res) => {
    await controller.update(req, res)
})

module.exports = router
