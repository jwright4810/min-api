const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const knex = require('knex');
const moment = require('moment');
const goalRange = require('./controllers/goalRange') 

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


app.get('/setgoals', (req, res) => { goalRange.setGoals(req, res, db, date) })

app.listen(3000, ()=> {
    console.log('app is running on port 3000'); 
})
