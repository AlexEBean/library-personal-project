require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require("./controllers/authController")
const { checkUser, checkAdmin } = require("./middleware")

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


app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
// app.get("/api/user", checkUser, authCtrl.getUser)
// app.put("/api/user", checkUser, authCtrl.updateProfilePic)
// app.get("/api/users", checkAdmin, authCtrl.getUsers)
// app.put("/api/user/:userId", checkAdmin, authCtrl.updateUser)
// app.delete("/api/user/:userId", checkAdmin, authCtrl.deleteUser)

app.get("/api/books", bookCtrl.getBooks)
app.post("/api/book", checkAdmin, bookCtrl.addBook)
app.delete("/api/book/:bookId", checkAdmin, bookCtrl.deleteBook)

app.get("/api/holds", checkAdmin, holdCtrl.getHolds)
app.get("/api/hold/:userId", checkUser, holdCtrl.getHold)
app.post("/api/hold/:bookId", checkUser, holdCtrl.addHold)
app.delete("/api/hold/:holdId", checkUser, holdCtrl.deleteHold)

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`))