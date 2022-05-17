import React from 'react';
import ReactDOM from 'react-dom';
import App  from './components/App';
import Body from './styles/body'

ReactDOM.render(
  <React.StrictMode>
    <Body />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);