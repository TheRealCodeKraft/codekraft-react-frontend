var React = require('react')
var ReactDOM = require('react-dom')

var Logger = require('js-logger')
Logger.useDefaults();

import { Provider } from 'react-redux';

require('dotenv').config()

import createStore from './api/client/reducer/create-store'
import createClients from './api/client/create-clients'

import { BrowserRouter } from 'react-router-dom'

import App from './components/app'

var Bootstrap = function() {
  var launch = function(config) {
    const store = createStore(config.clients)
    const clients = createClients(config.clients, store)

    store.dispatch({
      type: "CLIENTS",
      clients: clients
    })

    store.dispatch({
      type: "NAVIGATION",
      navigation: config.navigation
    })
  
    document.addEventListener('DOMContentLoaded', function() {
      ReactDOM.render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
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
