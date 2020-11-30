import React, {useEffect} from 'react'
import { getHolds } from '../../redux/holdReducer'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import AllHolds from "../AllHolds/AllHolds"


const Admin = () => {
    const {user} = useSelector((state) => state.reducer)
    const {holds} = useSelector((state) => state.holdReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        getAllHolds()
      }, []) 

    const getAllHolds = async () => {
        try {
          const res = await axios.get("/api/holds")
          dispatch(getHolds(res.data))
        } catch (err) {
          console.log(err)
        }
    }

    const mappedHolds = holds.map((hold, index) => {
        return (
            user.admin 
            ?
                <AllHolds 
                key = {`${hold.hold_id}-${index}`} 
                hold = {hold}
                user = {user}
                getAllHolds = {getAllHolds}
                />
            :
                null
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

export default Admin