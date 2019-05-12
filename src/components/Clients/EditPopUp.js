import React, { Component } from 'react'
import axios from 'axios'

import '../../style/editpopup.css'

class EditPopUp extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            surname: "",
            country: ""
        }
    }

    componentDidMount() {
        const names = this.props.client.name.split(" ")
        this.setState({
            name: names[0],
            surname: names[1],
            country: this.props.client.country
        })
    }

    closePopUp = () => this.props.closePopUp()

    changeInput = event => {
        let key = event.target.name
        this.setState({
            [key]: event.target.value
        })
    }

    updateRecord = async () => {
        const fullName = this.state.name.concat(" ", this.state.surname)
        const newRecord = {
            _id: this.props.client._id,
            name: fullName,
            country: this.state.country
        }
        await axios.put('http://localhost:3723/clientupdate', newRecord)
        this.closePopUp()
    }

    render(){
        return (<div className="edit-popup">
            <div className="popup-details">
                <span onClick={this.closePopUp} className="close-button"><i className="fas fa-window-close"></i></span>
                <div className="edit-input">
                    <span>Name:</span>
                    <input type="text" name="name" value={this.state.name} onChange={this.changeInput}/>
                </div>
                <div className="edit-input">
                    <span>Surname:</span>
                    <input type="text" name="surname" value={this.state.surname} onChange={this.changeInput}/>
                </div>
                <div className="edit-input">
                    <span>Country:</span>
                    <input type="text" name="country" value={this.state.country} onChange={this.changeInput}/>
                </div>
                <button className="update-button" onClick={this.updateRecord}>Update</button>
            </div>
        </div>)
    }
}

export default EditPopUp