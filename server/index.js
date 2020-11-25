require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require("./controllers/authController")
const { checkUser } = require("./middleware")

const bookCtrl = require("./controllers/bookController")
const holdCtrl = require("./controllers/holdController")

const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(database => {
    app.set("db", database)
    console.log("Connected to DB")
})

app.get("/api/user", checkUser, authCtrl.getUser)
app.put("/api/user", checkUser, authCtrl.updateUser)
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`))