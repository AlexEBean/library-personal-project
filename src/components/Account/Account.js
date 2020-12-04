import React, {useEffect, useCallback, useState} from 'react'
import { getHolds } from '../../redux/holdReducer'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import UserHold from "../UserHold/UserHold"
import "./account.scss"

const Account = () => {
    const {user} = useSelector((state) => state.reducer)
    const {holds} = useSelector((state) => state.holdReducer)
    const {user_id, profile_pic} = user
    const [update, setUpdate] = useState(false)
    const [picURL, setURL] = useState(`${profile_pic}`)

    const dispatch = useDispatch()

    const getUserHolds = useCallback(async () => {
        try {
          const res = await axios.get(`/api/hold/${user_id}`)
          dispatch(getHolds(res.data))
        } catch (err) {
          console.log(err)
        }
    }, [dispatch, user_id])

    useEffect(() => {
        getUserHolds()
      }, [getUserHolds])

      const updateProfilePicture = async () => {
        try {
            await axios.put("/api/user", {picURL})
        }
        catch(err) {
            console.log(err)
        }
      }

    const mappedHolds = holds.map((hold, index) => {
        return (
                <UserHold 
                key = {`${hold.hold_id}-${index}`} 
                hold = {hold}
                user = {user}
                getUserHolds = {getUserHolds}
            />
        )
    })
    
    return (
        <div className = "account">
            {user_id 
            ?
                <div className = "account-info">
                    <div className = "profile-info">
                        <img src = {profile_pic
                                ?
                                    `${profile_pic}`    
                                :
                                    "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg"
                                } 
                            alt = "profile" 
                            className = "profile-picture"/>
                            {update
                            ?
                                <div className = "update-form">
                                    <input
                                        name = "profile_pic"
                                        value = {picURL}
                                        placeholder = "Profile Picture URL"
                                        onChange = {e => setURL(e.target.value)}
                                    />
                                    <button onClick = {() => {
                                        updateProfilePicture()
                                        setUpdate(!update)
                                    }}> 
                                        Save
                                    </button> 
                                    <button onClick = {() => {
                                        setUpdate(!update)
                                    }}> 
                                        Cancel
                                    </button> 
                                </div>
                            :
                                <button onClick = {() => {
                                    setUpdate(!update)
                                }}> 
                                    Update Profile Picture 
                                </button>   
                            }
                    </div>
                    <ul className = "user-holds"
                        style = {{listStyle: "none"}} 
                    >
                        {mappedHolds}
                    </ul>
                </div>   
            :
                null
            }
        </div>
    )
}

export default Account