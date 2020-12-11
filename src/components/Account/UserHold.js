import React, {useState} from 'react'
import axios from 'axios'

const UserHold = (props) =>  {
    const [deleting, toggleDeleting] = useState(false)
    const {title, cover, year, author, hold_id} = props.hold
    const {email} = props.user


    const deleteHoldEmail = async () => {
        const subject = "Hold removed"
        const text = `Hello, you've recently removed a hold on ${title}.  We hope you've found a book to enjoy or will find one soon.`

        await axios.post("/api/email", {email, subject, text})
        try {
            console.log("Email sent")
        } catch (err) {
            console.log(err)
            alert("Unable to send email")
        }
    }


    const deleteHold = async (holdId) => {
        try {
            await axios.delete (`/api/hold/${holdId}`)
            deleteHoldEmail()
            props.getUserHolds()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className = "user-hold">
            <img src = {cover} alt = "book cover"/>
            <div className = "info">
                <h1>{title}</h1>
                <h2>{author}</h2>
                <h3>{year}</h3>
            </div>
            <div className = "buttons">
            {deleting
                    ?
                        <div className = "are-you-sure-box">
                            <p> Are you sure? </p>
                            <button
                            className = "remove-button"
                            onClick={() => {
                                deleteHold(hold_id)
                                toggleDeleting(!deleting)
                            }}
                            >
                            Remove
                            </button>
                            <button onClick = {() =>
                                    toggleDeleting(!deleting)
                                }> Cancel 
                            </button>
                        </div>
                    :
                        <button
                            className = "remove-button"
                            onClick = {() =>
                                toggleDeleting(!deleting)
                            }
                            >
                            Remove Hold
                        </button>}  
            </div>
        </div>
    )
}

export default UserHold