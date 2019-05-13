import React, { Component } from 'react'
import ClientName from './ClientName'

class SearchClients extends Component {
    constructor() {
        super()
        this.state = {
            searchName: "",
            searchHidden: true
        }
    }

    filterClient = client => client.name.toLowerCase().includes(this.state.searchName.toLowerCase())

    getSearchedClients = () => this.props.clients.filter(c => this.filterClient(c))

    setClient = (id, name) => {
        this.props.getCurrentClient(id)
        this.setState({
            searchName: name,
            searchHidden: true
        })
    }

    hideSearch = () => { if (this.state.searchName) { return false } }

    populateClientSearch = () => {
        return (<div className="client-names" style={{visibility: this.state.searchHidden ? "hidden" : "visible"}}>
            {this.getSearchedClients().map(c => <ClientName client={c} key={c._id} setClient={this.setClient}/>)}
        </div>)
    }

    chooseClient = event => {
        let searchInput = event.target.value
        console.log(searchInput)
        this.setState({
            searchName: searchInput,
            searchHidden: searchInput === "" ? true : false
        })
    }

    render(){
        return (<div>
            Client: <input className="client-search" type="text" value={this.state.searchName} onChange={this.chooseClient} />
            {this.populateClientSearch()}
        </div>)
    }
}

export default SearchClients