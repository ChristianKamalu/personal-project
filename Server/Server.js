const express = require('express');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./authCtrl');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();
var http = require('http').createServer(app);

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db is setup');
    http.listen(SERVER_PORT, () => console.log('listening on port', SERVER_PORT))
})

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.get('/Shrubs/Messages', function(req, res){
    res.send('<h1>Hello world</h1>');
})

app.post('/login', authCtrl.login)
app.post('/register', authCtrl.register)
app.get('/Listings', authCtrl.getListings)
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/#/Shrubs')
})