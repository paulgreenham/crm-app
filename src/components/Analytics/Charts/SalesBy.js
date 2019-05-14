import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'


class SalesBy extends Component {
    constructor() {
        super()
        this.state = {
            currentSelection: "country"
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    renderMenu = () => {
        return(<select className="selection-menu" name="currentSelection" value={this.state.currentSelection} onChange={this.handleInput}>
            <option defaultValue={true} value="country">Country</option>
            <option value="emailType">Email</option>
            <option value="month">Month (all years)</option>
            <option value="owner">Owner</option>
        </select>)
    }

    getFullMonth = (date = new Date()) => new Intl.DateTimeFormat('en-US', {month: "long"}).format(date)

    getDataObject = (l, list) => {
        return {
            selection: l,
            sales: list[l]
        }
    }
    
    getDataObjects = list => Object.keys(list).map(l => this.getDataObject(l, list))

    searchFilter = (c, list, selection) => {
        if (selection === "month") {
            let month = this.getFullMonth(new Date(c.firstContact))
            return list[month] ? list[month] += 1 : list[month] = 1
        }
        else {
            return list[c[selection]] ? list[c[selection]] += 1 : list[c[selection]] = 1
        }
    }

    getData = selection => {
        let list = {}
        this.props.clients.filter(c => c.sold)
            .forEach(c => this.searchFilter(c, list, selection))
        return this.getDataObjects(list)
    }

    renderChart = data => {
        console.log(data)
        return (
            <ResponsiveContainer width='100%'>
                <BarChart width={400} height={250} layout="horizontal" data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="selection" type="category"/>
                    <YAxis dataKey="sales" type="number"/>
                    <Bar dataKey="selection" fill="#955196" legendType="none" barSize={100}
                        isAnimationActive={true}/>
                </BarChart>
            </ResponsiveContainer>
        )
    }

    render(){
        return (<div className="sales-by">
            <div className="sales-by-menu">Sales by {this.renderMenu()}</div>
            {this.renderChart(this.getData(this.state.currentSelection))}
        </div>)
    }
}

export default SalesBy