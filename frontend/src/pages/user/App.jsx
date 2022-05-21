import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Post from './Post';
import UpdatePost from './UpdatePost'
import Profile from './Profile';
import UpdateProfile from './UpdateProfile'
import Setting from './Setting';
import { UserError } from '../../components/Error'

function App() {
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    let userData = JSON.parse(localStorage.getItem("userData"))

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    {(!token && !userData ) ?
                        <Redirect to='/auth/login' /> : <Redirect to='/home' />}
                </Route>
                <Route path='/auth/signup'>
                    {(!token && !userData ) ?
                        <Signup /> : <Redirect to='/home' />}
                </Route>
                <Route path='/auth/login'>
                    {(!token && !userData ) ?
                        <Login /> : <Redirect to='/home' />}
                </Route>
                <Route path='/home'>
                    {(token && userData ) ?
                        <Home /> : <Redirect to='/auth/login' />}
                </Route>
                <Route path='/status/:id'>
                    <Post />
                </Route>
                <Route
                    path='/update/:id'
                    render={(props) => <UpdatePost {...props} />}
                />
                <Route path='/profile/:id'>
                    <Profile />
                </Route>
                <Route path='/setting/:id'>
                    <Setting />
                </Route>
                <Route path='/update-profile/:id'>
                    <UpdateProfile />
                </Route>
                <Route path='/error'>
                    <UserError />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;