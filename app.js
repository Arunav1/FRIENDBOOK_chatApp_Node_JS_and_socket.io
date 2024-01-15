const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const user = require('./model/Users');
const user1 = require('./model/username');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const { Socket } = require('engine.io');



const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//Server listenning port:
const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server started at PORT:3000');
})

const io = new Server(server);

//socket.io part;
io.on('connection', (client) => {
    client.on('user-message', (message) => {
        io.emit('message', message) // if any message arrives from the frontend then just emit that message to all..
    });
});

mongoose.connect('mongodb+srv://Arunav27:Dutta12345@cluster002.rxbpcne.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

//Routes :
//Login with email-id and password:

app.get('/', (req, res) => {
    res.render('index')
});

app.post('/', async(req, res) => {
    try{
        const {email, password} = req.body;

        const newUser = await user.create({
            email,
            password
        });
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
 });

//Login providing usernames:

 app.get('/login', (req, res) => {
    res.render('chat');
 });

 app.post('/login', async(req, res) => {
    try{
        const {username} = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const newUser1 = await user1.create({
          username
        });
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
 });
//Chatting User Interface:

 app.get('/chatting', (req, res) => {
    res.render('convo');
 });



