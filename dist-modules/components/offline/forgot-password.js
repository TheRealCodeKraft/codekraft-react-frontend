'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _form = require('../utils/form');

var _form2 = _interopRequireDefault(_form);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForgotPassword = function (_React$Component) {
  _inherits(ForgotPassword, _React$Component);

  function ForgotPassword(props) {
    _classCallCheck(this, ForgotPassword);

    var _this = _possibleConstructorReturn(this, (ForgotPassword.__proto__ || Object.getPrototypeOf(ForgotPassword)).call(this, props));

    _this.handleSubmitError = function (data) {
      if (_this.props.onSubmitError) {
        _this.props.onSubmitError(data);
      }
    };

    _this.state = {
      found: undefined
    };

    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(ForgotPassword, [{
    key: 'render',
    value: function render() {
      var content = null;
      switch (this.state.found) {
        case undefined:
          content = this.form();
          break;
        case true:
          content = this.found();
          break;
        case false:
          content = [_react2.default.createElement(
            'span',
            null,
            'Aucun compte n\'a \xE9t\xE9 identifi\xE9 avec cette adresse email'
          ), this.form()];
          break;
      }

      return _react2.default.createElement(
        'div',
        null,
        content
      );
    }
  }, {
    key: 'form',
    value: function form() {
      return [_react2.default.createElement(
        _form2.default,
        { id: 'login-form', key: 'login-form',
          clients: this.props.clients,
          fields: [{
            name: "email",
            label: "Email",
            title: "Email",
            placeholder: "Email",
            type: "text",
            required: true
          }],
          submitLabel: 'Envoyer',
          onSubmit: this.handleSubmit,
          onSubmitError: this.handleSubmitError,
          errors: this.props.errors,
          submitClass: "btn btn-accent btn-signup",
          service: { client: this.props.clients.UserClient, func: "forgotPassword" },
          onSubmitComplete: this.handleSubmitComplete
        },
        this.props.children
      ), this.props.showLoseLinks ? [_react2.default.createElement(
        _reactRouterDom.Link,
        { className: "btn btn-default", to: '/login' },
        'J\'ai d\xE9j\xE0 un compte'
      ), _react2.default.createElement(
        _reactRouterDom.Link,
        { className: "btn btn-default", to: '/signup' },
        'Cr\xE9er un compte'
      )] : null];
    }
  }, {
    key: 'found',
    value: function found() {
      return [_react2.default.createElement(
        'span',
        null,
        this.props.sentString || "Yay! Un email vous a été envoyé pour vous permettre de réinitialiser votre mot de passe"
      ), _react2.default.createElement(
        _reactRouterDom.Link,
        { to: '/' },
        'Retour \xE0 la page d\'accueil'
      )];
    }
  }, {
    key: 'handleSubmitComplete',
    value: function handleSubmitComplete(data) {
      if (this.props.onSubmitComplete) {
        this.props.onSubmitComplete(data);
      } else {
        this.setState({ found: data.found });
      }
    }
  }]);

  return ForgotPassword;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    newUser: state.userState.newUser || null,
    passwordUpdated: state.userState.password_updated || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ForgotPassword);