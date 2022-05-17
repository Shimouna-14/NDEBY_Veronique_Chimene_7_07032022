import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Post from '../pages/Post';
import UpdatePost from '../pages/UpdatePost'
import Profile from '../pages/Profile';
// import UpdateProfile from '../pages/UpdateProfile'
import Setting from '../pages/Setting';
import Error from '../components/Error'

function App() {
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    let userData = JSON.parse(localStorage.getItem("userData"))

    return (
        <Router>
            <Switch>
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
                <Route path='/profile/'>
                    <Profile />
                </Route>
                <Route path='/setting'>
                    <Setting />
                </Route>
                {/* <Route path='/info'>
                    <UpdateProfile />
                </Route> */}
                <Route path='/error'>
                    <Error />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;