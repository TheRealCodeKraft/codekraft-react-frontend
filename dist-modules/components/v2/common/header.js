'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

var _header = require('../../common/header');

var _header2 = _interopRequireDefault(_header);

var _showForAcls = require('../../utils/show-for-acls');

var _showForAcls2 = _interopRequireDefault(_showForAcls);

var _link = require('./header/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var Header = function (_BaseHeader) {
  _inherits(Header, _BaseHeader);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {
      sideMenuOpen: true
    };

    _this.handleShowSideMenu = _this.handleShowSideMenu.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var menu_entries = this.buildItemsFor("default");
      var side_menu_entries = this.buildItemsFor("side");

      return React.createElement(
        'div',
        { className: "header " + this.props.name + (this.state.sideMenuOpen ? " side-menu-toggle" : "") },
        React.createElement(
          'header',
          { id: 'mu-header', className: '', role: 'banner' },
          React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
              'nav',
              { className: 'navbar navbar-default mu-navbar' },
              React.createElement(
                'div',
                { className: 'container-fluid' },
                React.createElement(
                  'div',
                  { className: 'navbar-header' },
                  React.createElement(
                    'button',
                    { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1', 'aria-expanded': 'false' },
                    React.createElement(
                      'span',
                      { className: 'sr-only' },
                      'Toggle navigation'
                    ),
                    React.createElement('span', { className: 'icon-bar' }),
                    React.createElement('span', { className: 'icon-bar' }),
                    React.createElement('span', { className: 'icon-bar' })
                  ),
                  React.createElement(
                    'div',
                    { className: 'side-menu-admin' },
                    React.createElement(
                      'button',
                      { type: 'button', onClick: this.handleShowSideMenu },
                      React.createElement('i', { className: "fa fa-chevron-" + (this.state.sideMenuOpen ? "left" : "down") })
                    ),
                    React.createElement(
                      'ul',
                      { className: 'side-menu' },
                      side_menu_entries
                    )
                  ),
                  React.createElement(
                    _reactRouterDom.Link,
                    { className: 'navbar-brand', to: '/' },
                    React.createElement('i', { className: 'fa fa-plus-circle', 'aria-hidden': 'true' }),
                    '\xA0',
                    this.props.mainTitle ? this.props.mainTitle : "CodeKraft Boiler"
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
                  React.createElement(
                    'ul',
                    { className: 'nav navbar-nav mu-menu navbar-right' },
                    menu_entries
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          'section',
          { id: 'mu-hero' },
          React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col-md-6 col-sm-6 col-sm-push-6' },
                React.createElement('div', { className: 'mu-hero-right', style: { marginTop: 0 } })
              ),
              React.createElement(
                'div',
                { className: 'col-md-6 col-sm-6 col-sm-pull-6' },
                React.createElement(
                  'div',
                  { className: 'mu-hero-left' },
                  React.createElement(
                    'h2',
                    null,
                    React.createElement('i', { className: 'fa fa-chevron-right' }),
                    ' ',
                    this.props.name
                  )
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'buildItem',
    value: function buildItem(nav, item, route) {
      return React.createElement(_link2.default, { item: item, pathname: this.props.location.pathname, route: route, active: this.props.location.pathname === route });
    }
  }, {
    key: 'handleShowSideMenu',
    value: function handleShowSideMenu() {
      this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
    }
  }]);

  return Header;
}(_header2.default);

exports.default = Header;