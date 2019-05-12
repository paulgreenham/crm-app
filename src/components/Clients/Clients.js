import React, { Component } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import Client from './Client'
import Pagination from './Pagination';

import '../../style/clients.css'

class Clients extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
            startIndex: 0,
            endIndex: 19,
            searchObject: "",
            searchCategory: "name"
        }
    }

    updateClientInfo = async () => {
        let dbclients = await axios.get('http://localhost:3723/clientdata')
        this.setState({
            clients: dbclients.data
        })
    }

    updateSearch = (object, category) => {
        this.setState({
            searchObject: object,
            searchCategory: category
        })
    }

    getSearchedClients = () => this.state.clients
        .filter(c => c[this.state.searchCategory].toLowerCase()
        .includes(this.state.searchObject.toLowerCase()))

    resetIndex = index => this.setState({ startIndex: index})

    resetEnd = index => this.setState({ endIndex: index})

    renderHeader = () => { 
        return (<div className="clients-header">
            <span>Name</span>
            <span>Surname</span>
            <span>Country</span>
            <span>First Contact</span>
            <span>Email</span>
            <span>Sold</span>
            <span>Owner</span>
        </div>)
    }

    getClientsToDisplay = () => this.getSearchedClients().slice(this.state.startIndex, this.state.endIndex + 1)
    
    renderClients = () => {
        return (<div className="clients-results">
        {this.state.clients ? this.getClientsToDisplay().map(c => <Client client={c} key={c._id} />) : null}
        </div>)
    }

    async componentDidMount() {
        this.props.changePage("Clients")
        await this.updateClientInfo()
    }

    render(){
        return (<div className="clients-container">
            <div className="main-header">
                <SearchBar updateSearch={this.updateSearch}/>
                <Pagination resetIndex={this.resetIndex} resetEnd={this.resetEnd} start={this.state.startIndex} end={this.getSearchedClients().length}/>
            </div>
            {this.renderHeader()}
            {this.renderClients()}
        </div>)
    }
}

export default Clients