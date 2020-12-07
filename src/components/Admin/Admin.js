import React, {useEffect} from 'react'
import { getHolds } from '../../redux/holdReducer'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import AllHolds from "../AllHolds/AllHolds"
import "./admin.scss"

const Admin = () => {
    const {user} = useSelector((state) => state.reducer)
    const {holds} = useSelector((state) => state.holdReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        const getAllHolds = async () => {
            try {
              const res = await axios.get("/api/holds")
              dispatch(getHolds(res.data))
            } catch (err) {
              console.log(err)
            }
        }
        getAllHolds()
      }, [dispatch]) 

    const mappedHolds = holds.map((hold, index) => {
        return (
                <AllHolds 
                key = {`${hold.hold_id}-${index}`} 
                hold = {hold}
                user = {user}
                />
        )
    })
    
    return (
        <div className = "admin">
            {user.admin
            ?
                <ul className = "all-holds"
                style = {{listStyle: "none"}} 
                >
                    <h2>All User Holds</h2>
                    {mappedHolds}
                </ul>
            :
                null
            }
        </div>
    )
}

export default Admin