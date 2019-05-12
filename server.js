const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/crmDB', {useNewUrlParser: true})


const app = express()
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', api)


const port = 3723
app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})