import React, { Component } from 'react'
import SearchClients from './SearchClients'
import UpdateClient from './UpdateClient'
import AddClient from './AddClient'

import '../../style/actions.css'

class Actions extends Component {
    constructor () {
        super()
        this.state = {
            client: {}
        }
    }

    componentDidMount = () => {
        this.props.changePage("Actions")
    }

    render(){
        return (<div className="actions-container">
            <div className="update-client">
                <h1>UPDATE</h1>
                <SearchClients />
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