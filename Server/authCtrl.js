const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const userArr = await db.find_acc_by_email([email])
        if (userArr.length === 0) {
            return res.status(200).send({ message: 'Incorrect email/password' })
        }
        const result = bcrypt.compareSync(password, userArr[0].hash)
        if (!result) {
            return res.status(401).send({ message: 'Incorrect email/password' })
        }
        req.session.user = { 
            firstName: userArr[0].firstname,
            lastName: userArr[0].lastname,
            email: userArr[0].email,
            id: userArr[0].user_id
        }
        res.status(200).send({
            message: 'Log in Successful',
            userData: req.session.user,
            loggedIn: true
        })
    },
    register: async (req, res) => {
        const {firstName, lastName, email, password} = req.body;
        const db = req.app.get('db');
        const userArr = await db.find_acc_by_email([email]);
        if (userArr[0]) {
            return res.status(200).send({ message: 'Email already in use' })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUserArr = await db.create_user([firstName, lastName, email, hash]);
        req.session.user = { 
            firstName: newUserArr[0].firstname,
            lastName: newUserArr[0].lastname,
            email: newUserArr[0].email,
            id: newUserArr[0].user_id
        }
        res.status(200).send({
            message: 'Logged in',
            userData: req.session.user,
            loggedIn: true
        })
    },
    getListings: async (req, res) => {
        const db = req.app.get('db')
        let listings = await db.get_listings()
        res.status(200).send({
            listings: listings,
            loggedIn: true
        })
    },
    getUserInfo: async (req, res) => {
        if (req.session.user) {
            res.status(200).send({
                userData: req.session.user,
                loggedIn: true
            })
        } else res.status(401).send('Please login')
    }
}