module.exports = {
    createListing: async (req, res) => {
        const db = req.app.get('db');
        const {title, ISBN, condition, price, image, description, department} = req.body.state;
        const {user_id} = req.body;
        if (!user_id || !title || !ISBN || !condition || !description || !department || !price || !user_id || !image || !req.session.user) {
            req.status(422).send('incomplete fields')
        }
        let listings = await db.create_listing([user_id, title, ISBN, department, condition, description, price, image])
        res.status(200).send(listings)
    },
    editListing: async (req, res) => {
        const db = req.app.get('db');
        const {title, ISBN, condition, price, image, description, department} = req.body.state;
        const {listing_id} = req.body.state.targetListing;
        const {user_id} = req.body;
        if (!user_id || !title || !ISBN || !condition || !description || !department || !price || !listing_id || !image || !req.session.user) {
            res.status(422).send('incomplete fields')
        }
        console.log(req.body.state)
        let listings = await db.edit_listing([listing_id, title, ISBN, department, condition, description, price, image, user_id])
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