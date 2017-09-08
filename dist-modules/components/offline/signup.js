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

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

    _this.fields = [{
      name: "firstname",
      title: "Entrez votre prénom",
      label: "Prénom",
      placeholder: "Prénom",
      type: "text",
      required: true
    }, {
      name: "lastname",
      label: "Nom",
      title: "Entrez votre nom",
      placeholder: "Nom",
      type: "text",
      required: true
    }, {
      name: "email",
      label: "Email",
      title: "Entrez votre email",
      placeholder: "Email",
      type: "email",
      required: true
    }, {
      name: "pseudo",
      label: "Pseudo",
      title: "Choississez un pseudo",
      placeholder: "Pseudo",
      type: "text",
      required: true
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
    }, {
      name: "cgu",
      label: "J'accepte les condition générales d'utilisation",
      title: "J'accepte les condition générales d'utilisation",
      type: "checkbox",
      required: true,
      wanted: true,
      inputClass: "checkbox",
      className: "test"
    }];

    _this.state = {
      submitted: false
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    _this.resetForm = _this.resetForm.bind(_this);
    return _this;
  }

  _createClass(Signup, [{
    key: "render",
    value: function render() {
      if (this.state.submitted) {
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "span",
            null,
            "Inscription R\xE9ussi"
          ),
          _react2.default.createElement(
            "p",
            null,
            "Votre inscription a bien \xE9t\xE9 prise en compte. Vous pouvez maintenant acc\xE9der \xE0 votre compte en vous connectant gr\xE2ce au formulaire disponible ",
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: "/login" },
              "ICI"
            )
          ),
          _react2.default.createElement(
            "p",
            null,
            "Si vous souhaitez proc\xE9der \xE0 une autre inscription, cliquez ",
            _react2.default.createElement(
              "a",
              { href: "#", onClick: this.resetForm },
              "LA"
            )
          )
        );
      } else {
        return _react2.default.createElement(
          _reactBootstrap.Grid,
          { className: "container-center animated slideInDown" },
          _react2.default.createElement(
            _reactBootstrap.Row,
            { className: "view-header" },
            _react2.default.createElement(
              "div",
              { className: "header-icon" },
              _react2.default.createElement("i", { className: "page-header-icon pe pe-7s-user" })
            ),
            _react2.default.createElement(
              "div",
              { className: "header-title" },
              _react2.default.createElement(
                "h3",
                null,
                "Cr\xE9er un compte"
              ),
              _react2.default.createElement(
                "small",
                null,
                "Entrez les infos suivantes pour cr\xE9er votre compte Open Business Labs."
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { className: "panel panel-filled" },
            _react2.default.createElement(_form2.default, { id: "signup-form",
              fields: this.fields,
              submitLabel: "M'enregistrer",
              submitClass: "btn btn-accent btn-signup",
              onSubmit: this.handleSubmit,
              service: { client: this.props.clients.UserClient, func: "signup" },
              onSubmitComplete: this.handleSubmitComplete,
              onSubmitError: this.handleSubmitError
            })
          )
        );
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(values) {}
  }, {
    key: "handleSubmitComplete",
    value: function handleSubmitComplete(data) {
      this.setState({ submitted: true });
    }
  }, {
    key: "handleSubmitError",
    value: function handleSubmitError(data) {
      console.log("submit error !");
    }
  }, {
    key: "resetForm",
    value: function resetForm(e) {
      e.preventDefault();
      this.setState({ submitted: false });
    }
  }]);

  return Signup;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Signup);