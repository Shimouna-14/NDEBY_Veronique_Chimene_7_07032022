import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Body from './styles/body';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import Error from './components/Error';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Body/>
      <Switch>
        <Route exact path='/api/auth/signup'>
          <Signup />
        </Route>
        <Route path='/api/auth/login'>
          <Login />
        </Route>
        <Route path='/api/home'>
          <Home />
        </Route>
        <Route path='/api/status'>
          <Post />
        </Route>
        <Route path='/api/profile'>
          <Profile />
        </Route>
        <Route path='/api/setting'>
          <Setting />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);