import React, {Component} from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'
import styled from 'styled-components'
import APIURL from '../helpers/environment'

const Header = styled.h2`
margin: 110px 0px 60px 0px
`

export default class CreateTourney extends Component {
    constructor() {
        super()
        this.state = {
            location: '',
            date: '',
            format: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitCreate = (e) => {
    let newTourney = {
        location: this.state.location,
        date: this.state.date,
        format: this.state.format
    }
    let accessToken = sessionStorage.getItem('SessionToken')
        fetch(`${APIURL}/tournaments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(newTourney)
        })
        .then(window.location.href='/tournaments')
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <Header>Create Tournament</Header>
                <div>
                    <Form>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='text' name='location' placeholder='Location' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='select' name='format' onChange={this.handleChange}>
                                <option disabled selected hidden>- Select One -</option>
                                <option>Stroke</option>
                                <option>Match</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='date' name='date' placeholder='Date' onChange={this.handleChange}/>
                        </FormGroup>
                        <br />
                        <Button style={{border: 'solid 1px black'}} color='success' onClick={this.submitCreate}>Create</Button>
                    </Form>
                </div>
            </div>
        )
    }
}