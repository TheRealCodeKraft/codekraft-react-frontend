"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reactBootstrap = require("react-bootstrap");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {

      var groups = [];
      for (var key in this.props.navigation.admin.menu) {
        groups.push(this.props.navigation.admin.menu[key]);
      }
      return React.createElement(
        _reactBootstrap.Grid,
        { fluid: true },
        groups.map(function (group) {
          console.dir(group);
          return [React.createElement(
            _reactBootstrap.Row,
            null,
            React.createElement(
              _reactBootstrap.Col,
              { xs: 12 },
              React.createElement(
                "h1",
                null,
                React.createElement("i", { className: "pe pe-7s-tools text-warning" }),
                " ",
                group.label
              )
            )
          ), React.createElement(
            _reactBootstrap.Row,
            null,
            group.items.map(function (item) {
              return React.createElement(
                _reactBootstrap.Col,
                { md: 6, lg: 4 },
                React.createElement(
                  _reactRouterDom.Link,
                  { to: "/admin/" + item.route, className: "panel-home-student" },
                  React.createElement(
                    _reactBootstrap.Panel,
                    { className: "panel-filled" },
                    React.createElement(
                      "h2",
                      null,
                      React.createElement("i", { className: "pe-7s-" + (item.icon ? item.icon : "pin") + " pe-3x pe-va text-warning" }),
                      " ",
                      item.title
                    ),
                    React.createElement(
                      "div",
                      null,
                      item.description ? item.description : ""
                    )
                  )
                )
              );
            })
          )];
        })
      );
    }
  }]);

  return Home;
}(React.Component);

function mapStateToProps(state) {
  return {
    navigation: state.bootstrap.navigation
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);