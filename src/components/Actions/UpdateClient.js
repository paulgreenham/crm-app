import React, { Component } from 'react'
import axios from 'axios'

class UpdateClient extends Component {
    constructor() {
        super()
        this.state = {
            owner: "",
            email: "",
            sold: false
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateRecord = async event => {
        let key = event.target.name
        if (this.state[key] === "") {
            return alert("You need to make a selection first.")
        }
        let changeObject = {
            _id: this.props.client._id,
            [key]: this.state[key]
        }
        let record = await axios.put(`http://localhost:3723/clientupdate/${key}`, changeObject)
        this.props.updateClient(key, record.data[key])
    }

    renderMenu = type => {
        let list = this.props[type === "owner" ? "owners" : "emails"].sort()
        if (!list[list.length - 1]) { list.splice(list.length - 1) }        // remove "null" result if the list shows emails
        return (<select className={`${type}-menu`} name={type} value={this.state[type]} onChange={this.handleInput}>
            <option value="">{type === "owner" ? "Owners" : "Email Type"}</option>
            {list.map(l => <option value={l} key={l}>{l + (this.props.client[type] === l ? " (current)" : "")}</option>)}
        </select>)
    }



    render(){
        return (<div className="update">

            <div className="transfer-owner">
                <span>Transfer Ownership to</span>
                {this.renderMenu("owner")}
                <button name="owner" onClick={this.updateRecord}>Transfer</button>
            </div>

            <div className="send-email">
                <span>Send Email:</span>
                {this.renderMenu("emailType")}
                <button name="emailType" onClick={this.updateRecord}>Send</button>
            </div>

            <div className="sale">Declare Sale!</div>

        </div>)
    }
}

export default UpdateClient