module.exports = {
    sendText: async (req, res) => {
        const db = req.app.get('db');
        const {text, user_id, message_id} = req.body;
        console.log('body', req.body)
        if (!text) {
            return res.send('There is nothing in the text')
        }
        let messages = await db.send_text([text, user_id, message_id])
        console.log('message', messages)
        res.status(200).send('message created')
    },
    createMessage: (req, res) => {
        const db = req.app.get('db');
        const buyer_id = req.body.buyer_id;
        const listing_id = req.body.listing.listing_id;
        console.log(buyer_id, listing_id)
        let newMessage = db.create_message([buyer_id, listing_id])
        res.status(200).send('new thread created')
    },
    getMessages: async (req, res) => {
        const db = req.app.get('db');
        if (req.session.user) {
            let messages = await db.get_messages()
            console.log('here is the message', messages)
            res.status(200).send({
                messages: messages
            })
        } else res.status(401).send('Please login')
    },
    getThread: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params
        console.log('id', id)
        if (req.session.user) {
            let thread = await db.get_thread([id])
            console.log('thread', thread)
            res.status(200).send(thread)
        } else res.status(401).send('Please login')
    }
}