var React = require('react')
var ReactDOM = require('react-dom')

import { connect } from 'react-redux'

var Logger = require('js-logger')
Logger.useDefaults();

var Provider = require('react-redux').Provider
//import { AppContainer } from 'react-hot-loader';

import createStore from './api/client/reducer/create-store'
import createClients from './api/client/create-clients'
import createNavigation from './navigation/create-navigation'

var BrowserRouter = require('react-router-dom').BrowserRouter
var Router = require('react-router-dom').Router

import App from './components/app'
import AppV2 from './components/v2/app'

import BootstrapConfig from './config/navigation/default'
import BootstrapConfigV2 from './config/navigation/v2/default'

import Popup from 'react-popup'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import ReactGA from 'react-ga'

//import hotLoader from "react-hot-loader"

import moment from 'moment-timezone'
moment.locale('fr')

//console.log(hotLoader)

var Bootstrap = function() {


  if (process.env.UA_ID) {
    ReactGA.initialize(process.env.UA_ID)
  }

  var launch = function(config, callback) {
    const store = createStore(config.clients)
    const clients = createClients(config.clients, store)
    const version = config.version ? config.version : 1

		const history = config.history == "hash" ? createHashHistory() : createBrowserHistory()
		history.listen((location, action) => {
			if (process.env.UA_ID) {
				ReactGA.set({ page: location.pathname })
				ReactGA.pageview(location.pathname)
			}
		});

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

			var App = () => 
          <Provider store={store}>
            <Router history={history}>
							{/*<AppContainer>*/}
              {React.createElement(mainComponent, {config: config})}
							{/*</AppContainer>*/}
            </Router>
          </Provider>
			//App = hot(module)(App)

      //document.addEventListener('DOMContentLoaded', function() {
        ReactDOM.render(
					<App />,
          document.getElementById('app-root')
        );
      //});

// Webpack Hot Module Replacement API
/*
if (module.hot) {
console.log(module)
console.log(module.hot)
console.log("HOT HOT HOT")
console.log("HOT HOT HOT")
console.log("HOT HOT HOT")
console.log("HOT HOT HOT")
console.log("HOT HOT HOT")
console.log("HOT HOT HOT")
console.log("HOT HOT HOT")
console.log("HOT HOT HOT")
	var component_path = "./components/app"
	if (version === 2) {
		component_path = "./component/v2/app"
	}
  module.hot.accept(component_path, () => {
    // if you are using harmony modules ({modules:false})
    render(React.createElement(mainComponent, {config: config}))
    // in all other cases - re-require App manually
    // render(require('./containers/App'))
  })
}
*/
      
      ReactDOM.render(
          <Provider store={store}>
            <Popup 
							escToClose={true} 
							closeOnOutsideClick={false} 
							defaultOk="OK" 
							defaultCancel="Annuler" 
							className={(config.popup && config.popup.className) ? config.popup.className : "mm-popup"}
							btnClass={(config.popup && config.popup.bntClass) ? config.popup.btnClass : "mm-popup__btn"}
							wildClasses={!config.popup}
						/>
          </Provider>,
        document.getElementById('popup-container')
      )
      if (callback) callback()
    })
  }

  return {
    launch: launch
  }
}()

export default Bootstrap
