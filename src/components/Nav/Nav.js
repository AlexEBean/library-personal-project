import React from 'react'
import {Link, useHistory} from "react-router-dom"
import {connect, useDispatch, useSelector} from "react-redux"
import {logoutUser} from "../../redux/authReducer"
import axios from "axios"
import "./nav.scss"

const Nav = () => {
    const {user} = useSelector((state) => state.reducer)
    const {user_id, admin} = user

    const history = useHistory()
    const dispatch = useDispatch()

    const logout = async () => {
        try {
            await axios.post('/auth/logout')
                dispatch(logoutUser())
                history.push('/')
        } catch (err){
            console.log(err)
        }
    }

    return (
        <div className = "nav">
            <Link to = "/" className = "link">
                Home
            </Link>
            {admin
            ?
                <Link to = "/admin" className = "link">
                Admin
                </Link>
            :
                null}
            <Link to = "/catalog" className = "link">
                Catalog
            </Link>
            {user_id
            ?
                <Link to = "/account" className = "link">
                    Account
                </Link>
            :
                null
            }
            {user_id
            ?
                
                <Link to = "/"
                    className = "link"
                    onClick = {logout}
                >
                    Logout
                </Link>
            :
                <Link to = "/login" className = "link">
                    Login
                </Link>
            }
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {logoutUser})(Nav)
