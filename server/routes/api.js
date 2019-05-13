const express = require('express')
const router = express.Router()


const Client = require('../models/Client')

router.get('/clientdata', async function (req, res) {
    let clients = await Client.find({})
    res.send(clients)
})

router.put('/clientupdate', async function (req, res) {
    let data = req.body
    let record = await Client.findOneAndUpdate({_id: data._id}, { $set: { name: data.name,  country: data.country }}, {new: true})
    res.send(record)
})


module.exports = router