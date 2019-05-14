import React, { Component } from 'react'
import axios from 'axios'
import Charts from './Charts/Charts'
import Badges from './Badges'

import '../../style/analytics.css'

class Analytics extends Component {
    constructor() {
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
        this.props.changePage("Analytics")
        this.updateClientInfo()
    }

    render(){
        return (<div className="analytics-container">
            <Badges clients={this.state.clients} />
            <Charts clients={this.state.clients}/>
        </div>)
    }
}

export default Analytics