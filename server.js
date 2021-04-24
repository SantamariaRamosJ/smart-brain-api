const express = require('express');
// const bcrypt = require('bcrypt-nodejs');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('this is working');
})

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    // ],
    // login: [
    //     {
    //         id: '987',
    //         hash: '',
    //         email: 'john@gmail.com'
    //     }
    ]
}
// console.log(database);

// console.log(
// app.post('/signin', (req, res) => {
    // Load hash from your password DB.
    // bcrypt.compare("cookies", hash, function(err, res) {
    //     console.log('first guess', res)
    // });
    // bcrypt.compare("veggies", hash, function(err, res) {
    //     console.log('second guess', res)
    // });
//     if (req.body.email === database.users[1].email && 
//         req.body.password === database.users[1].password)
//     {
//         res.json('success');
//     }
//     else
//     {
//         res.status(400).json('error logging in');
//     }
// });

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    }else{
        res.status(400).json('error loggin in');
    }
});


// app.post('/register', (req, res) => {
//     // const { email, name, password } = req.body;
//     // bcrypt.hash(password, null, null, function(err, hash) {
//         // Store hash in your password DB.
//     // });
//     database.users.push({
//         id: '124',
//         name: name,
//         email: email,
//         password: password,
//         entries: 0,
//         joined: new Date()
//     })
//     res.json(database.users[database.users.length-1]);
// })

// app.get('/profile/:id', (req, res) => {
//     const { id } = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true;
//             return res.json(user);
//         }
//     }) 
//     if (!found)
//     {
//         res.status(400).json('not found');
//     }
// })

// app.post('/image', (req, res) => {
//     const { id } = req.body;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true;
//             user.entries++
//             return res.json(user.entries);
//         }
//     })
//     if (!found) {
//         res.status(400).json('not found');
//     }
// })

app.listen(3000, () => {
    console.log('app is running on port 3000'); 
})

// res = this is working
// signin --> POST = success/fail
// register --> POST = user
// /profile/:userID --> user
// /image --> PUT --> user