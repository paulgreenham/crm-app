import React, { Component } from 'react'

class SearchClients extends Component {
    constructor() {
        super()
        this.state = {
            searchName: ""
        }
    }

    filterClient = client => client.name.toLowerCase().includes(this.state.searchName.toLowerCase())

    getSearchedClients = () => this.props.clients.filter(c => this.filterClient(c))

    populateClientSearch = () => {
        return (<datalist id="clientNames">
            {this.getSearchedClients().map(c => <option value={c.name} key={c._id}/>)}
        </datalist>)
    }

    chooseClient = event => {
        this.setState({ searchName: event.target.value })
    }

    getCurrentClient = () => {
        this.props.getCurrentClient(this.state.searchName)
    }

    render(){
        return (<div>
            Client: <input list="clientNames" value={this.state.searchName} onChange={this.chooseClient} />
            {this.populateClientSearch()}
        </div>)
    }
}

export default SearchClients