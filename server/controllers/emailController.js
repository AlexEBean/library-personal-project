const nodemailer = require("nodemailer")

module.exports = {

    email: async (req, res) => {

        const {email, subject, text} = req.body

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "writersblockdawgs@gmail.com",
                pass: "Writersblock$"
            }
        })

        const message = {
            from: "writersblockdawgs@gmail.com",
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