import React, { Component } from 'react'

class UpdateClient extends Component {
    render(){
        return (<div className="update">
            Update {this.props.client.name}
        </div>)
    }
}

export default UpdateClient