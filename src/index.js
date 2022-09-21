import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import Store from './Components/Store';

const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

  root.render(
    <Provider store={Store }><App/></Provider>
  );