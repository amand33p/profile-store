import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <ToastProvider placement="bottom-center" autoDismiss={true}>
    <Router>
      <App />
    </Router>
  </ToastProvider>,
  document.getElementById('root')
);
