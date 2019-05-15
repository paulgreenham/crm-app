import React, { Component } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

class ClientAcquisition extends Component {
    constructor() {
        super()
        this.colors = ["#2ECC71", "#3498DB", "#E74C3C", "#F1C40F"]
    }

    getMonthsAgo = months => new Date().setMonth(new Date().getMonth() - months)

    getDatePortions = () => {
        return {
            "Last 6 Months": 0,
            "6-12 Months": 0,
            "1-2 Years": 0,
            "> 2 Years" : 0
        }
    }

    getSaleObject = (period, sales) => {
        return {
            period: period,
            sales: sales[period]
        }
    }
    
    getSaleObjects = sales => Object.keys(sales).map(period => this.getSaleObject(period, sales))

    searchFilter = (c, sales) => {
            if (new Date(c.firstContact) > new Date(this.getMonthsAgo(6))) {
                sales["Last 6 Months"] ++
            }
            else if (new Date(c.firstContact) > new Date(this.getMonthsAgo(12))) {
                sales["6-12 Months"] ++
            }
            else if (new Date(c.firstContact) > new Date(this.getMonthsAgo(24))) {
                sales["1-2 Years"] ++
            }
            else {
                sales["> 2 Years"] ++
            }
    }

    getSales = () => {
        let sales = this.getDatePortions()
        this.props.clients.filter(c => c.sold)
            .forEach(c => this.searchFilter(c, sales))
        return this.getSaleObjects(sales)
    }

    getCustomLabels = ({ cx, cy, midAngle, innerRadius, outerRadius, period, sales}) => {
        const RADIAN = Math.PI / 180
        const radius = 25 + innerRadius + (outerRadius - innerRadius)
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill="#808080" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                {period}: {sales}
            </text>
        )
    }

    renderChart = data => {
        return (
            <ResponsiveContainer width="95%" height="90%">
                <PieChart margin={{top: 10, right: 5, bottom: 5, left: 5 }}>
                    <Pie data={data} dataKey="sales" nameKey="period" outerRadius={80} fill="#82ca9d"
                        isAnimationActive={true} label={this.getCustomLabels}>
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={this.colors[index]}/>)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        )
    }

    render(){
        return (<div id="client-acquisition">
            <div className="chart-header">Client Acquisition</div>
            {this.renderChart(this.getSales())}
        </div>)
    }
}

export default ClientAcquisition