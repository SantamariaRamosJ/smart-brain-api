const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 
const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
    //   port: 5432,
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });

  db.select('*').from('users').then(data => {
      console.log(data);
  });


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
    res.send('this is working');
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} );


// app.post('/signin', (req, res) => {
//     if (req.body.email === database.users[0].email &&
//         req.body.password === database.users[0].password)
//     {
//         res.json('success');
//     }
//     else
//     {
//         res.status(400).json('error loggin in');
//     }
// });


app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db, bcrypt)});

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