import React, { Component } from 'react'

import '../../style/editpopup.css'

class EditPopUp extends Component {

    closePopUp = () => this.props.closePopUp()

    render(){
        return (<div className="edit-popup">
            <div className="popup-details">
                <span onClick={this.closePopUp} className="close-button"><i className="fas fa-window-close"></i></span>
                <div className="edit-input"><span>Name:</span><input type="text"/></div>
                <div className="edit-input"><span>Surname:</span><input type="text"/></div>
                <div className="edit-input"><span>Country:</span><input type="text"/></div>
                <button className="update-button">Update</button>
            </div>
        </div>)
    }
}

export default EditPopUp