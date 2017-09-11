"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _form = require("../utils/form");

var _form2 = _interopRequireDefault(_form);

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = {
      loggedIn: false,
      error: false
    };

    _this.fields = [{
      name: "email",
      label: "Email",
      title: "Email",
      placeholder: "Email",
      type: "text",
      required: true
    }, {
      name: "password",
      label: "Mot de passe",
      placeholder: "Mot de passe",
      title: "Mot de passe",
      type: "password",
      required: true
    }];

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      if (this.state.loggedIn) return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/dashboard" });
      return _react2.default.createElement(
        _reactBootstrap.Grid,
        { className: "container-center animated slideInDown" },
        _react2.default.createElement(
          _reactBootstrap.Row,
          { className: "view-header" },
          _react2.default.createElement(
            "div",
            { className: "header-icon" },
            _react2.default.createElement("i", { className: "pe page-header-icon pe-7s-unlock" })
          ),
          _react2.default.createElement(
            "div",
            { className: "header-title" },
            _react2.default.createElement(
              "h3",
              null,
              "Login"
            ),
            _react2.default.createElement(
              "small",
              null,
              "Entrez vos identifiants pour vous connecter."
            )
          )
        ),
        this.props.newUser ? _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            "div",
            { className: "alert alert-success", style: { marginTop: 0, display: "flex", alignItems: "center" } },
            _react2.default.createElement("i", { className: "pe pe-7s-door-lock", style: { fontSize: "3em", marginRight: 15 } }),
            "Votre compte a \xE9t\xE9 cr\xE9\xE9, vous pouvez maintenant vous connecter."
          )
        ) : null,
        _react2.default.createElement(
          _reactBootstrap.Panel,
          { className: "panel panel-filled" },
          _react2.default.createElement(_form2.default, { id: "login-form",
            clients: this.props.clients,
            fields: this.fields,
            submitLabel: "Me connecter",
            onSubmit: this.handleSubmit,
            submitClass: "btn btn-accent btn-signup",
            service: { client: this.props.clients.AuthClient, func: "login" },
            onSubmitComplete: this.handleSubmitComplete
          }),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { className: "btn btn-default btn-signup", to: "/signup" },
            "Cr\xE9er un compte"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "text-center small" },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: "/" },
            "Mot de passe oubli\xE9"
          )
        )
      );
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(values) {}
  }, {
    key: "handleSubmitComplete",
    value: function handleSubmitComplete(data) {
      this.setState({ loggedIn: true });
    }
  }]);

  return Login;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    newUser: state.userState.newUser || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Login);