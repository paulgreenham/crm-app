import React, { Component } from 'react'

class Client extends Component {

    splitName = fullName => fullName.split(" ")

    getUSDate = dateStamp => {
        const date = new Date(dateStamp)
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()
    }

    render(){
        const client = this.props.client
        return (<div className="client">
            <span>{this.splitName(client.name)[0]}</span>
            <span>{this.splitName(client.name)[1]}</span>
            <span>{client.country}</span>
            <span>{this.getUSDate(client.firstContact)}</span>
            <span>{client.emailType ? client.emailType : "-"}</span>
            <span>{client.sold ? <i className="fas fa-check"></i> : "-" }</span>
            <span>{client.owner}</span>
        </div>)
    }
}

export default Client