import React, {useEffect} from 'react'
import axios from "axios"
import "./home.scss"

const Home = () => {

    useEffect (() => {
        updateViews()
    }, [])

    const updateViews = async () => {
        try{
            const page = "Home"
            await axios.post("/auth/view", {page})
        } catch(err) {
            console.log(err)
            alert("Error in updating view count")
        }
    }

    return (
        <div className = "home">
            <h1>Welcome to the Library!</h1>
            <h2>Feel free to browse our catalog or login if you need to place a hold.</h2>
        </div>
    )
}

export default Home