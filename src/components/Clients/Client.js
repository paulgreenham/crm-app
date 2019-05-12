import React, { Component } from 'react'
import EditPopUp from './EditPopUp';

class Client extends Component {
    constructor() {
        super()
        this.state = {
            revealEdit: false
        }
    }

    splitName = fullName => fullName.split(" ")

    getUSDate = dateStamp => {
        const date = new Date(dateStamp)
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()
    }

    showPopUp = () => {
        this.setState({
            revealEdit: true
        })
    }

    closePopUp = () => {
        this.setState({
            revealEdit: false
        })
    }

    render(){
        const client = this.props.client
        return (<div>
            <div className="client" onClick={this.showPopUp}>
                <span>{this.splitName(client.name)[0]}</span>
                <span>{this.splitName(client.name)[1]}</span>
                <span>{client.country}</span>
                <span>{this.getUSDate(client.firstContact)}</span>
                <span>{client.emailType ? client.emailType : "-"}</span>
                <span>{client.sold ? <i className="fas fa-check"></i> : "-" }</span>
                <span>{client.owner}</span>
            </div>
            {this.state.revealEdit ? <EditPopUp client={this.props.client} closePopUp={this.closePopUp}/> : null}
        </div>)
    }
}

export default Client