import React, { Component } from 'react'

class Home extends Component {

    componentDidMount = () => {
        this.props.changePage("Home")
    }

    render(){
        return (<div>
            Landing Page
        </div>)
    }
}

export default Home