'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _link = require('./header/link');

var _link2 = _interopRequireDefault(_link);

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
      menu: false,
      dynItems: {}
    };

    _this.handleHamburgerClick = _this.handleHamburgerClick.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {

      if (this.props.custom !== undefined) {
        if (this.props.custom !== null) {
          return React.createElement(this.props.custom, { menu: this.props.menu, root: this.props.root, admin: this.props.admin, location: this.props.location, token: this.props.token, name: this.props.name });
        } else return null;
      }

      var default_menu_entries = this.buildItemsFor("default");
      default_menu_entries = this.embedSandwich(default_menu_entries);
      var side_menu_entries = this.buildItemsFor("side");

      return React.createElement(
        'div',
        { className: 'Menu' },
        React.createElement(
          'div',
          { className: 'Menu-logo' },
          React.createElement('div', { className: 'logo-img' }),
          React.createElement(
            'div',
            { className: 'Side-Menu' },
            side_menu_entries
          )
        ),
        React.createElement(
          'div',
          { className: 'Menu-links' },
          default_menu_entries
        )
      );
    }
  }, {
    key: 'buildItemsFor',
    value: function buildItemsFor(navKey) {
      var nav = this.props.menu[navKey];
      var menu_entries = [];
      if (nav) {
        var menu_entry, menu, item, route;
        if (nav.label) {
          menu_entries.push(React.createElement(
            'li',
            { className: "nav-category" },
            nav.label
          ));
        }
        var items = nav.items;
        for (var index in items) {
          item = items[index];
          if (item.display !== false && !(this.props.token && item.discardOnLogin || !this.props.token && item.onlyOnLogin)) {
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
              route = (item.route[0] !== "/" ? this.props.root : "") + (item.route ? (item.route[0] !== "/" && this.props.root !== "/" ? "/" : "") + item.route : "");
            }

            menu_entry = this.buildItem(nav, item, route);

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
      return menu_entries;
    }
  }, {
    key: 'buildItem',
    value: function buildItem(nav, item, route) {
      var LinkComponent = nav.navLink ? nav.navLink : _link2.default;
      var className;
      if (nav.linkClassName) {
        className = nav.linkClassName;
      } else {
        className = "Menu-link" + (this.props.location.pathname === route ? " Menu-link--active" : "") + (item.faIcon ? " fa fa-" + item.faIcon : "");
      }
      if (nav.linkComponent) {
        return React.createElement(nav.linkComponent, { item: item, pathname: this.props.location.pathname, route: route, active: this.props.location.pathname === route });
      } else {
        return React.createElement(LinkComponent, { item: item, pathname: this.props.location.pathname, route: route, className: className });
      }
    }
  }, {
    key: 'embedSandwich',
    value: function embedSandwich(items) {
      items = [React.createElement('a', { href: '#', onClick: this.handleHamburgerClick, className: 'Menu-link toggle-sidebar fa fa-bars' })].concat(items);
      if (!this.state.menu) {
        items = [React.createElement('div', { className: 'logo-img menu-logo' })].concat(items);
      }
      return items;
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
  }]);

  return Header;
}(React.Component);

exports.default = Header;