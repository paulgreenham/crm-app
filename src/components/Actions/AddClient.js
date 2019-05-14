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
            firstContact: this.getReactDate(),
            owner: ""
        }
    }

    getReactDate = (date = new Date()) => date.toISOString().slice(0, 10)

    changeInput = event => {
        let key = event.target.name
        this.setState({
            [key]: event.target.value
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

            <div className="add-input">
                <span>First Name:</span>
                <input type="text" name="name" value={this.state.name} onChange={this.changeInput}/>
            </div>

            <div className="add-input">
                <span>Surname:</span>
                <input type="text" name="surname" value={this.state.surname} onChange={this.changeInput}/>
            </div>

            <div className="add-input">
                <span>Email:</span>
                <input type="text" name="email" value={this.state.email} onChange={this.changeInput}/>
            </div>

            <div className="add-input">
                <span>Country:</span>
                <input type="text" name="country" value={this.state.country} onChange={this.changeInput}/>
            </div>

            <div className="add-input">
                <span>First Contacted:</span>
                <input type="date" name="firstContact" value={this.state.firstContact} onChange={this.changeInput}/>
            </div>

            <div className="add-input">
                <span>Owner:</span>
                <input type="text" name="owner" value={this.state.owner} onChange={this.changeInput}/>
            </div>

            <button onClick={this.updateRecord}>Add New Client</button>

        </div>)
    }
}

export default AddClient