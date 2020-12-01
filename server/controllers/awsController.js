require('dotenv').config()
const aws = require("aws-sdk")
const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET} = process.env

module.exports = {

    // config: (req, res) => {
    //     aws.config = {
    //         region: "us-west-2",
    //         accessKeyId: AWS_ACCESS_KEY_ID,
    //         secretAccessKey: AWS_SECRET_ACCESS_KEY
    //     }

    //     const s3 = new aws.S3()
    //     const fileName = req.query["file-name"]
    //     const fileType = req.query["file-type"]
    //     const s3Params = {
    //         Bucket: BUCKET,
    //         Key: fileName,
    //         Expires: 60,
    //         ContentType: fileType,
    //         ACL: "public-read"
    //     }

    //     s3.getSignedUrl("putObject", s3Params, (err, data) => {
    //         if (err) {
    //             console.log(err)
    //             return res.end()
    //         }
    //         const returnData = {
    //             signedRequest: data,
    //             url: `https://${BUCKET}.s3.amazonaws.com/${fileName}`
    //         }

    //         return res.send(returnData)
    //     })
    // },

    updateProfilePic: async (req, res) => {
        const db = req.app.get("db")
        const {user_id} = req.session.user
        const {profilePic} = req.body
        await db.auth.update_profile_pic(+user_id, profilePic)
        req.session.user.profile_pic = profilePic
        
        res.status(200).send(req.session.user)
    }
}