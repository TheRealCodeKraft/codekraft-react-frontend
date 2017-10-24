var React = require('react')
var ReactDOM = require('react-dom')

var Logger = require('js-logger')
Logger.useDefaults();

var Provider = require('react-redux').Provider
import { AppContainer } from 'react-hot-loader';

import createStore from './api/client/reducer/create-store'
import createClients from './api/client/create-clients'
import createNavigation from './navigation/create-navigation'

var BrowserRouter = require('react-router-dom').BrowserRouter

import App from './components/app'

var Bootstrap = function() {

  var launch = function(config) {
    const store = createStore(config.clients)
    const clients = createClients(config.clients, store)

    store.dispatch({
      type: "CLIENTS",
      clients: clients
    })

    createNavigation(config.navigation, clients, function(nav) {
      store.dispatch({
        type: "NAVIGATION",
        navigation: nav
      })
  
      //document.addEventListener('DOMContentLoaded', function() {
        ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>,
          document.getElementById('app-root')
        );
      //});
    })
  }

  return {
    launch: launch
  }
}()

export default Bootstrap
