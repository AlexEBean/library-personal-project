import React, { useState, useEffect } from "react"
import {connect, useSelector} from "react-redux"
import axios from "axios"
import Book from "./Book"
import "./catalog.scss"

const Catalog = () => {
    const [books, setBooks] = useState([])
    const [add, setAdd] = useState(false)
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState("")
    const [search, setSearch] = useState("")
    const {user} = useSelector((state) => state.reducer)

    useEffect(() => {
        getAllBooks()
        updateViews()
      }, [])

    const getAllBooks = async () => {
        try {
          const res = await axios.get("/api/books")
          setBooks(res.data)
        } catch (err) {
          console.log(err)
        }
    }

    const getBooksBySearch = async () => {
        try {
          const res = await axios.get(`/api/books?search=${search}`)
          setBooks(res.data)
        } catch (err) {
          console.log(err)
        }
    }

    const reset = () => {
        setSearch("")
        getAllBooks()
    }

    const addBook = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/api/book", {cover, title, author, year})
            setTitle("")
            setCover("")
            setAuthor("")
            setYear("")
            getAllBooks()
        } catch (err) {
            console.log(err)
        }
    }

    const updateViews = async () => {
        try{
            const page = "Catalog"
            await axios.post("/auth/view", {page})
        } catch(err) {
            console.log(err)
            alert("Error in updating view count")
        }
    }

    const mappedBooks = books.map((book, index) => {
        return (
            <Book 
                key = {`${book.book_id}-${index}`} 
                book = {book}
                user = {user}
                getAllBooks = {getAllBooks}
            />
        )
    })

    return (
        <div className = "catalog">
            <div className = "add-book-box">
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
                            className = "add-book-buttons"
                            onClick = {(e) => {
                                addBook(e)
                                setAdd(!add)
                            }}
                            > 
                            Submit 
                        </button>
                        <button
                            className = "add-book-buttons"
                            onClick = {() => {
                                setAdd(!add)
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                :
                    user.admin
                        ? <button
                            className = "add-book-buttons"
                            id = "add-book-button"
                            onClick = {() => {
                                setAdd(!add)
                            }}
                        >
                            Add Book
                        </button>
                        : null
                }
            </div>
            <div
                className = "search-box"
            >
                <input 
                    name = "search"
                    value = {search}
                    placeholder = "Search..."
                    onChange = { e => setSearch(e.target.value)}
                />
                <button 
                    onClick = {getBooksBySearch} 
                    className = "search-btn"
                    >
                    Search
                    </button>
                <button 
                    onClick = {reset} 
                    className = "search-btn"
                    >
                    Reset Search
                </button>
            </div>
            <ul
                className = "book-list"
                style = {{listStyle: "none"}} 
            >
                {mappedBooks}
            </ul>
        </div>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Catalog)