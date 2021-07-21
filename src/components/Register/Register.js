import React, {useState, useEffect} from 'react'
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
    const [passCheck, setPassCheck] = useState("")
    const [filledOut, setFilledOut] = useState(false)
    const [passMatch, setPassMatch] = useState(false)


    useEffect(() => {
        if (password === passCheck) {
            setPassMatch(true)
        } else {
            setPassMatch(false)
        }
        if (firstName && lastName && email && password && passCheck) {
            setFilledOut(true)
        } else {
            setFilledOut(false)
        }
        

    }, [firstName, lastName, email, password, passCheck, passMatch])

    const welcomeEmail = async () => {
        const subject = "Welcome!"
        const text = `Hello ${firstName} ${lastName}, welcome to the library!`

        try {
            await axios.post("/api/email", {email, subject, text})
            console.log("Email sent")
        } catch (err) {
            console.log(err)
        }
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            if (!filledOut){
                alert("Please fill out all fields.")
            } else if (!passMatch){
                alert("Your passwords do not match.")
            } else {
                const res = await axios.post("/auth/register", {firstName, lastName, email, password})
                dispatch(loginUser(res.data))
                welcomeEmail(e)
                history.push("/account")
            }
        }
        catch(err) {
            console.log(err)
            alert("Email account already registered")
        }
    }

    const backToLogin = async (e) => {
        history.push("/login")
    }

    useEffect(() => {
        updateViews()
      }, [])

    const updateViews = async () => {
        try{
            const page = "Register"
            await axios.post("/auth/view", {page})
        } catch(err) {
            console.log(err)
            alert("Error in updating view count")
        }
    }

    const inputsArr = [
        {name: "First Name", type: "text", setState: setFirstName},
        {name: "Last Name", type: "text", setState: setLastName},
        {name: "Email", type: "email", setState: setEmail},
        {name: "Password", type: "password", setState: setPassword},
        {name: "Confirm password", type: "password", setState: setPassCheck}
    ]

    return (
        <div className = "register">
            <form>
                <h3>To register, please fill the blanks below:</h3>
                    {inputsArr.map(input => (
                            <input className = "input" placeholder = {input.name} type = {input.type} onChange={e => input.setState(e.target.value)} />
                            
                    ))}
                {/* <h4 className = "passwords-do-not-match" style = {{visibility: passMatch ? "hidden" : "visible"}}>
                    Passwords do not match.
                </h4> */}
                <button onClick = {register} > Register </button>
                <button onClick = {backToLogin} > Back to login </button>
            </form>
        </div>
    )
}

export default connect(null, {loginUser})(Register)