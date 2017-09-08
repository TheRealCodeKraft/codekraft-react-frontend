import React from 'react';
import ReactDOM from 'react-dom';

import Logger from 'js-logger';
Logger.useDefaults();

import { Provider } from 'react-redux';

require('dotenv').config()

import createStore from './api/client/reducer/create-store'
import createClients from './api/client/create-clients'

import App from './components/app'

var Bootstrap = function() {
  var launch = function(config) {
    const store = createStore(config.reducers)
    const clients = createClients(config.clients, store)
    store.dispatch({
      type: "CLIENTS",
      clients: clients
    })
  
    document.addEventListener('DOMContentLoaded', function() {
console.log("ROOT")
console.log(clients)
      ReactDOM.render(
        <Provider store={store}>
          <App clients={clients} />
        </Provider>,
        document.getElementById('app-root')
      );
    });
  }

  return {
    launch: launch
  }
}()

export default Bootstrap
