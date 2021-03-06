require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const ctrl = require('./controllers');
// const fkUser = require('./middleware');
const path = require('path');


const app = express();

app.use( express.static( `${__dirname}/../build` ) );

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

// app.use(fkUser.bypassAuthInDevelopment);
app.post('/api/auth/login', ctrl.login);
app.post('/api/auth/register', ctrl.register);
app.post('/api/auth/logout', ctrl.logout);
app.post('/api/addBook', ctrl.addBook);
app.post('/api/addToCart/:id', ctrl.addToCart);
app.post('/api/addToShelf', ctrl.addToShelf);
app.get('/api/allBooks', ctrl.getBooks);
app.get('/api/cart', ctrl.booksInCart);
app.get('/api/shelf', ctrl.getShelf);
app.put('/api/editBook/:id', ctrl.editBook);
app.delete('/api/removeFromCart/:id', ctrl.removeFromCart);
app.delete('/api/returnBook/:id', ctrl.removeFromShelf)
app.delete('/api/delete/:id', ctrl.deleteBook);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
