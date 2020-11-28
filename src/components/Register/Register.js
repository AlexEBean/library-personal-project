import React, {useState} from 'react'
import axios from "axios"
import {loginUser} from "../../redux/authReducer"
import {connect, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"

const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/register", {firstName, lastName, email, password})
            dispatch(loginUser(res.data))
            history.push("/account")
        }
        catch(err) {
            console.log(err)
            alert("Unable to register at this time")
        }
    }

    return (
        <div className = "auth">
            <form>
                <input
                    name = "first name"
                    value = {firstName}
                    placeholder = "First Name"
                    onChange = {e => setFirstName(e.target.value)}
                />
                <input
                    name = "last name"
                    value = {lastName}
                    placeholder = "Last Name"
                    onChange = {e => setLastName(e.target.value)}                
                />
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
                <button onClick = {register} > Register </button>
            </form>
        </div>
    )
}

export default connect(null, {loginUser})(Register)