import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
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

export default class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    setStorage = (e) => {
        sessionStorage.setItem('EventId', e.target.name)
    }

    handleDelete = (e) => {
        let token = sessionStorage.getItem('SessionToken')
        fetch(`${APIURL}/tournaments/delete/${e.target.name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        window.location.reload()
    }

    fetchTourneys() {
        let token = sessionStorage.getItem('SessionToken')
        fetch(`${APIURL}/tournaments/owned`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(response => this.setState({ results: response }))
    }

    componentWillMount() { this.fetchTourneys() }

    render() {
        return (
            <div style={{ marginTop: '70px' }}>
                <h3>Hello {this.props.user}!</h3>
                <h6>Make changes to your events here:</h6>

                <Container style={{ padding: '0' }}>
                    {this.state.results.map(event => {
                        return (
                            <MyRow key={event.id}>
                                <Row>
                                    <Col>
                                        <List>
                                            <ListItem style={{ fontWeight: 'bold' }}>{event.location}</ListItem>
                                            <ListItem>{event.format}</ListItem>
                                            <ListItem>{event.date}</ListItem>
                                        </List>
                                    </Col>
                                    <Col>
                                        <Button style={{ border: 'solid 1px black', marginTop: '25%' }} size='sm' color='info' href='/update' name={event.id} onClick={this.setStorage}>Update</Button>
                                        <Button style={{ margin: '25% 0px 0px 5px', border: 'solid 1px black' }} size='sm' color='danger' name={event.id} onClick={this.handleDelete}>Delete</Button>
                                    </Col>
                                </Row>
                            </MyRow>
                        )
                    })}
                </Container>
            </div>
        )
    }
}