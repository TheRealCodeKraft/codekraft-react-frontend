'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

var _showForAcls = require('../utils/show-for-acls');

var _showForAcls2 = _interopRequireDefault(_showForAcls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

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
      if (this.state.logout) return React.createElement(_reactRouterDom.Redirect, { to: '/' });

      var menu_entries = [],
          menu_entry,
          menu,
          item,
          route;
      for (var key in this.props.menu) {
        menu = this.props.menu[key];
        menu_entries.push(React.createElement(
          'li',
          { className: "nav-category" },
          menu.label
        ));
        for (var index in menu.items) {
          item = menu.items[index];
          if (item.display !== false) {
            if (item.type) {
              switch (item.type) {
                case "logout":
                  route = "/logout";
                  break;
                case "dashboard":
                  route = "/dashboard";
                  break;
                case "admin":
                  route = "/admin";
                  break;
              }
            } else {
              route = this.props.root + (item.route ? "/" + item.route : "");
            }

            menu_entry = React.createElement(
              'li',
              { className: this.props.location.pathname === route ? "active" : "" },
              React.createElement(
                _reactRouterDom.NavLink,
                { exact: true, to: route },
                item.title
              )
            );

            if (item.grants) {
              menu_entry = React.createElement(
                _showForAcls2.default,
                { grants: item.grants },
                menu_entry
              );
            }
            menu_entries.push(menu_entry);
          }
        }
      }

      return React.createElement(
        'header',
        { id: 'header' },
        React.createElement(
          _reactBootstrap.Navbar,
          { fixedTop: true, fluid: true },
          React.createElement(
            _reactBootstrap.Navbar.Header,
            null,
            React.createElement(
              'div',
              { id: 'mobile-menu' },
              React.createElement(
                'div',
                { className: "left-nav-toggle" },
                React.createElement(
                  'a',
                  { href: '#', onClick: this.handleHamburgerClick },
                  React.createElement('i', { className: "stroke-hamburgermenu" })
                )
              )
            ),
            React.createElement(
              _reactRouterDom.Link,
              { to: this.props.root, className: "navbar-brand navbar-admin" },
              React.createElement('img', { src: '/assets/images/logo-obl-mini.png', alt: 'Open Business Labs' }),
              ' ',
              React.createElement(
                'span',
                null,
                'OBL'
              )
            )
          ),
          React.createElement(
            _reactBootstrap.Navbar.Collapse,
            { id: 'navbar' },
            React.createElement(
              'div',
              { className: "left-nav-toggle" },
              React.createElement(
                'a',
                { href: '#', onClick: this.handleHamburgerClick },
                React.createElement('i', { className: "stroke-hamburgermenu" })
              )
            )
          )
        ),
        React.createElement(
          'aside',
          { className: "navigation", style: { height: "auto" } },
          React.createElement(
            'nav',
            null,
            React.createElement(
              'ul',
              { className: "nav luna-nav" },
              menu_entries
            )
          )
        )
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
      this.props.clients.ApiClient.logout();
      this.setState({ logout: true });
    }
  }]);

  return Header;
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);