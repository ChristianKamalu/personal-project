module.exports = {
    createListing: async (req, res) => {
        const db = req.app.get('db');
        const {title, ISBN, condition, price, image} = req.body.state;
        const {user_id} = req.body;
        if (!title || !ISBN || !condition || !price || !user_id || !image || !req.session.user) {
            req.status(422).send('incomplete fields')
        }
        let textbook_id = await db.create_book([title, ISBN, condition, price, image])
        let listings = await db.create_listing([user_id, textbook_id[0].textbook_id])
        res.status(200).send(listings)
    },
    editListing: async (req, res) => {
        const db = req.app.get('db');
        const {textbook_id, title, ISBN, condition, price, image} = req.body.state;
        if (!title || !ISBN || !condition || !price || !textbook_id || !image || !req.session.user) {
            req.status(422).send('incomplete fields')
        }
        let listings = await db.edit_listing([textbook_id, title, ISBN, condition, price, image])
        res.status(200).send(listings)
    },
    deleteListing: async (req, res) => {
        const db = req.app.get('db');
        const {listing_id} = req.params
        if (!req.session.user) {
            req.status(401).send('you are not logged in')
        }
        let listings = await db.delete_listing([listing_id])
        res.status(200).send(listings)
    }
}