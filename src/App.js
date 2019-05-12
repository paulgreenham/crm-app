import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home';
import Clients from './components/Clients';
import Actions from './components/Actions';
import Analytics from './components/Analytics';

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentPage: "Home"
    }
  }

  changePage = page => {
    this.setState({ currentPage: page })
  }

  setNavCurrent = page => this.state.currentPage === page ? {backgroundColor: "grey"} : null

  render() {
  return (
    <div className="App">
      <Router>
      <div className="nav-bar">
        <Link style={this.setNavCurrent("Clients")} to='/clients'>Clients</Link>
        <Link style={this.setNavCurrent("Actions")} to='/actions'>Actions</Link>
        <Link style={this.setNavCurrent("Analytics")} to='/analytics'>Analytics</Link>
        <div></div>
        <Link style={this.setNavCurrent("Home")} to='/'>Home</Link>
      </div>
        <Route exact path='/' render={() => <Home changePage={this.changePage}/>} />
        <Route exact path='/clients' render={() => <Clients changePage={this.changePage}/>} />
        <Route exact path='/actions' render={() => <Actions changePage={this.changePage}/>} />
        <Route exact path='/analytics' render={() => <Analytics changePage={this.changePage}/>} />
      </Router>
    </div>
  )
  }
}

export default App