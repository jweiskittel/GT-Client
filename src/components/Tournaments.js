import React, {Component} from 'react'
import {Container, Row, Col, Button} from 'reactstrap'
import styled from 'styled-components'
import APIURL from '../helpers/environment'

const List = styled.ul`
list-style: none;
text-align: left;
margin: 5px 0px 5px 0px
`

const ListItem = styled.li`
padding: 5px;
text-align: left;
margin: 0
`
const MyRow = styled.div`
border: 1px solid #3a4;
border-right: none
border-left: none
`

export default class Tournaments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }
    
    fetchTourneys = () => {
        fetch(`${APIURL}/tournaments`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(response => response.json())
        .then(response => {
            this.setState({results: response})})
    }

    handleDelete = (e) => {
        let token = sessionStorage.getItem('SessionToken')
        fetch(`${APIURL}/tournaments/delete/${e.target.name}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        })
        window.location.reload()
    }

    handleRegister = (e) => {
        let token = sessionStorage.getItem('SessionToken')
        fetch(`${APIURL}/register/register/${e.target.name}`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        })
        .then(alert(`You have successfully registered for this event! Visit 'My Events' to see all of your events!`))
    }

    setStorage = (e) => {
        sessionStorage.setItem('EventId', e.target.name)
    }

    componentWillMount() {this.fetchTourneys()}

    render() {
        return (
            <div style={{marginTop: '70px'}}>
                <Container>
                    <Row>
                        <Col className='col-8'>
                            <h3 style={{marginBottom: '20px'}}>Tournaments</h3>
                        </Col>
                        <Col className='col-2'>
                            <Button size='sm' color='secondary' href='/registered' style={{marginTop: '5px', border: 'solid 1px black'}}>My Events</Button>
                        </Col>
                    </Row>
                </Container>
                
                <Container style={{padding: '0'}}>
                    {this.state.results.map(event => {
                        return(
                            <MyRow key={event.id}>
                                <Row>
                                    <Col>
                                        <List>
                                            <ListItem style={{fontWeight: 'bold'}}>{event.location}</ListItem>
                                            <ListItem>{event.format}</ListItem>
                                            <ListItem>{event.date}</ListItem>
                                        </List>
                                    </Col>
                                    <Col>
                                        <Button style={{margin: '20px 0px 10px 0px', border: 'solid 1px black'}} size='sm' color='success' name={event.id} onClick={this.handleRegister}>Register</Button><br />
                                        <Button style={{border: 'solid 1px black'}} size='sm' color='info' href='/update' name={event.id} onClick={this.setStorage}>Update</Button>
                                        <Button style={{margin: '0px 0px 0px 5px', border: 'solid 1px black'}} size='sm' color='danger' name={event.id} onClick={this.handleDelete}>Delete</Button>
                                    </Col>                        
                                </Row>
                            </MyRow>
                        )})} 
                </Container>
                <Button style={{margin: '20px 0px', border: 'solid 1px black'}} color='info' href='/createTourney'>Create New Tournament</Button>
            </div>
        )
    }
}
