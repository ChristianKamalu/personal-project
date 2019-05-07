require('dotenv').config();
const {EMAIL, PASSWORD} = process.env;
// const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: EMAIL, // generated ethereal user
//       pass: PASSWORD // generated ethereal password
//     }
//   });

module.exports = {
    sendText: async (req, res) => {
        const db = req.app.get('db');
        const {text, user_id, message_id} = req.body;
        if (!text) {
            return res.send('There is nothing in the text')
        }
        let messages = await db.send_text([text, user_id, message_id])
        res.status(200).send('message created')
    },
    createMessage: (req, res) => {
        const db = req.app.get('db');
        const buyer_id = req.body.buyer_id;
        const {listing_id, email} = req.body.listing;
        let newMessage = db.create_message([buyer_id, listing_id])

        // Nodemailer code
        
        
        // let info = {
        //     from: EMAIL,
        //     to: email,
        //     subject: 'You have a new buyer',
        //     text: 'You have an interested buyer. A new thread has been created for you in your sell threads.'
        // }

        // transporter.sendMail({
        //     from: EMAIL,
        //     to: email,
        //     subject: 'You have a new buyer',
        //     text: 'You have an interested buyer. A new thread has been created for you in your sell threads.'
        // })
        //************************************************************************************************ */

        res.status(200).send('new thread created')
    },
    getMessages: async (req, res) => {
        const db = req.app.get('db');
        if (req.session.user) {
            let messages = await db.get_messages()
            res.status(200).send({
                messages: messages
            })
        } else res.status(401).send('Please login')
    },
    getThread: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params
        if (req.session.user) {
            let thread = await db.get_thread([id])
            res.status(200).send(thread)
        } else res.status(401).send('Please login')
    }
}