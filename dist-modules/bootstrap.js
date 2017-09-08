'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jsLogger = require('js-logger');

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var _reactRedux = require('react-redux');

var _createStore = require('./api/client/reducer/create-store');

var _createStore2 = _interopRequireDefault(_createStore);

var _createClients = require('./api/client/create-clients');

var _createClients2 = _interopRequireDefault(_createClients);

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsLogger2.default.useDefaults();

require('dotenv').config();

var Bootstrap = function () {
  var launch = function launch(config) {
    var store = (0, _createStore2.default)(config.reducers);
    var clients = (0, _createClients2.default)(config.clients, store);
    store.dispatch({
      type: "CLIENTS",
      clients: clients
    });

    document.addEventListener('DOMContentLoaded', function () {
      console.log("ROOT");
      console.log(clients);
      _reactDom2.default.render(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_app2.default, { clients: clients })
      ), document.getElementById('app-root'));
    });
  };

  return {
    launch: launch
  };
}();

exports.default = Bootstrap;