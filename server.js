const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express();
const knex = require('knex')


const register = require('./controllers/register')
const image = require('./controllers/image')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '0042',
        database: 'smartbrain'
    }
});




app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },

        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) =>
{
    res.send(database.users)
})

app.post('/signin', (req, res) => { signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db,bcrypt)})

app.put('/image', (req, res) => { image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req,res)})




app.listen(process.env.PORT || 3000, () => 
{
    console.log(`App is running on ${process.env.PORT}`)
})




/*
PLANNING BELOW

/ ==> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/