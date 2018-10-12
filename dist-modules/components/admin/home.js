"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

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

      if (groups.filter(function (group) {
        return group.hiddenOnHome === true;
      }).length === groups.length) {
        return React.createElement(
          "section",
          { className: "Example" },
          React.createElement(
            "h1",
            null,
            "Bienvenue dans l'administration !"
          ),
          React.createElement(
            "p",
            null,
            "Vous n'avez aucun entit\xE9 encore configur\xE9e dans votre application"
          ),
          React.createElement(
            "p",
            null,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla tortor. Fusce laoreet dolor at blandit placerat. Quisque a venenatis turpis. Sed a turpis magna. Aliquam imperdiet sollicitudin nulla, a sagittis est bibendum varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum sed lectus a arcu dignissim cursus."
          )
        );
      }

      return React.createElement(
        "section",
        { className: "admin-home" },
        groups.map(function (group, index) {
          if (group.hiddenOnHome) return null;
          return React.createElement(
            "div",
            { className: "admin-home-group", key: "admin-home-group-" + index },
            group.label ? React.createElement(
              "h1",
              null,
              group.label
            ) : null,
            React.createElement(
              "div",
              { className: "admin-home-group-items" },
              group.items.filter(function (item) {
                return item.display !== false;
              }).map(function (item, index) {
                return [React.createElement(
                  _reactRouterDom.Link,
                  { to: "/admin/" + item.route },
                  React.createElement(
                    "div",
                    { className: "admin-home-item", key: "admin-home-item-" + index },
                    React.createElement(
                      "h2",
                      null,
                      item.title
                    ),
                    React.createElement(
                      "p",
                      null,
                      item.description ? item.description : ""
                    )
                  )
                )];
              })
            )
          );
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