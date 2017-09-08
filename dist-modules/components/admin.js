"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _authChecker = require("./utils/auth-checker");

var _authChecker2 = _interopRequireDefault(_authChecker);

var _checkForAcls = require("components/utils/auth/check-for-acls");

var _checkForAcls2 = _interopRequireDefault(_checkForAcls);

var _header = require("./admin/header");

var _header2 = _interopRequireDefault(_header);

var _home = require("./admin/home");

var _home2 = _interopRequireDefault(_home);

var _adminConfig = require("config/admin-config");

var _adminConfig2 = _interopRequireDefault(_adminConfig);

var _adminPage = require("./admin/utils/admin-page");

var _adminPage2 = _interopRequireDefault(_adminPage);

var _clients = require("clients");

var Clients = _interopRequireWildcard(_clients);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Admin = function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin(props) {
    _classCallCheck(this, Admin);

    var _this = _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).call(this, props));

    _this.pages = _adminConfig2.default;
    return _this;
  }

  _createClass(Admin, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      for (var index in this.pages) {
        if (!(this.pages[index].client instanceof Object)) {
          this.pages[index].client = Clients[this.pages[index].client];
        }
      }
    }
  }, {
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_header2.default, { location: this.props.location }),
        _react2.default.createElement(
          "section",
          { className: "content" },
          _react2.default.createElement(
            _reactRouter.Switch,
            null,
            _react2.default.createElement(_reactRouter.Route, { exact: true, path: "/admin", component: (0, _authChecker2.default)((0, _checkForAcls2.default)(["admin"], _home2.default)) }),
            this.pages.map(function (page) {
              return _react2.default.createElement(_reactRouter.Route, { key: page.route, exact: true, path: page.route, component: (0, _authChecker2.default)((0, _checkForAcls2.default)(["admin"], (0, _adminPage2.default)(page))) });
            })
          )
        )
      );
    }
  }]);

  return Admin;
}(_react2.default.Component);

exports.default = Admin;