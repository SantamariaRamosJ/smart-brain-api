const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 
const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

// const db = knex({
//   client: 'pg',
//     connection: {
//       connectionString: process.env.DATABASE_URL,
//       ssl: {
//         rejectUnauthorized: false
//       },
//     },
// });

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,	
        ssl: true
	}
});

 // connection: {
  //   connectionString: process.env.DATABASE_URL,	
  //   // ssl: true
  // }

// host : 'ec2-3-211-37-117.compute-1.amazonaws.com',
    // user : 'hficxrpwahlqga',
    // password : '3723cc4566c2b8d34926dbcfedcb4421320b21d367d77c781c42c02862313f2c',
    // database : 'df77ng3f0p89g6',
    // port: '5432'


  // db.select('*').from('users').then(data => {
  //     console.log(data);
  // });


const app = express();

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.get('/', (req, res) => { res.send('this is working') });

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} );

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});



app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
  });

// res = this is working
// signin --> POST = success/fail
// register --> POST = user
// /profile/:userID --> user
// /image --> PUT --> user