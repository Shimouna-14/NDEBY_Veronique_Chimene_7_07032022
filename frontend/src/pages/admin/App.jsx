import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import { AdminError } from '../../components/Error'

function Admin() {
    let token = JSON.parse(localStorage.getItem("jwt_G_admin"))
    let adminData = JSON.parse(localStorage.getItem("adminData"))

    return (
        <Router>
            <Switch>
                <Route path='/admin/auth/login'>
                    {(!token && !adminData) ?
                        <Login /> : <Redirect to='/admin/home' />}
                </Route>
                <Route path='/admin/home'>
                    {(token && adminData) ?
                        <Home /> : <Redirect to='/admin/auth/login' />}
                </Route>
                <Route path='/admin/status/:id'>
                    <Post />
                </Route>
                <Route path='/admin/profile/:id'>
                    <Profile />
                </Route>
                <Route path='/admin/error'>
                    <AdminError />
                </Route>
            </Switch>
        </Router>
    );
}

export default Admin;