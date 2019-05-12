const express = require('express')
const router = express.Router()


const Client = require('../models/Client')

router.get('/clientdata', async function(req, res) {
    let clients = await Client.find({})
    res.send(clients)
})


module.exports = router