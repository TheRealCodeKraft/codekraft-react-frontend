var React = require('react')
var ReactDOM = require('react-dom')
import { connect } from 'react-redux'

var Logger = require('js-logger')
Logger.useDefaults();

var Provider = require('react-redux').Provider
import { AppContainer } from 'react-hot-loader';

import createStore from './api/client/reducer/create-store'
import createClients from './api/client/create-clients'
import createNavigation from './navigation/create-navigation'

var BrowserRouter = require('react-router-dom').BrowserRouter

import App from './components/app'
import AppV2 from './components/v2/app'

import BootstrapConfig from './config/navigation/default'
import BootstrapConfigV2 from './config/navigation/v2/default'

var Bootstrap = function() {

  var launch = function(config) {
    const store = createStore(config.clients)
    const clients = createClients(config.clients, store)
    const version = config.version ? config.version : 1

    var mainComponent = App, bootstrapConfig = BootstrapConfig
    if (version === 2) {
      mainComponent = AppV2
      bootstrapConfig = BootstrapConfigV2
    }

    store.dispatch({
      type: "CLIENTS",
      clients: clients
    })

    createNavigation(bootstrapConfig, config.navigation, clients, function(nav) {
      store.dispatch({
        type: "NAVIGATION",
        navigation: nav
      })

      //document.addEventListener('DOMContentLoaded', function() {
        ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
              {React.createElement(mainComponent, {config: config})}
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
