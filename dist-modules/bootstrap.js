'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _reactHotLoader = require('react-hot-loader');

var _createStore = require('./api/client/reducer/create-store');

var _createStore2 = _interopRequireDefault(_createStore);

var _createClients = require('./api/client/create-clients');

var _createClients2 = _interopRequireDefault(_createClients);

var _createNavigation = require('./navigation/create-navigation');

var _createNavigation2 = _interopRequireDefault(_createNavigation);

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./components/v2/app');

var _app4 = _interopRequireDefault(_app3);

var _default = require('./config/navigation/default');

var _default2 = _interopRequireDefault(_default);

var _default3 = require('./config/navigation/v2/default');

var _default4 = _interopRequireDefault(_default3);

var _reactPopup = require('react-popup');

var _reactPopup2 = _interopRequireDefault(_reactPopup);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');

var Logger = require('js-logger');
Logger.useDefaults();

var Provider = require('react-redux').Provider;


var BrowserRouter = require('react-router-dom').BrowserRouter;
var Router = require('react-router-dom').Router;

_momentTimezone2.default.locale('fr');

var Bootstrap = function () {

  if (process.env.UA_ID) {
    _reactGa2.default.initialize(process.env.UA_ID);
  }

  var launch = function launch(config, callback) {
    var store = (0, _createStore2.default)(config.clients);
    var clients = (0, _createClients2.default)(config.clients, store);
    var version = config.version ? config.version : 1;

    var history = config.history == "hash" ? (0, _createHashHistory2.default)() : (0, _createBrowserHistory2.default)();
    history.listen(function (location, action) {
      if (process.env.UA_ID) {
        _reactGa2.default.set({ page: location.pathname });
        _reactGa2.default.pageview(location.pathname);
      }
    });

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
        return React.createElement(
          Provider,
          { store: store },
          React.createElement(
            Router,
            { history: history },
            React.createElement(mainComponent, { config: config })
          )
        );
      };
      App = (0, _reactHotLoader.hot)(module)(App);

      //document.addEventListener('DOMContentLoaded', function() {
      ReactDOM.render(React.createElement(App, null), document.getElementById('app-root'));
      //});

      ReactDOM.render(React.createElement(
        Provider,
        { store: store },
        React.createElement(_reactPopup2.default, {
          escToClose: true,
          closeOnOutsideClick: false,
          defaultOk: 'OK',
          defaultCancel: 'Annuler',
          className: config.popup && config.popup.className ? config.popup.className : "mm-popup",
          btnClass: config.popup && config.popup.bntClass ? config.popup.btnClass : "mm-popup__btn",
          wildClasses: !config.popup
        })
      ), document.getElementById('popup-container'));
      if (callback) callback();
    });
  };

  return {
    launch: launch
  };
}();

exports.default = Bootstrap;