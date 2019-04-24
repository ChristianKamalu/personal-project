module.exports = {
    createListing: async (req, res) => {
        const db = req.app.get('db');
        const {title, ISBN, condition, price, image} = req.body.state;
        const {user_id} = req.body;
        if (!title || !ISBN || !condition || !price || !user_id || !image) {
            req.status(422).send('incomplete fields')
        }
        let textbook_id = await db.create_book([title, ISBN, condition, price, image])
        console.log('textbook_id', textbook_id)
        let listings = await db.create_listing([user_id, textbook_id[0].textbook_id])
        console.log('listings', listings)
        res.status(200).send(listings)
    }
}