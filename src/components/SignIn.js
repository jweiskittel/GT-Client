import React, {Component} from 'react'
import {Button, Form, FormGroup, Input} from 'reactstrap'
import styled from 'styled-components'
import img from '../assets/flag.jpg'
import APIURL from '../helpers/environment'

const Header = styled.h1`
padding: 140px 0px 40px 0px;
color: white;
text-shadow: 2px 2px black
`

const Background = styled.div`
background-image: url(${img});
background-attachment: fixed;
background-size: cover;
background-position: left;
height: 100vh;
`

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    submitSignIn = (e) => {
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        fetch(`${APIURL}/user/signIn`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(response => {
            this.props.setToken(response.sessionToken)
            window.location.href='/tournaments'
        })
        e.preventDefault()
    }

    

    render() {
        return (
            <Background>
                <Header>Sign In</Header>
                <div>
                    <Form>
                    <FormGroup>
                        <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='email' name='email' placeholder='Email Address' onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='password' name='password' placeholder='Password' onChange={this.handleChange}/>
                    </FormGroup>
                        <br />
                        <Button style={{border: 'solid 1px black'}} color='success' type='submit' onClick={this.submitSignIn}>Sign In</Button>
                    </Form>
                </div>
            </Background>
        )
    }
}
