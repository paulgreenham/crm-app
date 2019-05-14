import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Label } from 'recharts'

class TopEmployees extends Component {

    sortEmployees = (a, b) => {
        if (a.sales < b.sales) { return 1 }
        else if (b.sales < a.sales) { return -1 }
        else { return 0}
    }

    getEmployeeObject = (e, employees) => {
        return {
            name: e,
            sales: employees[e]
        }
    }
    
    getTopEmployees = employees => {
        let employeeList = Object.keys(employees).map(e => this.getEmployeeObject(e, employees))
        return employeeList.sort(this.sortEmployees).splice(0, 3)
    }

    getTopEmployeeData = () => {
        let employees = {}
        this.props.clients.filter(c => c.sold)
            .forEach(c => employees[c.owner] ? employees[c.owner] += 1 : employees[c.owner] = 1)
        return this.getTopEmployees(employees)
    }

    renderChart = data => {
        return (
            <ResponsiveContainer width='100%'>
                <BarChart width={730} height={250} layout="vertical" data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="sales" type="number">
                        <Label value="Sales" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis dataKey="name" type="category"/>
                    <Bar dataKey="sales" fill="#003F5C" legendType="none" maxBarSize={20}
                        isAnimationActive={true}/>
                </BarChart>
            </ResponsiveContainer>
        )
    }

    render(){
        return (<div className="top-employees">
            {this.renderChart(this.getTopEmployeeData())}
        </div>)
    }
}

export default TopEmployees