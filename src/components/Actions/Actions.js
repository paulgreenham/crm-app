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
            currentClient: {},
            emailList: ["A", "B", "C", "D"],
            loading: true
        }
    }

    updateClients = async () => {
        let dbClients = await axios.get('/clientdata')
        this.setState({
            clients: dbClients.data
        })
    }

    getCurrentClient = async id => {
        if (id === null) {
            return this.setState({ currentClient: {} })
        }
        let dbClient = await axios.get(`/client/${id}`)
        this.setState({
            currentClient: dbClient.data
        })
    }

    updateClient = (key, value) => {
        let client = this.state.currentClient
        client[key] = value
        this.setState({ currentClient: client})
    }

    getList = key => {
        let list = new Set()
        this.state.clients.forEach(c => list.add(c[key]))
        return [...list]
    }

    async componentDidMount() {
        this.props.changePage("Actions")
        await this.updateClients()
        this.setState({ loading: false })
    }

    render(){
        const emailTypes = this.getList("emailType")
        return (<React.Fragment> {this.state.loading ? 
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> :
            <div className="actions-container">
                <div className="update-client">
                    <h1>UPDATE</h1>
                    <SearchClients clients={this.state.clients} getCurrentClient={this.getCurrentClient}/>
                    <UpdateClient updateClient={this.updateClient} client={this.state.currentClient}
                        owners={this.getList("owner")} emails={emailTypes.length > 0 ? emailTypes : this.state.emailList}/>
                </div>
                <div className="add-client">
                    <h1>ADD CLIENT</h1>
                    <AddClient updateClients={this.updateClients} />
                </div>
            </div>}
        </React.Fragment>)
    }
}

export default Actions