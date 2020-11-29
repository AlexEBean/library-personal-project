import React, {useEffect} from 'react'
import { getHolds } from '../../redux/holdReducer'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import UserHold from "../UserHold/UserHold"

const Account = () => {
    const {user} = useSelector((state) => state.reducer)
    const {holds} = useSelector((state) => state.holdReducer)
    const {user_id} = user

    const dispatch = useDispatch()

    useEffect(() => {
        getAllHolds()
      }, [])

    const getAllHolds = async () => {
        try {
          const res = await axios.get(`/api/hold/${user_id}`)
          dispatch(getHolds(res.data))
        } catch (err) {
          console.log(err)
        }
    }

    const mappedHolds = holds.map((hold, index) => {
        return (
            <UserHold 
            key = {`${hold.hold_id}-${index}`} 
            hold = {hold}
            user = {user}
            getAllHolds = {getAllHolds}
            />
        )
    })
    
    return (
        <div>
            <ul
                style = {{listStyle: "none"}} 
            >
                {mappedHolds}
            </ul>
        </div>
    )
}

export default Account