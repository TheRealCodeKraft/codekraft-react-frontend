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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');


var Logger = require('js-logger');
Logger.useDefaults();

var Provider = require('react-redux').Provider;


var BrowserRouter = require('react-router-dom').BrowserRouter;

var Bootstrap = function () {

  var launch = function launch(config, callback) {
    var store = (0, _createStore2.default)(config.clients);
    var clients = (0, _createClients2.default)(config.clients, store);
    var version = config.version ? config.version : 1;

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

      //document.addEventListener('DOMContentLoaded', function() {
      ReactDOM.render(React.createElement(
        Provider,
        { store: store },
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(mainComponent, { config: config })
        )
      ), document.getElementById('app-root'));
      //});

      ReactDOM.render(React.createElement(_reactPopup2.default, null), document.getElementById('popup-container'));
      if (callback) callback();
    });
  };

  return {
    launch: launch
  };
}();

exports.default = Bootstrap;