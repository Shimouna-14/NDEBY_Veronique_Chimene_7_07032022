import React from 'react';
import ReactDOM from 'react-dom';
import UserApp from './pages/user/App';
import AdminApp from './pages/admin/App';
import Body from './styles/body'

ReactDOM.render(
  <React.StrictMode>
    <Body />
    <AdminApp />
    <UserApp />
  </React.StrictMode>,
  document.getElementById('root')
);