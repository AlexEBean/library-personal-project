import React from 'react'
import axios from 'axios'


const Book = (props) =>  {
    const {title, cover, author, year, book_id} = props.book

    const deleteBook = async (book_id) => {
        try {
            await axios.delete (`/api/book/${book_id}`)
            props.getBooks()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <img src = {cover} alt = "book cover"/>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <h3>{year}</h3>
            {props.user.admin
            ? 
                <button
                    onClick = {() =>
                        deleteBook(book_id)
                    }
                >
                    Remove Book
                </button>
            :
                null
            }
        </div>
    )
}

export default Book