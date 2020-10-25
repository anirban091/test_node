const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//initialize express
const app = express()

//initialize environment values
dotenv.config()

//Set app default port
app.set('port', process.env.APP_PORT || 5050)

//Database connection
mongoose.connect(process.env.DB_CONNECT,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.error('Could not connect to MongoDB..', err))


//Default route for test
app.get('/', (req, res) => {
    res.status(200).send("Hello there..!")
})

const userView = require('./route/userView')
app.use('/test', userView)
//Server connection
app.listen(app.get('port'), () => {
    console.log("Server listening on port " + app.get('port'))
})