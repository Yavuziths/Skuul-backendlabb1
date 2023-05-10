document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form')

    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const title = document.querySelector('#title').value
        const author = document.querySelector('#author').value
        const genre = document.querySelector('#genre').value
        const year = document.querySelector('#year').value

        const url = `http://localhost:3001/book?title=${title}&author_id=${author}&genre=${genre}&year=${year}`

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, options)

            if (response.ok) {
                console.log('Book created successfully')
                window.location.href = '/success.html'
            } else {
                console.error('Error creating book:', response.status)
               
            }
        } catch (error) {
            console.error('Error:', error)

        }
    })
})
