"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _authChecker = require("./utils/auth-checker");

var _authChecker2 = _interopRequireDefault(_authChecker);

var _checkForAcls = require("./utils/check-for-acls");

var _checkForAcls2 = _interopRequireDefault(_checkForAcls);

var _header = require("./common/header");

var _header2 = _interopRequireDefault(_header);

var _home = require("./admin/home");

var _home2 = _interopRequireDefault(_home);

var _adminPage = require("./admin/utils/admin-page");

var _adminPage2 = _interopRequireDefault(_adminPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var Admin = function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin(props) {
    _classCallCheck(this, Admin);

    return _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).call(this, props));
  }

  _createClass(Admin, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var groups = this.props.navigation.admin.menu;
      var pages = [],
          pageIndex = 0;
      for (var index in groups) {
        for (var pIndex in groups[index].items) {
          pages.push(groups[index].items[pIndex]);
          if (!(pages[pageIndex].client instanceof Object)) {
            pages[pageIndex].client = this.props.clients[pages[pageIndex].client];
          }
          pageIndex++;
        }
      }
      this.setState({ pages: pages });
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        null,
        React.createElement(_header2.default, { menu: this.props.navigation.admin.menu,
          root: "/admin" }),
        React.createElement(
          "section",
          { className: "content" },
          React.createElement(
            _reactRouter.Switch,
            null,
            React.createElement(_reactRouter.Route, { exact: true, path: "/admin", component: (0, _authChecker2.default)((0, _checkForAcls2.default)(["admin"], _home2.default)) }),
            this.state.pages.map(function (page) {
              if (page.client) {
                return React.createElement(_reactRouter.Route, { key: page.route, exact: true, path: "/admin/" + page.route, component: (0, _authChecker2.default)((0, _checkForAcls2.default)(["admin"], (0, _adminPage2.default)(page))) });
              } else {
                if (page.component) {
                  return React.createElement(_reactRouter.Route, { key: page.route, exact: true, path: "/admin/" + page.route, component: (0, _authChecker2.default)(checkForAcls(["admin"], page.component)) });
                } else {
                  return null;
                }
              }
            })
          )
        )
      );
    }
  }]);

  return Admin;
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || { admin: { items: [] } }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Admin);