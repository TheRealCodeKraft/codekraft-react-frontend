'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _auth = require('clients/auth');

var _auth2 = _interopRequireDefault(_auth);

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
              { to: '/admin', className: "navbar-brand navbar-admin" },
              _react2.default.createElement('img', { src: '/assets/images/logo-obl-mini.png', alt: 'Open Business Labs' }),
              ' ',
              _react2.default.createElement(
                'span',
                null,
                'OBL'
              )
            )
          ),
          _react2.default.createElement(
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
          )
        ),
        _react2.default.createElement(
          'aside',
          { className: "navigation" },
          _react2.default.createElement(
            'nav',
            null,
            _react2.default.createElement(
              'ul',
              { className: "nav luna-nav" },
              _react2.default.createElement(
                'li',
                { className: "nav-category" },
                'G\xE9n\xE9ral'
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin' },
                  'Tableau de bord admin'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/dashboard' },
                  'Retour au site'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: "nav-category" },
                'Utilisateurs'
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/users" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/users' },
                  'Liste des utilisateurs'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/areas" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/areas' },
                  'Zones g\xE9o.'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/schools" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/schools' },
                  'Ecoles'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/specialities" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/specialities' },
                  'Sp\xE9cialit\xE9s'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: "nav-category" },
                'Jeux'
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/games" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/games' },
                  'Liste des jeux'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/objectives" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/objectives' },
                  'Objectifs'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/scenarios" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/scenarios' },
                  'Scenarii'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/clues" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/clues' },
                  'Indices'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/decision_makers" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/decision_makers' },
                  'D\xE9cideurs'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: "nav-category" },
                'Sessions'
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/sessions" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/sessions' },
                  'Liste des sessions'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: this.props.location.pathname === "/admin/rooms" ? "active" : "" },
                _react2.default.createElement(
                  _reactRouterDom.NavLink,
                  { exact: true, to: '/admin/rooms' },
                  'Salles'
                )
              ),
              _react2.default.createElement(
                'li',
                { className: "nav-category" },
                'D\xE9connexion'
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '#', onClick: this.handleLogout },
                  'Se d\xE9connecter'
                )
              )
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
      _auth2.default.logout();
      this.setState({ logout: true });
    }
  }]);

  return Header;
}(_react2.default.Component);

exports.default = Header;