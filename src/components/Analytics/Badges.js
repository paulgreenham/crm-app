import React, { Component } from 'react'
import Badge from './Badge';

class Badges extends Component {

    getFullMonth = (date = new Date()) => new Intl.DateTimeFormat('en-US', {month: "long"}).format(date)

    generateNewClientInfo = () => {
        return {
            icon: "fa-chart-line",
            data: this.getNewClientData(),
            description: `New ${this.getFullMonth()} Clients`
        }
    }

    getNewClientData = () => {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth())
        const newClients = this.props.clients.filter(c => new Date(c.firstContact) >= new Date(monthStart))
        return newClients.length
    }

    generateEmailsSentInfo = () => {
        return {
            icon: "fa-envelope",
            data: this.getEmailsSentData(),
            description: "Emails Sent"
        }
    }

    getEmailsSentData = () => this.props.clients.filter(c => c.emailType).length

    generateOutstandingClientsInfo = () => {
        return {
            icon: "fa-user-circle",
            data: this.getOutstandingClientsData(),
            description: "Outstanding Clients"
        }
    }

    getOutstandingClientsData = () => this.props.clients.filter(c => !c.sold).length

    generateHotCountryInfo = () => {
        return {
            icon: "fa-globe-europe",
            data: this.getHotCountryData(),
            description: "Hottest Country"
        }
    }

    getTopCountry = countries => {
        let topCountry = Object.keys(countries)[0]
        for (let country of Object.keys(countries)) {
            if (countries[country] > countries[topCountry]) {
                topCountry = country
            }
        }
        return topCountry
    }

    getHotCountryData = () => {
        let countries = {}
        this.props.clients.forEach(c => countries[c.country] ? countries[c.country] += 1 : countries[c.country] = 1)
        return this.getTopCountry(countries)
    }
    
    render(){
        return (<div className="badges-container">
            <Badge descriptor={"new-clients"} info={this.generateNewClientInfo()} />
            <Badge descriptor={"emails-sent"} info={this.generateEmailsSentInfo()} />
            <Badge descriptor={"outstanding-clients"} info={this.generateOutstandingClientsInfo()} />
            <Badge descriptor={"hot-country"} info={this.generateHotCountryInfo()} />
        </div>)
    }
}

export default Badges