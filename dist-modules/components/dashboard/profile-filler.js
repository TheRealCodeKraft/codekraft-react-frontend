'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _auth = require('clients/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('clients/user');

var _user2 = _interopRequireDefault(_user);

var _authChecker = require('components/utils/auth-checker');

var _authChecker2 = _interopRequireDefault(_authChecker);

var _reactBootstrap = require('react-bootstrap');

var _form = require('components/utils/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      return _react2.default.createElement(
        'section',
        { className: 'content' },
        _react2.default.createElement(
          _reactBootstrap.Grid,
          { fluid: true },
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12 },
              _react2.default.createElement(
                'h1',
                null,
                'Bienvenue sur Open Business Labs !'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Avant de participer \xE0 votre session de jeu, veuillez compl\xE9ter votre profile en remplissant le formulaire suivant : '
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12 },
              _react2.default.createElement(_form2.default, { id: 'profile-filler-form',
                entityId: this.props.me.id,
                fields: this.fields,
                submitLabel: 'M\'enregistrer',
                submitClass: "btn btn-accent btn-signup",
                cancelButton: true,
                onSubmit: this.handleSubmit,
                service: { client: _user2.default, func: "update" },
                onCancel: this.handleCancel,
                onSubmitComplete: this.handleSubmitComplete,
                onSubmitError: this.handleSubmitError
              })
            )
          )
        )
      );
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      _auth2.default.logout();
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
}(_react2.default.Component);

exports.default = (0, _reactRouter.withRouter)(ProfileFiller);