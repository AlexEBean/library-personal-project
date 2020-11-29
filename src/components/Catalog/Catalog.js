import React, { useState, useEffect } from "react"
import {connect, useSelector} from "react-redux"
import axios from "axios"
import Book from "../Book/Book"


const Catalog = () => {
    const [books, setBooks] = useState([])
    const [add, setAdd] = useState(false)
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState("")
    const {user} = useSelector((state) => state.reducer)

    useEffect(() => {
        getBooks()
      }, [])

    const getBooks = async () => {
        try {
          const res = await axios.get("/api/books")
          setBooks(res.data)
        } catch (err) {
          console.log(err)
        }
    }

    const addBook = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/api/book", {cover, title, author, year})
            setTitle("")
            setCover("")
            setAuthor("")
            setYear("")
            getBooks()
        } catch (err) {
            console.log(err)
        }
    }

    const mappedBooks = books.map((book, index) => {
        return (
            <Book 
                key = {`${book.book_id}-${index}`} 
                book = {book}
                user = {user}
                getBooks = {getBooks}
            />
        )
    })

    return (
        <div>

            {add 
            ?
                <form>
                    <input
                        name = "title"
                        value = {title}
                        placeholder = "Book Title"
                        onChange = {e => setTitle(e.target.value)}
                    />
                    <input
                        name = "cover"
                        value = {cover}
                        placeholder = "Book Cover URL"
                        onChange = {e => setCover(e.target.value)}
                    />
                    <input
                        name = "author"
                        value = {author}
                        placeholder = "Author"
                        onChange = {e => setAuthor(e.target.value)}
                    />
                    <input
                        name = "year"
                        value = {year}
                        placeholder = "Year published"  
                        onChange = {e => setYear(e.target.value)}
                    />
                    <button 
                        onClick = {addBook} 
                        > 
                        Submit 
                    </button>
                </form>
            :
                user.admin
                    ? <button
                        onClick = {() => {
                            setAdd(!add)
                        }}
                    >
                        Add Book
                    </button>
                    : null
            }

            <ul
                style = {{listStyle: "none"}} 
            >
                {mappedBooks}
            </ul>
        </div>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Catalog)