'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _authChecker = require('../utils/auth-checker');

var _authChecker2 = _interopRequireDefault(_authChecker);

var _form = require('../utils/form');

var _form2 = _interopRequireDefault(_form);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var ProfileFiller = function (_React$Component) {
  _inherits(ProfileFiller, _React$Component);

  function ProfileFiller(props) {
    _classCallCheck(this, ProfileFiller);

    var _this = _possibleConstructorReturn(this, (ProfileFiller.__proto__ || Object.getPrototypeOf(ProfileFiller)).call(this, props));

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
    }, {
      name: "temp",
      type: "hidden",
      defaultValue: false
    }];

    _this.state = {
      submitted: false
    };

    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(ProfileFiller, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        _reactBootstrap.Grid,
        { fluid: true },
        React.createElement(
          _reactBootstrap.Row,
          null,
          React.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            React.createElement(
              'h1',
              null,
              'Bienvenue sur Open Business Labs !'
            ),
            React.createElement(
              'p',
              null,
              'Avant de participer \xE0 votre session de jeu, veuillez compl\xE9ter votre profile en remplissant le formulaire suivant : '
            )
          )
        ),
        React.createElement(
          _reactBootstrap.Row,
          null,
          React.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            React.createElement(_form2.default, { id: 'profile-filler-form',
              entityId: this.props.me.id,
              fields: this.fields,
              submitLabel: 'M\'enregistrer',
              submitClass: "btn btn-accent btn-signup",
              cancelButton: true,
              onSubmit: this.handleSubmit,
              service: { client: this.props.clients.UserClient, func: "update" },
              onCancel: this.handleCancel,
              onSubmitComplete: this.handleSubmitComplete,
              onSubmitError: this.handleSubmitError
            })
          )
        )
      );
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.props.clients.ApiClient.logout();
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(values) {}
  }, {
    key: 'handleSubmitComplete',
    value: function handleSubmitComplete(data) {
      this.setState({ submitted: true }, function () {
        this.props.history.push("/");
      });
    }
  }, {
    key: 'handleSubmitError',
    value: function handleSubmitError(data) {
      console.log("submit error !");
    }
  }]);

  return ProfileFiller;
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    me: state.userState.me
  };
}

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(ProfileFiller));