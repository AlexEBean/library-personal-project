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

    const welcomeEmail = async () => {
        const subject = "Welcome!"
        const text = `Hello ${firstName} ${lastName}, welcome to the library!`

        await axios.post("/api/email", {email, subject, text})
        try {
            console.log("Email sent")
        } catch (err) {
            console.log(err)
            alert("Unable to email")
        }
    }

    const register = async (e) => {
        e.preventDefault()
        welcomeEmail()
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