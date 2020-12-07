import React from 'react'
import axios from 'axios'
import {useHistory} from "react-router-dom"

const Book = (props) =>  {
    const {title, cover, author, year, book_id} = props.book
    const {user_id, admin, email} = props.user
    const history = useHistory()

    const deleteBook = async (bookId) => {
        try {
            await axios.delete (`/api/book/${bookId}`)
            props.getBooks()
        } catch (err) {
            console.log(err)
        }
    }

    const newHoldEmail = async () => {
        const subject = "New Hold Placed"
        const text = `Hello, you've recently placed a hold on ${title}.  We will let you know when it's available.`

        await axios.post("/api/email", {email, subject, text})
        try {
            console.log("Email sent")
        } catch (err) {
            console.log(err)
            alert("Unable to send email")
        }
    }

    const addHold = async (bookId) => {
        try {
            await axios.post (`/api/hold/${bookId}`)
            history.push("/account")
            newHoldEmail()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className = "book">
            <img src = {cover} alt = "book cover"/>
            <div className = "info">
                <h1>{title}</h1>
                <h2>{author}</h2>
                <h3>{year}</h3>
            </div>
            <div className = "buttons">
                {user_id
                ? 
                    <button
                        onClick = {() =>
                            addHold(book_id)
                        }
                    >
                        Place Hold
                    </button>
                :
                    null
                }
                {admin
                ? 
                    <button
                        className = "remove-button"
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
        </div>
    )
}

export default Book