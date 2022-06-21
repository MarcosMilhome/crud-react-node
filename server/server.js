require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose'); 
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=> {
        app.emit('pronto');
    }).catch( e => console.log(e));


const session = require('express-session'); 
const MongoStore = require('connect-mongo'); 
const routes = require('./routes'); 
const path = require('path'); 
const flash = require('connect-flash');
const cors = require('cors');


app.use(express.json());
app.use( express.urlencoded( { extended: true } ) );

app.use( express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'asdfjadsfih12311sdaa',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    },
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING})
});

app.use(sessionOptions);
app.use(flash());

app.use(cors());
app.use(routes);

app.on('pronto', ()=>{
    app.listen(5000, ()=>{
        console.log('Acessar http://localhost:5000');
        console.log('Servidor executando na porta 5000');
    });
});

