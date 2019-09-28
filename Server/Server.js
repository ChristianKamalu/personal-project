const express = require('express');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./authCtrl');
const messageCtrl = require('./messageCtrl');
const listingCtrl = require('./listingCtrl');
// const noedemailer = require('nodemailer');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, REDIRECT, REACT_APP_LOGOUT} = process.env;

const app = express();

// USED FOR SOCKET.IO
var http = require('http').createServer(app);
var io = require('socket.io')(http)


massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    // the "http" prefix is for socket.io
    http.listen(SERVER_PORT)
})

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 365 * 60 * 60 * 24
    }
}))

// run "npm run build" then run nodemon and you won't have to
// use "npm start" in order to run your code. It just won't update live.
app.use( express.static( `${__dirname}/../build` ));


//This is socket.io
/* ********************************** */
io.on('connection', socket => {

    socket.on('send text', (text) => {
        io.sockets.emit('send text', text)
    })
    
    socket.on('disconnect', () => {
    })
})
/* *********************************** */

app.post('/login', authCtrl.login)
app.post('/register', authCtrl.register)
app.get('/Listings', authCtrl.getListings)
app.get('/user-info', authCtrl.getUserInfo)
app.get('/Logout', (req, res) => {
    req.session.destroy();
    res.redirect(REDIRECT)
})

app.post('/SendText', messageCtrl.sendText)
app.post('/CreateMessage', messageCtrl.createMessage)
app.get('/get-messages', messageCtrl.getMessages)
app.get('/getThread/:id', messageCtrl.getThread)

app.post('/Create-Listing', listingCtrl.createListing)
app.put('/Edit-Listing', listingCtrl.editListing)
app.delete('/Delete-Listing/:listing_id', listingCtrl.deleteListing)


// app.post('/send-email', function(req, res) => {

// })