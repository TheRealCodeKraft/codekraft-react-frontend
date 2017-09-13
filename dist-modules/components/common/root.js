"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (config) {
  var Root = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root(props) {
      _classCallCheck(this, Root);

      var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(Root, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var self = this;
        this.props.clients.UserClient.me(function (me) {
          if (!me.error) {
            self.setState({ me: me });
          }
        });

        var groups = config.menu;
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
          config.header ? React.createElement(config.header, null) : React.createElement(_header2.default, { menu: config.menu,
            root: config.root }),
          React.createElement(
            "section",
            { className: "content" },
            this.state.me && this.state.me.temp ? this.buildProfileFiller() : React.createElement(
              _reactRouter.Switch,
              null,
              this.state.pages.map(function (item) {
                var url = config.root + (item.route && item.route !== "" ? (config.root !== "/" ? "/" : "") + item.route : "");
                var component = null;
                if (item.component) {
                  component = item.component;
                } else if (item.client) {
                  component = (0, _adminPage2.default)(item);
                }

                console.dir(component);
                if (component) {

                  if (config.grants) {
                    component = (0, _checkForAcls2.default)(config.grants, component);
                  }

                  if (config.restricted && !item.discardOnLogin) {
                    component = (0, _authChecker2.default)(component);
                  }

                  if (item.discardOnLogin) {
                    component = (0, _authChecker2.default)(component, true);
                  }
                  console.log(url);
                  console.dir(component);

                  return React.createElement(_reactRouter.Route, { key: url, exact: true, path: url, component: component });
                } else {
                  return null;
                }
              })
            )
          )
        );
      }
    }, {
      key: "buildProfileFiller",
      value: function buildProfileFiller() {
        var Component = config.profileFiller;
        if (Component) {
          return React.createElement(Component, null);
        } else {
          return React.createElement(_profileFiller2.default, null);
        }
      }
    }]);

    return Root;
  }(React.Component);

  return (0, _reactRedux.connect)(mapStateToProps)(Root);
};

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _authChecker = require("../utils/auth-checker");

var _authChecker2 = _interopRequireDefault(_authChecker);

var _checkForAcls = require("../utils/check-for-acls");

var _checkForAcls2 = _interopRequireDefault(_checkForAcls);

var _header = require("./header");

var _header2 = _interopRequireDefault(_header);

var _profileFiller = require("../common/profile-filler");

var _profileFiller2 = _interopRequireDefault(_profileFiller);

var _adminPage = require("../admin/utils/admin-page");

var _adminPage2 = _interopRequireDefault(_adminPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");


function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || { dashboard: { items: [] } }
  };
}