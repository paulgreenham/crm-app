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

    getMonth = (date = new Date()) => new Date(date).toDateString().slice(4, 7)

    getDataObject = (l, list) => {
        return {
            selection: l,
            sales: list[l]
        }
    }
    
    getDataObjects = list => Object.keys(list).map(l => this.getDataObject(l, list))

    searchFilter = (c, list, selection) => {
        if (selection === "month") {
            let month = this.getMonth(new Date(c.firstContact))
            return list[month] ? list[month] += 1 : list[month] = 1
        }
        else {
            return list[c[selection]] ? list[c[selection]] += 1 : list[c[selection]] = 1
        }
    }

    isMonthGreater = (a, b) => new Date(`${a.selection} 15, 2000`).getMonth() > new Date(`${b.selection} 15, 2000`).getMonth()

    sortByMonth = (a, b) => this.isMonthGreater(a, b) ? 1 : -1

    simpleSort = (a, b) => a.selection > b.selection ? 1 : -1

    runSort = (selection, list) => {
        if (selection === "month") {
            return list.sort(this.sortByMonth)
        }
        else if (selection === "emailType") {
            list.shift()
            return list.sort(this.simpleSort)
        }
        else {
            return list.sort(this.simpleSort)
        }
    }

    getData = selection => {
        let list = {}
        this.props.clients.filter(c => c.sold)
            .forEach(c => this.searchFilter(c, list, selection))
        return this.runSort(selection, this.getDataObjects(list))
    }

    renderChart = data => {
        return (
            <ResponsiveContainer width="95%" height="90%">
                <BarChart layout="horizontal" data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="selection" type="category" interval={0}/>
                    <YAxis dataKey="sales" type="number"/>
                    <Bar dataKey="sales" fill="#955196" legendType="none"
                        isAnimationActive={true} animationDuration={1000}/>
                </BarChart>
            </ResponsiveContainer>
        )
    }

    render(){
        return (<div id="sales-by">
            <div className="sales-by-menu"><span className="chart-header">Sales by </span>{this.renderMenu()}</div>
            {this.renderChart(this.getData(this.state.currentSelection))}
        </div>)
    }
}

export default SalesBy