'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _showForAcls = require('../utils/show-for-acls');

var _showForAcls2 = _interopRequireDefault(_showForAcls);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {
      logout: false,
      menu: false
    };

    _this.handleLogout = _this.handleLogout.bind(_this);
    _this.handleHamburgerClick = _this.handleHamburgerClick.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.logout) return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
      return _react2.default.createElement(
        'header',
        { id: 'header' },
        _react2.default.createElement(
          _reactBootstrap.Navbar,
          { fixedTop: true, fluid: true },
          _react2.default.createElement(
            _reactBootstrap.Navbar.Header,
            null,
            _react2.default.createElement(
              'div',
              { id: 'mobile-menu' },
              _react2.default.createElement(
                'div',
                { className: "left-nav-toggle" },
                _react2.default.createElement(
                  'a',
                  { href: '#', onClick: this.handleHamburgerClick },
                  _react2.default.createElement('i', { className: "stroke-hamburgermenu" })
                )
              )
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/', className: "navbar-brand" },
              _react2.default.createElement('img', { src: '/assets/images/logo-obl-mini.png', alt: 'Open Business Labs' }),
              ' ',
              _react2.default.createElement(
                'span',
                null,
                'OBL'
              )
            )
          ),
          this.props.showAside ? _react2.default.createElement(
            _reactBootstrap.Navbar.Collapse,
            { id: 'navbar' },
            _react2.default.createElement(
              'div',
              { className: "left-nav-toggle" },
              _react2.default.createElement(
                'a',
                { href: '#', onClick: this.handleHamburgerClick },
                _react2.default.createElement('i', { className: "stroke-hamburgermenu" })
              )
            )
          ) : null
        ),
        this.props.showAside ? _react2.default.createElement(
          'aside',
          { className: "navigation" },
          _react2.default.createElement(
            'nav',
            null,
            _react2.default.createElement(
              'ul',
              { className: "nav luna-nav" },
              this.props.navigation.dashboard.items.map(function (menu) {
                return [_react2.default.createElement(
                  'li',
                  { className: "nav-category" },
                  menu.label
                ), menu.items.map(function (item) {
                  if (item.display === false) return null;
                  var path = "/dashboard" + (item.path && item.path !== "" ? "/" + item.path : "");
                  return _react2.default.createElement(
                    'li',
                    { className: _this2.props.location.pathname === path ? "active" : "" },
                    _react2.default.createElement(
                      _reactRouterDom.NavLink,
                      { exact: true, to: path },
                      item.label
                    )
                  );
                })];
              }),
              _react2.default.createElement(
                _showForAcls2.default,
                { grants: ["admin"] },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactRouterDom.NavLink,
                    { exact: true, to: '/admin' },
                    'Administration'
                  )
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#', onClick: this.handleLogout },
                  'D\xE9connexion'
                )
              )
            )
          )
        ) : null
      );
    }
  }, {
    key: 'handleHamburgerClick',
    value: function handleHamburgerClick(e) {
      e.preventDefault();
      this.setState({ menu: !this.state.menu }, function () {
        if (this.state.menu) {
          document.body.className += " nav-toggle";
        } else {
          document.body.className -= " nav-toggle";
        }
      });
    }
  }, {
    key: 'handleLogout',
    value: function handleLogout(e) {
      e.preventDefault();
      var self = this;
      this.props.clients.ApiClient.logout(function () {
        self.props.history.push("/");
        self.setState({ logout: true });
      });
    }
  }]);

  return Header;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    navigation: state.bootstrap.navigation || { dashboard: { items: [] } }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);