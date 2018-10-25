import React from 'react'
import {Button, Input} from 'reactstrap'
import styled from 'styled-components'
import img from '../assets/flag.jpg'

const Background = styled.div`
background-image: url(${img});
background-attachment: fixed;
background-size: cover;
background-position: left;
height: 100vh;
`

const Auth = () => {
    return (
        <Background>
            <h1 style={{padding: '140px 0px 40px 0px', color: 'white', textShadow: '2px 2px black'}}>Welcome!</h1>
            <Button style={{margin: '40px 0px 30px 0px', border: 'solid 1px black'}} color='success' href='/signIn'>Sign In</Button>
            <br />
            <p style={{color: 'white', fontSize: '24px', textShadow: '2px 2px black'}}>or</p>
            <br />
            <Button style={{margin: '0px 0px 0px 0px', border: 'solid 1px black'}} color='success' href='/signUp'>Sign Up</Button>
        </Background>
    )
}

export default Auth