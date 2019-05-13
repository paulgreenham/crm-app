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
        let key = "search" + event.target.name.split("-")[0]    //if input name is "Object-[num]" retain only "Object"
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

    renderSoldSearch = () => {return (
        <select name="Object-1" className="search-menu" value={this.state.searchObject} onChange={this.updateSearch}>
            <option value="">Still pending</option>
            <option value={true}>Success</option>
        </select>
    )}

    renderOtherSearch = () => {return (
        <input name="Object-2" className="search-bar" type="text" placeholder="Search" 
            value={this.state.searchObject} onChange={this.updateSearch}/>
    )}

    render(){
        return (<div>
            {this.state.searchCategory === "sold" ? this.renderSoldSearch() : this.renderOtherSearch()}
            {this.renderFilter()}
        </div>)
    }
}

export default SearchBar