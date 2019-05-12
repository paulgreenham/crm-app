import React, { Component } from 'react'

class Clients extends Component {

    componentDidMount = () => {
        this.props.changePage("Clients")
    }
    
    render(){
        return (<div>
            Clients page
        </div>)
    }
}

export default Clients