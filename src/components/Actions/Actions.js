import React, { Component } from 'react'
import SearchClients from './SearchClients'
import UpdateClient from './UpdateClient'
import AddClient from './AddClient'
import axios from 'axios'

import '../../style/actions.css'

class Actions extends Component {
    constructor () {
        super()
        this.state = {
            clients: [],
            currentClient: {}
        }
    }

    updateClients = async () => {
        let dbclients = await axios.get('http://localhost:3723/clientdata')
        this.setState({
            clients: dbclients.data
        })
    }

    getCurrentClient = async id => {
        let client = await axios.get(`http://localhost:3723/client/${id}`)
        this.setState({
            currentClient: client
        })
    }

    async componentDidMount() {
        this.props.changePage("Actions")
        await this.updateClients()
    }

    render(){
        return (<div className="actions-container">
            <div className="update-client">
                <h1>UPDATE</h1>
                <SearchClients clients={this.state.clients} getCurrentClient={this.getCurrentClient}/>
                <UpdateClient client={this.state.currentClient}/>
            </div>
            <div className="add-client">
                <h1>ADD CLIENT</h1>
                <AddClient />
            </div>
        </div>)
    }
}

export default Actions