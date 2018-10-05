"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reactPopup = require("react-popup");

var _reactPopup2 = _interopRequireDefault(_reactPopup);

var _reactGa = require("react-ga");

var _reactGa2 = _interopRequireDefault(_reactGa);

var _jsLogger = require("js-logger");

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var _createStore = require("./api/client/reducer/create-store");

var _createStore2 = _interopRequireDefault(_createStore);

var _createClients = require("./api/client/create-clients");

var _createClients2 = _interopRequireDefault(_createClients);

var _createNavigation = require("./navigation/create-navigation");

var _createNavigation2 = _interopRequireDefault(_createNavigation);

var _app = require("./components/app");

var _app2 = _interopRequireDefault(_app);

var _app3 = require("./components/v2/app");

var _app4 = _interopRequireDefault(_app3);

var _default = require("./config/navigation/default");

var _default2 = _interopRequireDefault(_default);

var _default3 = require("./config/navigation/v2/default");

var _default4 = _interopRequireDefault(_default3);

var _createBrowserHistory = require("history/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createHashHistory = require("history/createHashHistory");

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsLogger2.default.useDefaults();

_momentTimezone2.default.locale("fr");

if (process.env.UA_ID) {
	_reactGa2.default.initialize(process.env.UA_ID);
}

function launch(config, callback) {
	var store = (0, _createStore2.default)(config);
	var clients = (0, _createClients2.default)(config.clients, store);
	var version = config.version ? config.version : 1;

	var history = config.history == "hash" ? (0, _createHashHistory2.default)() : (0, _createBrowserHistory2.default)();
	history.listen(function (location, action) {
		if (process.env.UA_ID) {
			_reactGa2.default.set({ page: location.pathname });
			_reactGa2.default.pageview(location.pathname);
		}
	});
	if (config.listenHistory) {
		history.listen(config.listenHistory(store));
	}

	var mainComponent = _app2.default,
	    bootstrapConfig = _default2.default;
	if (version === 2) {
		mainComponent = _app4.default;
		bootstrapConfig = _default4.default;
	}

	store.dispatch({
		type: "CLIENTS",
		clients: clients
	});

	(0, _createNavigation2.default)(bootstrapConfig, config.navigation, clients, function (nav) {
		store.dispatch({
			type: "NAVIGATION",
			navigation: nav
		});

		var App = function App() {
			return _react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
					_reactRouterDom.Router,
					{ history: history },
					_react2.default.createElement(mainComponent, { config: config })
				)
			);
		};

		_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById("app-root"));

		_reactDom2.default.render(_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2.default.createElement(
				_reactRouterDom.Router,
				{ history: history },
				_react2.default.createElement(_reactPopup2.default, {
					escToClose: true,
					closeOnOutsideClick: false,
					defaultOk: "OK",
					defaultCancel: "Annuler",
					className: config.popup && config.popup.className ? config.popup.className : "mm-popup",
					btnClass: config.popup && config.popup.bntClass ? config.popup.btnClass : "mm-popup__btn",
					wildClasses: !config.popup
				})
			)
		), document.getElementById("popup-container"));

		if (callback) {
			callback();
		}
	});
}

exports.default = {
	launch: launch
};