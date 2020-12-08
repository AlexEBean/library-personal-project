import React, {useEffect, useCallback} from 'react'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import { getUsers } from '../../redux/userReducer'
import User from "./User"
import "./userList.scss"

const UserList = () => {
    const {user} = useSelector((state) => state.reducer)
    const {users} = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()


    const getAllUsers = useCallback(async () => {
        try {
          const res = await axios.get(`/api/users`)
          dispatch(getUsers(res.data))
        } catch (err) {
          console.log(err)
        }
    }, [dispatch])

    useEffect(() => {
        getAllUsers()
      }, [getAllUsers]) 

    const mappedUsers = users.map((oneUser, index) => {
        return (
                <User 
                key = {`${oneUser.user_id}-${index}`} 
                oneUser = {oneUser}
                getAllUsers = {getAllUsers}
                />
        )
    })
    
    return (
        <div className = "user-list">
            {user.admin
            ?
                <ul className = "list"
                >
                    <h2>All Users</h2>
                    {mappedUsers}
                </ul>
            :
                null
            }
        </div>
    )
}

export default UserList