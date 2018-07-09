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
      return React.createElement(
        "div",
        null,
        React.createElement(_form2.default, { id: "signup-form",
          labels: this.props.labels,
          fields: this.fields,
          submitLabel: "M'enregistrer",
          submitClass: this.props.submitClass ? this.props.submitClass : "btn btn-accent btn-signup",
          onSubmit: this.handleSubmit,
          service: { client: this.props.clients.UserClient, func: "signup" },
          onSubmitComplete: this.handleSubmitComplete,
          onSubmitError: this.handleSubmitError
        }),
        this.props.showLoseLinks !== false ? [React.createElement(
          _reactRouterDom.Link,
          { className: "btn btn-default", to: "/login" },
          "J'ai d\xE9j\xE0 un compte"
        ), React.createElement(
          _reactRouterDom.Link,
          { to: "/forgot-password" },
          "Mot de passe oubli\xE9"
        )] : null
      );
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(values) {
      this.setState({ values: values });
    }
  }, {
    key: "handleSubmitComplete",
    value: function handleSubmitComplete(data) {
      if (this.props.onSignedIn) {
        this.props.onSignedIn(this.state.values, data);
      } else {
        this.props.history.push("/login");
      }
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
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Signup);