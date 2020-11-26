module.exports = {
    getBooks: async (req, res) => {
        const db = req.app.get('db')
        const allBooks = await db.book.get_books()
        res.status(200).send(allBooks)
    },

    addBook: async (req, res) => {
        const db = req.app.get('db')
        const {cover, title, year, author} = req.body
  
        try {
            const [newBook] = await db.book.add_book([cover, title, year, author])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in adding book", err)
            res.sendStatus(404)
        }
    },

    deleteBook: async (req, res) => {
        const db = req.app.get('db')
        const {bookId} = req.params

        try {
            await db.book.delete_book([+bookId])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in deleting book", err)
            res.sendStatus(500)
        }
      }
}