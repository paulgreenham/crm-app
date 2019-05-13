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
            clients: []
        }
    }

    updateClientInfo = async () => {
        let dbclients = await axios.get('http://localhost:3723/clientdata')
        this.setState({
            clients: dbclients.data
        })
    }

    async componentDidMount() {
        this.props.changePage("Actions")
        await this.updateClientInfo()
    }

    render(){
        return (<div className="actions-container">
            <div className="update-client">
                <h1>UPDATE</h1>
                <SearchClients clients={this.state.clients}/>
                <UpdateClient />
            </div>
            <div className="add-client">
                <h1>ADD CLIENT</h1>
                <AddClient />
            </div>
        </div>)
    }
}

export default Actions