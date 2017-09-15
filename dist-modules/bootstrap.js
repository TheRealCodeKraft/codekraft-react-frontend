'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createStore = require('./api/client/reducer/create-store');

var _createStore2 = _interopRequireDefault(_createStore);

var _createClients = require('./api/client/create-clients');

var _createClients2 = _interopRequireDefault(_createClients);

var _createNavigation = require('./navigation/create-navigation');

var _createNavigation2 = _interopRequireDefault(_createNavigation);

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');

var Logger = require('js-logger');
Logger.useDefaults();

var Provider = require('react-redux').Provider;

var BrowserRouter = require('react-router-dom').BrowserRouter;

var Bootstrap = function () {

  var launch = function launch(config) {
    var store = (0, _createStore2.default)(config.clients);
    var clients = (0, _createClients2.default)(config.clients, store);

    store.dispatch({
      type: "CLIENTS",
      clients: clients
    });

    store.dispatch({
      type: "NAVIGATION",
      navigation: (0, _createNavigation2.default)(config.navigation)
    });

    document.addEventListener('DOMContentLoaded', function () {
      ReactDOM.render(React.createElement(
        Provider,
        { store: store },
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(_app2.default, null)
        )
      ), document.getElementById('app-root'));
    });
  };

  return {
    launch: launch
  };
}();

exports.default = Bootstrap;