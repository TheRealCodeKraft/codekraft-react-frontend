"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _form = require("../utils/form");

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.handleSubmitError = function (data) {
      if (_this.props.onSubmitError) {
        _this.props.onSubmitError(data);
      }
    };

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
      if (this.state.loggedIn) return React.createElement(_reactRouterDom.Redirect, { to: "/" });
      return React.createElement(
        "div",
        null,
        this.props.newUser ? React.createElement(
          "div",
          { className: "alert alert-success", style: { marginTop: 0, display: "flex", alignItems: "center" } },
          React.createElement("i", { className: "pe pe-7s-door-lock", style: { fontSize: "3em", marginRight: 15 } }),
          "Votre compte a \xE9t\xE9 cr\xE9\xE9, vous pouvez maintenant vous connecter."
        ) : null,
        this.props.passwordUpdated ? React.createElement(
          "div",
          { className: "alert alert-success", style: { marginTop: 0, display: "flex", alignItems: "center" } },
          React.createElement("i", { className: "pe pe-7s-door-lock", style: { fontSize: "3em", marginRight: 15 } }),
          "Votre mot de passe a bien \xE9t\xE9 modifi\xE9, vous pouvez maintenant vous connecter"
        ) : null,
        React.createElement(
          _form2.default,
          { id: "login-form",
            labels: this.props.labels,
            clients: this.props.clients,
            fields: this.fields,
            submitLabel: this.props.submitLabel ? this.props.submitLabel : "Me connecter",
            className: this.props.className,
            onSubmit: this.handleSubmit,
            onSubmitError: this.handleSubmitError,
            errors: this.props.errors,
            submitClass: this.props.submitClass ? this.props.submitClass : "btn btn-accent btn-signup",
            service: { client: this.props.clients.ApiClient, func: "login" },
            onSubmitComplete: this.handleSubmitComplete
          },
          this.props.children
        ),
        this.props.showLoseLinks !== false ? [React.createElement(
          _reactRouterDom.Link,
          { key: "signup-button", className: "btn btn-default", to: "/signup" },
          "Cr\xE9er un compte"
        ), React.createElement(
          _reactRouterDom.Link,
          { key: "forgot-password-button", to: "/forgot-password" },
          "Mot de passe oubli\xE9"
        )] : null
      );
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(values) {}
  }, {
    key: "handleSubmitComplete",
    value: function handleSubmitComplete(data) {
      if (this.props.onLoggedIn) this.props.onLoggedIn();else {
        this.setState({ loggedIn: true });
      }
    }
  }]);

  return Login;
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    newUser: state.userState.newUser || null,
    passwordUpdated: state.userState.password_updated || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Login);