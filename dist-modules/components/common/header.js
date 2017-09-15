'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

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

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      if (this.props.custom !== undefined) {
        if (this.props.custom !== null) {
          return React.createElement(this.props.custom, { menu: this.props.menu, root: this.props.root });
        } else return null;
      }

      var menu_entries = [],
          menu_entry,
          menu,
          item,
          route;
      for (var key in this.props.menu) {
        menu = this.props.menu[key];
        if (menu.label) {
          menu_entries.push(React.createElement(
            'li',
            { className: "nav-category" },
            menu.label
          ));
        }
        for (var index in menu.items) {
          item = menu.items[index];
          if (item.display !== false) {
            if (item.type) {
              switch (item.type) {
                case "logout":
                  route = "/logout";
                  break;
              }
            } else if (item.root === true) {
              route = this.props.root;
            } else if (item.switch) {
              route = item.switch;
            } else {
              route = this.props.root + (item.route ? (this.props.root !== "/" ? "/" : "") + item.route : "");
            }

            menu_entry = React.createElement(
              _reactRouterDom.NavLink,
              { exact: true, to: route, className: "Menu-link" + (this.props.location.pathname === route ? " Menu-link--active" : "") },
              item.title
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
        'div',
        { className: 'Menu' },
        React.createElement(
          'div',
          { className: 'Menu-logo' },
          React.createElement('img', { src: '/assets/img/logo-skeleton.png', alt: 'CodeKraft Skeleton logo' })
        ),
        React.createElement(
          'div',
          { className: 'Menu-links' },
          menu_entries
        )
      );
    }
  }]);

  return Header;
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  };
}

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(Header));