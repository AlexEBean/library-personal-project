import React, {useEffect, useCallback} from 'react'
import { getHolds } from '../../redux/holdReducer'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import UserHold from "../UserHold/UserHold"

const Account = () => {
    const {user} = useSelector((state) => state.reducer)
    const {holds} = useSelector((state) => state.holdReducer)
    const {user_id, profile_pic} = user

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
        <div>
            {user_id 
            ?
                <div>
                    <img src = {profile_pic} alt = "profile"/>
                    <ul
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