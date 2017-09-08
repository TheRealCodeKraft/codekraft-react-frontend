'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _header = require('./offline/header');

var _header2 = _interopRequireDefault(_header);

var _home = require('./offline/home');

var _home2 = _interopRequireDefault(_home);

var _login = require('./offline/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./offline/signup');

var _signup2 = _interopRequireDefault(_signup);

var _authChecker = require('./utils/auth-checker');

var _authChecker2 = _interopRequireDefault(_authChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Offline = function (_React$Component) {
  _inherits(Offline, _React$Component);

  function Offline() {
    _classCallCheck(this, Offline);

    return _possibleConstructorReturn(this, (Offline.__proto__ || Object.getPrototypeOf(Offline)).apply(this, arguments));
  }

  _createClass(Offline, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { className: 'content content-no-sidebar' },
        _react2.default.createElement(_header2.default, null),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: (0, _authChecker2.default)(_home2.default, true, this.props.clients) }),
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: (0, _authChecker2.default)(_login2.default, true, this.props.clients) }),
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/signup', component: (0, _authChecker2.default)(_signup2.default, true, this.props.clients) })
        )
      );
    }
  }]);

  return Offline;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Offline);