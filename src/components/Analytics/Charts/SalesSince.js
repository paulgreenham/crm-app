import React, { Component } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'

class SalesSince extends Component {

    getLastMonth = () => new Date().setDate(new Date().getDate() - 30)

    getShortDate = date => new Date(date).toDateString().slice(4, 7) + "-" + new Date(date).getDate() + ", " + new Date(date).getFullYear()

    populateMonth() {
        const dates = {}
        let dateIterator = new Date(this.getLastMonth())
        while (dateIterator < new Date()) {
            dates[this.getShortDate(dateIterator)] = 0
            dateIterator = new Date(dateIterator).setDate(new Date(dateIterator).getDate() + 1)      //increment by one day
        }
        return dates
    }

    getSaleObject = (day, sales) => {
        return {
            date: day,
            sales: sales[day]
        }
    }
    
    getSaleObjects = sales => Object.keys(sales).map(day => this.getSaleObject(day, sales))

    searchFilter = (c, sales) => {
            if (new Date(c.firstContact) < new Date(this.getLastMonth())) { return }
            let day = this.getShortDate(c.firstContact)
            return sales[day] += 1
    }

    sortByDate = (a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1

    getSales = () => {
        let sales = this.populateMonth()
        this.props.clients.filter(c => c.sold)
            .forEach(c => this.searchFilter(c, sales))
        return this.getSaleObjects(sales).sort(this.sortByDate)
    }

    shortenDate = date => date.slice(0, date.length - 6)

    getShortDates = dateList => {
        return dateList.map(d => {return {
            date: this.shortenDate(d.date),
            sales: d.sales
        }})
    }

    renderChart = data => {
        return (
            <ResponsiveContainer width="95%" height="90%">
                <LineChart layout="horizontal" data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="date" type="category"/>
                    <YAxis dataKey="sales" type="number"/>
                    <Line dataKey="sales" dot={false} stroke="#E74C3C" type="monotoneX" 
                        strokeWidth={3} legendType="none" isAnimationActive={true} animationDuration={1000}/>
                </LineChart>
            </ResponsiveContainer>
        )
    }

    render(){
        return (<div id="sales-since">
            <div className="chart-header">Sales since {this.shortenDate(this.getShortDate(this.getLastMonth()))}</div>
            {this.renderChart(this.getShortDates(this.getSales()))}
        </div>)
    }
}

export default SalesSince