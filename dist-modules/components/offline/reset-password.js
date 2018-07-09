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

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResetPassword = function (_React$Component) {
  _inherits(ResetPassword, _React$Component);

  function ResetPassword(props) {
    _classCallCheck(this, ResetPassword);

    var _this = _possibleConstructorReturn(this, (ResetPassword.__proto__ || Object.getPrototypeOf(ResetPassword)).call(this, props));

    _this.state = {};

    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(ResetPassword, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.location.search.indexOf("email") !== -1 && this.props.location.search.indexOf("key") !== -1) {
        var splitted = this.props.location.search.replace("?", "").split("&");
        var emailSplit = splitted[0].split("=");
        var stampSplit = splitted[1].split("=");
        this.setState({ email: emailSplit[1], stamp: stampSplit[1] }, function () {
          this.props.clients.UserClient.checkStamp({ email: emailSplit[1], stamp: stampSplit[1] });
        });
      } else {
        this.props.history.push("/");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.stamp) {
        return _react2.default.createElement(
          'span',
          null,
          'Recherche de votre compte'
        );
      } else if (!this.props.stamp.found || !this.props.stamp.stamp_ok || !this.props.stamp.stamp_expiration_ok) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            null,
            'Nous n\'avons pas r\xE9ussi \xE0 vous authentifier'
          ),
          !this.props.stamp.stamp_expiration_ok ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              'Le lien que vous avez utilis\xE9 \xE0 expir\xE9, il n\'est valable que 2 jours.'
            ),
            _react2.default.createElement(
              'span',
              null,
              'Cliquer ',
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/forgot-password' },
                'ici'
              ),
              ' pour recevoir un nouveau mail de r\xE9initialisation de mot de passe'
            )
          ) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              'Le lien que vous avez utilis\xE9 est peut-\xEAtre trop ancien.'
            ),
            _react2.default.createElement(
              'span',
              null,
              'Cliquer ',
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/forgot-password' },
                'ici'
              ),
              ' pour recevoir un nouveau mail de r\xE9initialisation de mot de passe'
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            null,
            'Vous pouvez maintenant r\xE9initialiser votre mot de passe'
          ),
          _react2.default.createElement(_form2.default, { id: 'reset-form',
            clients: this.props.clients,
            entityId: this.props.stamp.user_id,
            fields: [{
              name: "email",
              type: "hidden",
              defaultValue: this.state.email
            }, {
              name: "stamp",
              type: "hidden",
              defaultValue: this.state.stamp
            }, {
              name: "password",
              label: "Mot de passe",
              title: "Entrez votre mot de passe",
              placeholder: "Mot de passe",
              type: "password",
              required: true
            }, {
              name: "password_confirm",
              label: "Confirmation du mot de passe",
              title: "Confirmation du mot de passe",
              placeholder: "Confirmation du mot de passe",
              type: "password",
              required: true,
              confirmFor: "password"
            }],
            submitLabel: 'Envoyer',
            onSubmit: this.handleSubmit,
            submitClass: "btn btn-accent btn-signup",
            service: { client: this.props.clients.UserClient, func: "updatePassword" },
            onSubmitComplete: this.handleSubmitComplete
          })
        );
      }
    }
  }, {
    key: 'handleSubmitComplete',
    value: function handleSubmitComplete(data) {
      this.props.history.push("/login");
    }
  }]);

  return ResetPassword;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    stamp: state.userState.stamp || null,
    password_updated: state.userState.password_updated || undefined
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactRouter.withRouter)(ResetPassword));