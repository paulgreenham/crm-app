import React, { Component } from 'react'
import axios from 'axios'
import Charts from './Charts/Charts'
import Badges from './Badges'

import '../../style/analytics.css'

class Analytics extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
            loading: true
        }
    }

    updateClientInfo = async () => {
        let dbclients = await axios.get('/clientdata')
        this.setState({
            clients: dbclients.data
        })
    }

    async componentDidMount() {
        this.props.changePage("Analytics")
        await this.updateClientInfo()
        this.setState({ loading: false })
    }

    render(){
        return (<React.Fragment> {this.state.loading ? 
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> :
            <div className="analytics-container">
                <Badges clients={this.state.clients} />
                <Charts clients={this.state.clients}/>
            </div>}
        </React.Fragment>)
    }
}

export default Analytics