import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from "react-router-dom"

const Book = (props) =>  {
    const [deleting, toggleDeleting] = useState(false)
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

        try {
            await axios.post("/api/email", {email, subject, text})
            console.log("Email sent")
        } catch (err) {
            console.log(err)
            alert("Unable to send email")
        }
    }

    const addHold = async (bookId) => {
        try {
            await axios.post (`/api/hold/${bookId}`)
            newHoldEmail()
            history.push("/account")
        } catch (err) {
            console.log(err)
            alert("You already have a hold on that book.")
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
                    deleting
                    ?
                        <div className = "are-you-sure-box">
                            <p> Are you sure? </p>
                            <button
                            className = "remove-button"
                            onClick={() => {
                                deleteBook(book_id)
                                toggleDeleting(!deleting)
                            }}
                            >
                                Remove
                            </button>
                            <button onClick = {() =>
                                    toggleDeleting(!deleting)
                                }
                            > 
                                Cancel 
                            </button>
                        </div>
                    :
                        <button
                            className = "remove-button"
                            onClick = {() =>
                                toggleDeleting(!deleting)
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