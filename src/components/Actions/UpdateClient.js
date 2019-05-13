import React, { Component } from 'react'

class UpdateClient extends Component {
    render(){
        return (<div>
            Update {this.props.client.name}
        </div>)
    }
}

export default UpdateClient