import React, {useState} from 'react'
import axios from "axios"
import {loginUser} from "../../redux/authReducer"
import {connect, useDispatch} from "react-redux"
import {useHistory, Link} from "react-router-dom"
import "./login.scss"

const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                alert("Please fill out all fields.")
            } else {
            const res = await axios.post("/auth/login", {email, password})
            dispatch(loginUser(res.data))
            history.push("/account")
            }
        }
        catch(err) {
            console.log(err)
            alert("Invalid email or password")
        }
    }

    return (
        <div className = "login">
            <form>
                <h1>Library Login</h1>
                <input
                    name = "email"
                    value = {email}
                    placeholder = "Email"
                    onChange = {e => setEmail(e.target.value)}                
                />
                <input
                    name = "password" 
                    type = "password"
                    value = {password} 
                    placeholder = "Enter Password" 
                    onChange = {e => setPassword(e.target.value)}
                />
                <button onClick = {login} > Login </button>
                <Link to = "/register" className = "link"> Need to Register? </Link>
            </form>
        </div>
    )
}

export default connect(null, {loginUser})(Login)