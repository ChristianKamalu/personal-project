const express = require('exress');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./authCtrl');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db is setup');
    app.listen(SERVER_PORT, () => console.log('listening on port', SERVER_PORT))
})

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/login', authCtrl.login)
app.post('/register', authCtrl.register)