import React, { Component } from 'react'

class ClientName extends Component {

    setClient = () => {
        this.props.setClient(this.props.client._id, this.props.client.name)
    }

    render(){
        return (<div className="client-name" onClick={this.setClient}>
            {this.props.client.name}
        </div>)
    }
}

export default ClientName