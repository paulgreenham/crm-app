const mongoose = require('mongoose')
const Schema = mongoose.Schema


const clientSchema = new Schema({
    name: String,
    email: String,
    firstContact: Date,
    emailType: String,
    sold: Boolean,
    owner: String,
    country: String
})


const Client = mongoose.model('Client', clientSchema)
module.exports = Client

const data = require('../../data.json')

const loadData = async function (data) {
    for (let datum of data) {
        let client = new Client({
        name: datum.name,
        email: datum.email,
        firstContact: new Date(datum.firstContact),
        emailType: datum.emailType,
        sold: datum.sold,
        owner: datum.owner,
        country: datum.country
        })
        await client.save()
    }
}

// loadData(data)