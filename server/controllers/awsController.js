require('dotenv').config()
const aws = require("aws-sdk")
const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET} = process.env

module.exports = {

    config: (req, res) => {
        aws.config = {
            region: "us-west-2",
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }

        const s3 = new aws.S3()
        const fileName = req.query["file-name"]
        const fileType = req.query["file-type"]
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: "public-read"
        }

        s3.getSignedUrl("putObject", s3Params, (err, data) => {
            if (err) {
                console.log(err)
                return res.end()
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            }

            return res.send(returnData)
        })
    },

    updateProfilePic: async (req, res) => {
        const db = req.app.get("db")
        const {user_id, url} = req.body
        await db.auth.update_profile_pic(+user_id, url)
        
        res.sendStatus(200)
    }
}