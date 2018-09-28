import React from "react"
import ReactDOM from "react-dom"
import { connect, Provider } from "react-redux"
import { BrowserRouter, Router } from "react-router-dom"
import Popup from "react-popup"
import ReactGA from "react-ga"

import Logger from "js-logger"
Logger.useDefaults()

import createStore from "./api/client/reducer/create-store"
import createClients from "./api/client/create-clients"
import createNavigation from "./navigation/create-navigation"

import App from "./components/app"
import AppV2 from "./components/v2/app"

import BootstrapConfig from "./config/navigation/default"
import BootstrapConfigV2 from "./config/navigation/v2/default"

import createBrowserHistory from "history/createBrowserHistory"
import createHashHistory from "history/createHashHistory"

import moment from "moment-timezone"
moment.locale("fr")

if (process.env.UA_ID) {
	ReactGA.initialize(process.env.UA_ID)
}

function launch(config, callback) {
	const store = createStore(config)
	const clients = createClients(config.clients, store)
	const version = config.version ? config.version : 1

	const history = config.history == "hash" ? createHashHistory() : createBrowserHistory()
	history.listen((location, action) => {
		if (process.env.UA_ID) {
			ReactGA.set({ page: location.pathname })
			ReactGA.pageview(location.pathname)
		}
	});

	let mainComponent = App, bootstrapConfig = BootstrapConfig
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

		const App = () => (
			<Provider store={store}>
				<Router history={history}>
					{React.createElement(mainComponent, {config: config})}
				</Router>
			</Provider>
		)

			ReactDOM.render(
				<App />,
				document.getElementById("app-root")
			);

		ReactDOM.render(
			<Provider store={store}>
				<Router history={history}>
					<Popup
						escToClose={true}
						closeOnOutsideClick={false}
						defaultOk="OK"
						defaultCancel="Annuler"
						className={(config.popup && config.popup.className) ? config.popup.className : "mm-popup"}
						btnClass={(config.popup && config.popup.bntClass) ? config.popup.btnClass : "mm-popup__btn"}
						wildClasses={!config.popup}
					/>
				</Router>
			</Provider>,
			document.getElementById("popup-container")
		)
		if (callback) callback()
	})
}

export default {
	launch
}
