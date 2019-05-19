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
            searchCategory: "name",
            loading: true
        }
    }

    updateClientInfo = async () => {
        let dbclients = await axios.get('/clientdata')
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

    filterEmailType = client => client.emailType ? 
        client.emailType.toLowerCase().includes(this.state.searchObject.toLowerCase()) :
        this.state.searchObject === "-"

    filterClient = client => {
        if (this.state.searchCategory === "emailType") {
            return this.filterEmailType(client)
        }
        else if (this.state.searchCategory === "sold") {
            return this.state.searchObject ? client.sold : !client.sold
        }
        else {
            return client[this.state.searchCategory].toLowerCase()
            .includes(this.state.searchObject.toLowerCase())
        }
    }

    getSearchedClients = () => this.state.clients.filter(c => this.filterClient(c))

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
        this.setState({ loading: false })
    }

    render(){
        return (<React.Fragment> {this.state.loading ? 
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> :
            <div className="clients-container">
                <div className="main-header">
                    <SearchBar updateSearch={this.updateSearch}/>
                    <Pagination resetIndex={this.resetIndex} resetEnd={this.resetEnd} start={this.state.startIndex} end={this.getSearchedClients().length}/>
                </div>
                {this.renderHeader()}
                {this.renderClients()}
            </div>}
        </React.Fragment>)
    }
}

export default Clients