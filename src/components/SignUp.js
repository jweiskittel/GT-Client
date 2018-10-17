import React, {Component} from 'react'
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'
import styled from 'styled-components'
import img from '../assets/flag.jpg'
import APIURL from '../helpers/environment'

const Header = styled.h1`
padding: 120px 0px 40px 0px;
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

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            fName: '',
            lName: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    submitSignUp = (e) => {
        let newUser = {
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            password: this.state.password
            } 
        if (this.state.password.length > 7) {     
        fetch(`http://${APIURL}/user/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        window.location.href='/signIn'
    } else {
        alert('Password must be at least 8 characters')
        window.location.reload()
    }}

    render(){
        return (
            <Background>
                <Header>Join Us!</Header>
                <div>
                    <Form>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='text' name='fName' placeholder='First Name' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='text' name='lName' placeholder='Last Name' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='email' name='email' placeholder='Email Address' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input style={{width: '75%', display: 'block', margin: 'auto', border: 'solid 1px black'}} bsSize='lg' type='password' name='password' placeholder='Password' onChange={this.handleChange}/>
                            <Label style={{fontSize: '15px', color: 'white'}}>must be at least 8 characters</Label>
                        </FormGroup>
                        <br/>
                        <Button style={{border: 'solid 1px black'}} color='success' onClick={this.submitSignUp}>Sign Up</Button>
                    </Form>
                </div>
            </Background>
        )
    }
}