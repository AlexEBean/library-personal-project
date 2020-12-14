import React, {useState} from 'react'
import axios from "axios"
import {loginUser} from "../../redux/authReducer"
import {connect, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import "./register.scss"

const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const welcomeEmail = async (e) => {
        e.preventDefault()
        const subject = "Welcome!"
        const text = `Hello ${firstName} ${lastName}, welcome to the library!`

        try {
            await axios.post("/api/email", {email, subject, text})
            console.log("Email sent")
        } catch (err) {
            console.log(err)
            alert("Unable to send email")
        }
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/register", {firstName, lastName, email, password})
            dispatch(loginUser(res.data))
            welcomeEmail()
            history.push("/account")
        }
        catch(err) {
            console.log(err)
            alert("Email account already registered")
        }
    }

    const backToLogin = async (e) => {
        history.push("/login")
    }

    return (
        <div className = "register">
            <form>
                <h3>To register, please fill the blanks below:</h3>
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
                <button onClick = {backToLogin} > Back to login </button>
            </form>
        </div>
    )
}

export default connect(null, {loginUser})(Register)