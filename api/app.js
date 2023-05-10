const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3001
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const bookRouter = require('./routes/book')
const authorRouter = require('./routes/author')
const rentRouter = require('./routes/rent')
const db_functions = require('./db_context')

app.use('/book', bookRouter)
app.use('/author', authorRouter)
app.use('/rent', rentRouter)
// app.use('/api/db_context.js', db_functions)

app.listen(PORT, () => {
    console.log('API - Listening on port*:' + PORT)
})
