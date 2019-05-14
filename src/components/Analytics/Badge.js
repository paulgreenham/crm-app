import React, { Component } from 'react'

class Badge extends Component {
    render(){
        return (<div className="badge">
            <div className={`icon ${this.props.descriptor}`}><i className={`fas ${this.props.info.icon}`}></i>{}</div>
            <div className="badge-data">
                <span className="badge-datum">{this.props.info.data}</span>
                <span className="badge-description">{this.props.info.description}</span>
            </div>
        </div>)
    }
}

export default Badge