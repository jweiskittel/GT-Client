import React, {Component} from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'
import styled from 'styled-components'
import APIURL from '../helpers/environment'

const Header = styled.h2`
margin: 110px 0px 60px 0px
`

export default class UpdateTourney extends Component {
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
            [e.target.name]: e.target.value.trim()
        })
    }

    submitUpdate = (e) => {
        let eventId = sessionStorage.getItem('EventId')
        let token = sessionStorage.getItem('SessionToken')
        fetch(`http://${APIURL}/tournaments/update/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        })
    }

    render() {
        return (
            <div>
                <Header>Update Tournament</Header>
                <div>
                    <Form>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} size='lg' type='text' name='location' placeholder='Location' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} size='lg' type='date' name='date' placeholder='Date' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} size='lg' type='text' name='format' placeholder='Stroke or Match' onChange={this.handleChange}/>
                        </FormGroup>
                        <br />
                        <Button style={{border: 'solid 1px black'}} href='/tournaments' color='success' onClick={this.submitUpdate}>Update</Button>
                    </Form>
                </div>
            </div>
        )
    }
}