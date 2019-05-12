import React, { Component } from 'react'

class Analytics extends Component {

    componentDidMount = () => {
        this.props.changePage("Analytics")
    }

    render(){
        return (<div>
            Analytics Page
        </div>)
    }
}

export default Analytics