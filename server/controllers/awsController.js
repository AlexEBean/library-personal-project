require('dotenv').config()
const aws = require("aws-sdk")
const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

module.exports = {



    updateProfilePic: async (req, res) => {
        const db = req.app.get("db")
        const {user_id} = req.session.user
        const {profilePic} = req.body
        await db.auth.update_profile_pic(+user_id, profilePic)
        req.session.user.profile_pic = profilePic
        
        res.status(200).send(req.session.user)
    }
}