'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _reactActioncableProvider = require('react-actioncable-provider');

var _reactActioncableProvider2 = _interopRequireDefault(_reactActioncableProvider);

var _header = require('./common/header');

var _header2 = _interopRequireDefault(_header);

var _root = require('../common/root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * OBL Main App Container
 **/
var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      token: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.clients.ApiClient.getToken();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.location && (props.location.pathname === '/logout' || this.props.location.pathname === '/logout')) {
        var self = this;
        this.props.clients.ApiClient.logout(function (data) {
          self.props.history.push("/");
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { id: 'main-container', className: "wrapper" },
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { path: '/dashboard', render: function render() {
              return _react2.default.createElement(_header2.default, { menu: _this2.props.navigation.dashboard.menu, root: _this2.props.navigation.dashboard.root, custom: _this2.props.navigation.dashboard.header, location: _this2.props.location, name: 'dashboard', mainTitle: _this2.props.config.mainTitle });
            } }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/admin', render: function render() {
              return _react2.default.createElement(_header2.default, { menu: _this2.props.navigation.admin.menu, root: _this2.props.navigation.admin.root, custom: _this2.props.navigation.admin.header, location: _this2.props.location, admin: true, name: 'admin', mainTitle: _this2.props.config.mainTitle });
            } }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/', render: function render() {
              return _react2.default.createElement(_header2.default, { menu: false ? _this2.props.navigation.dashboard.menu : _this2.props.navigation.offline.menu, root: _this2.props.navigation.offline.root, custom: _this2.props.navigation.offline.header, location: _this2.props.location, token: _this2.props.token, name: 'offline', mainTitle: _this2.props.config.mainTitle });
            } })
        ),
        this.props.token && (this.props.config.websocket || this.props.config.websocket == undefined) ? _react2.default.createElement(
          _reactActioncableProvider2.default,
          { url: process.env.CABLE_URL + "/?token=" + this.props.token.access_token },
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { path: '/dashboard', component: (0, _root2.default)("dashboard", this.props.navigation.dashboard) }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin', component: (0, _root2.default)("admin", this.props.navigation.admin) }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/', component: (0, _root2.default)("offline", this.props.navigation.offline) })
          )
        ) : _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { path: '/dashboard', component: (0, _root2.default)("dashboard", this.props.navigation.dashboard) }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/admin', component: (0, _root2.default)("admin", this.props.navigation.admin) }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/', component: (0, _root2.default)("offline", this.props.navigation.offline) })
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    token: state.authState.token || null,
    navigation: state.bootstrap.navigation
  };
}

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(App));