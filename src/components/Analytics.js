import React, { Component } from 'react'
import axios from 'axios'

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
        return (<div>
            Analytics Page
        </div>)
    }
}

export default Analytics