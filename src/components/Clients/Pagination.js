import React, { Component } from 'react'

import '../../style/pagination.css'

class Pagination extends Component {

    increasePagination = () => this.changePagination(true)

    decreasePagination = () => this.changePagination(false)

    changePagination = increase =>{
        let index = this.props.start + (increase ? 20 : - 20)
        if (index >= 0 && index <= this.props.end) {
            this.props.resetIndex(index)
            this.props.resetEnd(this.getEndItem(index))
        }
    }

    resetPagination = () => {
        this.props.resetIndex(0)
        this.props.resetEnd(19)
    }

    endPagination = () => {
        this.props.resetIndex(Math.floor(this.props.end / 20) * 20)
        this.props.resetEnd(this.props.end)
    }

    getEndItem = index => index + 20 < this.props.end ? index + 20 : this.props.end

    render(){
        return (<div className="pagination">
        <span className="page-start" onClick={this.resetPagination}>Start </span>
        <span className="page-down" onClick={this.decreasePagination}>{"< "}</span>
        {this.props.start + 1} - {this.getEndItem(this.props.start)}
        <span className="page-up" onClick={this.increasePagination}>{" >"}</span>
        <span className="page-end" onClick={this.endPagination}> End</span>
    </div>)
    }
}

export default Pagination