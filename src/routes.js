import React from "react"
import {Switch, Route} from "react-router-dom"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Catalog from "./components/Catalog/Catalog"
import Account from "./components/Account/Account"
import Admin from "./components/Admin/Admin"
import Register from "./components/Register/Register"

export default (
    <Switch>
        <Route exact path = "/" component = {Home}/>
        <Route path = "/login" component = {Login}/>
        <Route path = "/catalog" component = {Catalog}/>
        <Route path = "/account" component = {Account}/>
        <Route path = "/admin" component = {Admin}/>
        <Route path = "/register" component = {Register}/>
    </Switch>
)