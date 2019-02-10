const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const knex = require('knex');
const moment = require('moment');
const goals = require('./controllers/goals') 
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const bcrypt = require('bcrypt-nodejs'); 


const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '1234',
        database : 'min_journal'
    } 
 });

 const date = moment; 

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 

app.get('/', (req, res) => {res.send('it is working!')})
app.put('/submitgoals', (req, res) => { goals.handleSubmitGoals(req, res, db) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, date) })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) })
app.listen(3000, ()=> {
    console.log('app is running on port 3000'); 
})
