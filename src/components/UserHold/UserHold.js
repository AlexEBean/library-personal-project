import React from 'react'
import axios from 'axios'

const UserHold = (props) =>  {
    const {title, cover, year, author, hold_id} = props.hold

    const deleteHold = async (holdId) => {
        try {
            await axios.delete (`/api/hold/${holdId}`)
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
                <button
                        className = "remove-button"
                        onClick = {() =>
                            deleteHold(hold_id)
                        }
                    >
                        Remove Hold
                </button>
            </div>
        </div>
    )
}

export default UserHold