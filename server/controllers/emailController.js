require('dotenv').config()
const nodemailer = require("nodemailer")
const {USER, PASS} = process.env

module.exports = {

    email: async (req, res) => {

        const {email, subject, text} = req.body

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: USER,
                pass: PASS
                // It works if the FROM_EMAIL and PASSWORD variables are replaced with what's in the env file.  
                // Making a comment here as a reminder to come back to this when other minimum things are completed.
            }
        })

        let message = {
            from: `${USER}`,
            to: email,
            subject: subject,
            text: text,
            html: `<p>${text}</p>`
        }

        await transporter.sendMail(message, (err, res) => {
            if (err) {
                console.log(err);
              } else {
                console.log("Email sent: " + res.response)
                res.sendStatus(200)
              }
        })
        
    }
}