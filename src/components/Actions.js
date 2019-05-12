import React, { Component } from 'react'

class Actions extends Component {

    componentDidMount = () => {
        this.props.changePage("Actions")
    }

    render(){
        return (<div>
            Actions Page
        </div>)
    }
}

export default Actions