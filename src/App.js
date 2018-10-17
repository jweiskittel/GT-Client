import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Button, Navbar, NavbarBrand} from 'reactstrap'
import Tournaments from './components/Tournaments'
import CreateTourney from './components/CreateTourney'
import UpdateTourney from './components/UpdateTourney'
import MyEvents from './components/MyEvents'
import FrontPage from './components/FrontPage'
import styled from 'styled-components'


let Buttons = styled.div``
if (!sessionStorage.getItem('SessionToken') || sessionStorage.getItem('SessionToken') === 'undefined') {
  Buttons = styled.div`
  visibility: hidden
  `
} else {
  Buttons = styled.div`
  visibility: visible
  `
}

class App extends Component {
  constructor() {
    super()
    this.state ={
      sessionToken: ''
    }
  }

  componentWillMount() {
    const token = sessionStorage.getItem('SessionToken')
    if ( token && !this.state.sessionToken) {
      this.setState({sessionToken: token})
    }
  }

  setSessionState = (token) => {
    sessionStorage.setItem('SessionToken', token)
    this.setState({sessionToken: token})
  }

  handleLogout = () => {
    this.setState({sessionToken: ''})
    sessionStorage.clear()
  }

  protectedViews = () => {
    if (this.state.sessionToken === sessionStorage.getItem('SessionToken') && sessionStorage.getItem('SessionToken') !== 'undefined') {
      return (
        <Switch>
          <Route exact path='/tournaments'><Tournaments /></Route>
          <Route exact path='/createTourney'><CreateTourney /></Route>
          <Route exact path='/update'><UpdateTourney /></Route>
          <Route exact path='/registered'><MyEvents /></Route>
        </Switch>
      )
    } else {
      return (
            <Route exact path='/'><FrontPage setToken={this.setSessionState}/></Route>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar style={{position: 'fixed', top: '0', width: '100vw', zIndex: '1', borderBottom: 'solid 1px black'}} color="success" dark expand="md">
              <NavbarBrand style={{color: 'white'}}><i className="fas fa-golf-ball" style={{marginRight: '10px'}}></i>GolfToday</NavbarBrand>
              <Buttons id='navbar'>
                <Button style={{marginRight: '15px', border: 'solid 1px black'}} size='sm' color='primary' href='/tournaments'><i className="fas fa-trophy"></i></Button>
                <Button style={{border: 'solid 1px black'}} size='sm' color='danger' href='/' onClick={this.handleLogout}><i className="fas fa-power-off"></i></Button>
              </Buttons>
            </Navbar>
            {this.protectedViews()}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
