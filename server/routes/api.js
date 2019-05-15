const express = require('express')
const router = express.Router()


const Client = require('../models/Client')

router.get('/clientdata', async function (req, res) {
    let clients = await Client.find({})
    if (req.query.limit === "names") {
        clients = clients.map(c => {return {_id: c._id, name: c.name}})
    }
    res.send(clients)
})

router.get('/client/:id', async function (req, res) {
    let id = req.params.id
    let client = await Client.findById(id)
    res.send(client)
})

router.post('/clientupdate', async function (req, res) {
    let data = req.body
    let newRecord = new Client({
        name: data.name,
        email: data.email,
        firstContact: new Date(data.firstContact),
        emailType: null,
        sold: false,
        owner: data.owner,
        country: data.country
    })
    await newRecord.save()
    res.end()
})

router.put('/clientupdate', async function (req, res) {
    let data = req.body
    let record = await Client.findOneAndUpdate({_id: data._id}, { $set: { name: data.name,  country: data.country }}, {new: true})
    res.send(record)
})

router.put('/clientupdate/:key', async function (req, res) {
    let data = req.body
    let key = req.params.key
    let record = await Client.findOneAndUpdate({_id: data._id}, { $set: { [key]: data[key]}}, {new: true})
    res.send(record)
})


module.exports = router