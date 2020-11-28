import React, {useState} from 'react'
import axios from "axios"
import {loginUser} from "../../redux/authReducer"
import {connect, useDispatch} from "react-redux"
import {useHistory, Link} from "react-router-dom"

const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/login", {email, password})
            dispatch(loginUser(res.data))
            history.push("/account")
        }
        catch(err) {
            console.log(err)
            alert("Unable to register at this time")
        }
    }

    return (
        <div>
            <form>
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
            </form>
                <Link to = "/register"> Need to Register? </Link>
        </div>
    )
}

export default connect(null, {loginUser})(Login)