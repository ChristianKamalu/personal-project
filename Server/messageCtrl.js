module.exports = {
    sendText: async (req, res) => {
        const db = req.app.get('db');
        const {text, user_id, message_id} = req.body;
        let messages = await db.create_message([text, user_id, message_id])
    },
    createMessage: (req, res) => {
        const db = req.app.get('db');
        console.log(req.body)
        const buyer_id = req.body.buyer;
        const listing_id = req.body.listing.listing_id;
        db.createMessage([buyer_id, listing_id])
    },
    getMessages: async (req, res) => {
        const db = req.app.get('db');
        if (req.session.user) {
        let messages = await db.get_messages()
            res.status(200).send({
                messages: messages
            })
        } else res.status(401).send('Please login')
    }
}