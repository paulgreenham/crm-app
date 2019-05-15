import React, { Component } from 'react'

import '../style/home.css'
import { Link } from 'react-router-dom';

class Home extends Component {

    componentDidMount = () => {
        this.props.changePage("Home")
    }

    render(){
        return (<div className="home-container">
            <div className="message">What would you like to do?</div>
            <div className="options">
                <Link to='/clients'><div className="go-to-clients">View all Clients</div></Link>
                <Link to='/actions'><div className="go-to-actions">Edit/Add Client Data</div></Link>
                <Link to='/analytics'><div className="go-to-analytics">View Client Data Visualizations</div></Link>
            </div>
        </div>)
    }
}

export default Home