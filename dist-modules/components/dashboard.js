"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _authChecker = require("./utils/auth-checker");

var _authChecker2 = _interopRequireDefault(_authChecker);

var _header = require("./common/header");

var _header2 = _interopRequireDefault(_header);

var _home = require("./dashboard/home");

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Dashboard, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var self = this;
      this.props.clients.UserClient.me(function (me) {
        if (!me.error) {
          self.setState({ me: me });
        }
      });

      var groups = this.props.navigation.dashboard.menu;
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
        { className: "dashboard" },
        React.createElement(_header2.default, { location: this.props.location,
          menu: this.props.navigation.dashboard.menu,
          root: "/dashboard" }),
        this.state.me && this.state.me.firstname === null ? React.createElement(
          "span",
          null,
          "Profile filler"
        ) : React.createElement(
          _reactRouter.Switch,
          null,
          this.state.pages.map(function (item) {
            if (item.component) {
              var route = "/dashboard" + (item.route && item.route !== "" ? "/" + item.route : "");
              return React.createElement(_reactRouter.Route, { exact: true, path: route, component: (0, _authChecker2.default)(item.component) });
            } else {
              return null;
            }
          })
        )
      );
    }
  }]);

  return Dashboard;
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || { dashboard: { items: [] } }
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Dashboard);