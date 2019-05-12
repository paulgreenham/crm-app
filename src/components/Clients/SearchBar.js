import React, { Component } from 'react'

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            searchObject: "",
            searchCategory: "name"
        }
    }

    updateSearch = event => {
        let key = "search" + event.target.name
        this.setState({
            [key]: event.target.value
        }, function () {
            this.props.updateSearch(this.state.searchObject, this.state.searchCategory)
        })
    }

    renderFilter = () => {
        return (
            <select name="Category" className="search-filter" value={this.state.searchCategory} onChange={this.updateSearch}>
                <option value="name">Name</option>
                <option value="country">Country</option>
                <option value="emailType">Email Type</option>
                <option value="sold">Sold Status</option>
                <option value="owner">Owner</option>
            </select>
        )
    }

    render(){
        return (<div>
            <input name="Object" className="search-bar" type="text" placeholder="Search" 
                value={this.state.searchObject} onChange={this.updateSearch}/>
            {this.renderFilter()}
        </div>)
    }
}

export default SearchBar