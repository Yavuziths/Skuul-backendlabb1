async function getResultsByKeyword() {
    let keyword = document.querySelector('#keyword').value
    let author = document.querySelector('#author').value
    // If no search criteria are provided, return an empty array
    if (!keyword && !author && !genre) {
        return []
    }

    // Fetch books matching the search criteria
    let bookOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    }

    let bookParams = new URLSearchParams()
    if (keyword) bookParams.append('keyword', keyword)
    if (author) bookParams.append('author', `%${author}%`)

    let bookResponse = await fetch(
        'http://localhost:3001/book/search?' + bookParams,
        bookOptions
    ).catch((error) => {
        console.error(error)
    })

    let bookData = await bookResponse.json()

    // Fetch authors matching the search criteria
    let authorOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    }

    let authorParams = new URLSearchParams()
    if (author) authorParams.append('keyword', author)

    let authorResponse = await fetch(
        'http://localhost:3001/author/search?' + authorParams,
        authorOptions
    ).catch((error) => {
        console.error(error)
    })

    let authorData = await authorResponse.json()

    // Combine the book and author data into one array
    let data = [...bookData, ...authorData]

    printResults(data)
}

function printResults(data) {
    const ul = document.querySelector('#searchResults')
    ul.innerHTML = ''

    for (const item of data) {
        let li = document.createElement('li')
        let a = document.createElement('a')
        let span = document.createElement('span')

        if (item.title) {
            a.innerText = item.title
            span.textContent = ` (${item.availableCopies} copies available, ${item.rentedCopies} rented copies)`
            a.appendChild(span)
        } else if (item.name) {
            a.innerText = item.name
        }

        li.appendChild(a)
        ul.appendChild(li)
    }
}
