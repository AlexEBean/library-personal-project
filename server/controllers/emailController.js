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