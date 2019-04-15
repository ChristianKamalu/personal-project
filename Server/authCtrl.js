const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const accountArr = await find_acc_by_email([email])
    }
}