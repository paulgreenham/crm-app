import React, { Component } from 'react'
import axios from 'axios'

class AddClient extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            surname: "",
            email: "",
            country: "",
            firstContact: new Date(),
            owner: ""
        }
    }

    changeInput = event => {
        let key = event.target.name
        this.setState({
            [key]: key === "date" ? new Date(event.target.value) : event.target.value
        })
    }

    updateRecord = async () => {
        const fullName = this.state.name.concat(" ", this.state.surname)
        const newRecord = {
            name: fullName,
            email: this.state.email,
            country: this.state.country,
            firstContact: new Date(this.state.firstContact),
            owner: this.state.owner
        }
        await axios.post('http://localhost:3723/clientupdate', newRecord)
        this.props.updateClients()
    }

    render(){
        return (<div className="add">

            <div className="add-input" name="name" value={this.state.name} onChange={this.changeInput}>
                <span>First Name:</span>
                <input type="text"/>
            </div>

            <div className="add-input" name="surname" value={this.state.surname} onChange={this.changeInput}>
                <span>Surname:</span>
                <input type="text"/>
            </div>

            <div className="add-input" name="email" value={this.state.email} onChange={this.changeInput}>
                <span>Email:</span>
                <input type="text"/>
            </div>

            <div className="add-input" name="country" value={this.state.country} onChange={this.changeInput}>
                <span>Country:</span>
                <input type="text"/>
            </div>

            <div className="add-input" name="firstContact" value={this.state.firstContact} onChange={this.changeInput}>
                <span>First Contacted:</span>
                <input type="date"/>
            </div>

            <div className="add-input" name="owner" value={this.state.owner} onChange={this.changeInput}>
                <span>Owner:</span>
                <input type="text"/>
            </div>

            <button onClick={this.updateRecord}>Add New Client</button>

        </div>)
    }
}

export default AddClient