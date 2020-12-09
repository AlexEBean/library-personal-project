import React, {useState} from 'react'
import axios from "axios"

const User = (props) =>  {
    const {first_name, last_name, profile_pic, email, user_id, admin} = props.oneUser
    const [deleting, toggleDeleting] = useState(false)

    const changeAdminStatus = async (user_id) => {
        await axios.put (`/api/user/${user_id}`)
        try {
            props.getAllUsers()
        } catch (err) {
            console.log(err)
        }
    }

    const deleteUser = async (user_id) => {
        await axios.delete (`/api/user/${user_id}`)
        try {
            props.getAllUsers()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className = "user">
            <img src = {profile_pic
                        ?
                            profile_pic
                        :
                            "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg"
                        } alt = "profile"/>
            <div className = "info">
                <h3>User's name: {first_name} {last_name}</h3>
                <h3>User's email address: {email}</h3>
                <h3>Admin:  
                    {admin
                    ?
                        " True"
                    :
                        " False"
                    }
                </h3>
            </div>
            <div className = "buttons">
                <button
                        onClick = {() =>
                            changeAdminStatus(user_id)
                        }
                    >
                        {admin
                        ?
                            "Remove Admin Status"
                        :
                            "Give Admin Status"
                        }
                </button>
                    {deleting
                    ?
                        <div className = "are-you-sure-box">
                            <p> Are you sure? </p>
                            <button
                            className = "remove-button"
                            onClick={() => {
                                deleteUser(user_id)
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
                            Remove User
                        </button>}  
            </div>
        </div>
    )
}

export default User