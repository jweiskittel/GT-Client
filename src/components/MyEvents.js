import React, {Component} from 'react'
import styled from 'styled-components'
import {Container, Row, Col, Button} from 'reactstrap'
import APIURL from '../helpers/environment'

const MyRow = styled.div`
border: 1px solid #3a4;
border-left: none;
border-right: none
`

export default class MyEvents extends Component {
    constructor() {
        super()
        this.state = {
            results: []
        }
    }

    fetchRealData = (response) => {
        let resultsArr = []
        let token = sessionStorage.getItem('SessionToken')
        response.map(event => {
            fetch(`${APIURL}/tournaments/register/${event.event}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then(response => response.json())
            .then(response => {
                resultsArr.push(response)
                this.setState({results: resultsArr})
                console.log(this.state.results)
            })
        })
    }

    fetchRegistered = () => {
        let token = sessionStorage.getItem('SessionToken')
        fetch(`${APIURL}/register/register`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(response => response.json())
                .then(response => this.fetchRealData(response))
    }

    handleUnregister = (e) => {
        let token = sessionStorage.getItem('SessionToken')
        fetch(`${APIURL}/register/unregister/${e.target.name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        window.location.reload()
    }

    componentDidMount() {this.fetchRegistered()}

    render() {
        if (this.state.results.length > 0) {
            return(
                <div style={{marginTop: '70px'}}>
                    <h1 style={{marginBottom: '10px'}}>My Events</h1>
                    <Container style={{padding: '0'}}>
                        {this.state.results.map(register => {
                            return(
                                <MyRow key={register.id}>
                                    <Row>
                                        <Col style={{marginTop: '10px'}}>
                                            <p style={{fontWeight: 'bold'}}>{register.location}</p>
                                            <p>{register.date}</p>
                                            <p>{register.format}</p>
                                        </Col>
                                        <Col>
                                            <Button style={{marginTop: '50px', border: 'solid 1px black'}} size='sm' color='secondary' name={register.id} onClick={this.handleUnregister}>Unregister</Button>
                                        </Col>
                                    </Row>
                                </MyRow>
                            )})}
                    </Container>
                </div>
            )
        } else {
            return(
                <div style={{marginTop: '70px'}}>
                    <h1 style={{marginBottom: '20px'}}>My Events</h1>
                    <h4>You aren't registered for any events yet!</h4>
                </div>
            )
        }
    } 
}