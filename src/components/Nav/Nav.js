import React from 'react'
import {Link, useHistory} from "react-router-dom"
import {connect, useDispatch, useSelector} from "react-redux"
import {logoutUser} from "../../redux/authReducer"
import axios from "axios"

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
            <Link to = "/">
                Home
            </Link>
            {admin
            ?
                <Link to = "/admin">
                Admin
                </Link>
            :
                null}
            <Link to = "/catalog">
                Catalog
            </Link>
            {user_id
            ?
                <Link to = "/account">
                    Account
                </Link>
            :
                null
            }
            {user_id
            ?
                
                <Link to = "/"
                    onClick = {logout}
                >
                    Logout
                </Link>
            :
                <Link to = "/login">
                    Login
                </Link>
            }
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {logoutUser})(Nav)
