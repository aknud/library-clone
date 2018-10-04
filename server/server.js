require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const ctrl = require('./controllers');
const fkUser = require('./middleware');

const app = express();

app.use(bodyParser.json());

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET,} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING).then(db =>{
    app.set('db', db);
    console.log('Database reporting for duty.');
})

app.use(fkUser.bypassAuthInDevelopment);

app.post('/api/auth/login', ctrl.login);
app.post('/api/auth/register', ctrl.register);
app.post('/api/auth/logout', ctrl.logout);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))