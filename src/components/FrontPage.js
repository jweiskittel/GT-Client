import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Auth'
import SignIn from './SignIn'
import SignUp from './SignUp'

const FrontPage = (props) => {
    return (
        <Switch>
            <Route exact path='/'><Auth /></Route>
            <Route exact path='/signIn'><SignIn setUser={props.setUser} setToken={props.setToken}/></Route>
            <Route exact path='/signUp'><SignUp /></Route>
        </Switch>
    )
}

export default FrontPage