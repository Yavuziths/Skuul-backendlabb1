module.exports = class bookSearch {
    constructor(
        id,
        title,
        author_id,
        genre,
        year,
        availableCopies,
        rentedCopies
    ) {
        this.id = id
        this.title = title
        this.author_id = author_id
        this.genre = genre
        this.year = year
        this.availableCopies = availableCopies
        this.rentedCopies = rentedCopies
    }
}
