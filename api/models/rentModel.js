module.exports = class rent {
    constructor(id, book_id, rental_date, return_date) {
        this.id = id;
        this.book_id = book_id;
        this.rental_date = rental_date;
        this.return_date = return_date;
    }
};
