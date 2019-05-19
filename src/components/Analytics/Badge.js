import React, { Component } from 'react'

class Badge extends Component {
    render(){
        return (<div className="badge">
            <div className="icon" id={this.props.descriptor}><i className={`fas ${this.props.info.icon}`}></i>{}</div>
            <div className="badge-data">{this.props.info.data}</div>
            <div className="badge-description">{this.props.info.description}</div>
        </div>)
    }
}

export default Badge