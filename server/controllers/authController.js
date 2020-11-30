const bcrypt = require("bcrypt")

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const {firstName, lastName, email, password} = req.body
        const existingUser = await db.auth.check_user(email)
        if (existingUser[0]) {
          return res.status(409).send("User already exists with that email")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.auth.add_user([firstName, lastName, email, hash])

        req.session.user = newUser

        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const [foundUser] = await db.auth.check_user(email)
        if(!foundUser){
            return res.status(401).send("Incorrect login information")
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if( authenticated ){
            req.session.user = foundUser
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Incorrect login information')
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('Please log in')
        }
    },
    
    updateProfilePic: async (req, res) => {
        const db = req.app.get("db")
        const {user_id} = req.session.user
        const {profilePic} = req.body
        await db.auth.update_profile_pic(+user_id, profilePic)
        req.session.user.profile_pic = profilePic
        
        res.status(200).send(req.session.user)
    },

    getUsers: async (req, res) => {
        const db = req.app.get("db")
        const allUsers = await db.auth.get_users()
        res.status(200).send(allUsers)
    },

    updateUser: async (req, res) => {
        const db = req.app.get("db")
        const {userId} = req.params
        const [updatedUser] = await db.auth.update_user_admin_status(+userId)
        
        req.session.user = updatedUser
        res.status(200).send(req.session.user)
    },
    deleteUser: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.params

        try {
            await db.auth.remove_user([+userId])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in removing User", err)
            res.sendStatus(500)
        }
      }
}