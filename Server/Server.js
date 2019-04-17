const express = require('express');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./authCtrl');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)


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

// app.get('/Shrubs/Messages', function(req, res){
//     res.send(io());
// })

io.on('connection', socket => {
    console.log('User connected')

    socket.on('change color', (color) => {
        console.log('Color Changed to: ', color)
        io.sockets.emit('change color', color)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

app.post('/login', authCtrl.login)
app.post('/register', authCtrl.register)
app.get('/Listings', authCtrl.getListings)
app.get('/user-info', authCtrl.getUserInfo)
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/#/Shrubs')
})