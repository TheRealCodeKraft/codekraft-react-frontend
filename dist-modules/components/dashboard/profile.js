"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _fullname = require("./profile/items/fullname");

var _fullname2 = _interopRequireDefault(_fullname);

var _email = require("./profile/items/email");

var _email2 = _interopRequireDefault(_email);

var _pseudo = require("./profile/items/pseudo");

var _pseudo2 = _interopRequireDefault(_pseudo);

var _password = require("./profile/items/password");

var _password2 = _interopRequireDefault(_password);

var _traineeship = require("./profile/items/traineeship");

var _traineeship2 = _interopRequireDefault(_traineeship);

var _contract = require("./profile/items/contract");

var _contract2 = _interopRequireDefault(_contract);

var _mobility = require("./profile/items/mobility");

var _mobility2 = _interopRequireDefault(_mobility);

var _school = require("./profile/items/school");

var _school2 = _interopRequireDefault(_school);

var _specialities = require("./profile/items/specialities");

var _specialities2 = _interopRequireDefault(_specialities);

var _personality = require("./profile/items/personality");

var _personality2 = _interopRequireDefault(_personality);

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moment = require("moment");

var Profile = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
  }

  _createClass(Profile, [{
    key: "render",
    value: function render() {
      var me = this.props.me;

      return _react2.default.createElement(
        "section",
        { className: "content" },
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
                "h1",
                null,
                _react2.default.createElement("i", { className: "pe pe-7s-user text-warning" }),
                " Profil"
              )
            )
          ),
          me !== null ? [_react2.default.createElement(_fullname2.default, { key: "profile-fullname", entity: me, value: me.firstname + " " + me.lastname }), _react2.default.createElement(_email2.default, { key: "profile-email", entity: me, value: me.email }), _react2.default.createElement(_pseudo2.default, { key: "profile-pseudo", entity: me, value: me.pseudo }), _react2.default.createElement(_password2.default, { key: "profile-password", entity: me, value: "Modifiez votre mot de passe" }), _react2.default.createElement(_traineeship2.default, { key: "profile-traineeship", entity: me, value: this.getTraineeshipLabel() }), _react2.default.createElement(_contract2.default, { key: "profile-contract", entity: me, value: me.contract ? "Oui" : "Non" }), _react2.default.createElement(_mobility2.default, { key: "profile-mobility", entity: me, value: this.getItemList(me.areas) }), _react2.default.createElement(_school2.default, { key: "profile-school", entity: me, value: me.school ? me.school.name : "Aucune" }), _react2.default.createElement(_specialities2.default, { key: "profile-specialities", entity: me, value: this.getItemList(me.specialities) }), _react2.default.createElement(_personality2.default, { key: "profile-personality", entity: me })] : null
        )
      );
    }
  }, {
    key: "getTraineeshipLabel",
    value: function getTraineeshipLabel() {
      if (this.props.me.traineeship) {
        var tsString = null;
        if (this.props.me.traineeship_start_ts !== null && this.props.me.traineeship_end_ts !== null) {
          tsString = "Du " + moment(this.props.me.traineeship_start_ts).format("DD/MM/YYYY") + " au " + moment(this.props.me.traineeship_end_ts).format("DD/MM/YYYY");
        } else if (this.props.me.traineeship_start_ts !== null) {
          tsString = "A partir du " + moment(this.props.me.traineeship_start_ts).format("DD/MM/YYYY");
        }
        return "Oui" + (tsString ? " > " + tsString : "");
      } else return "Non";
    }
  }, {
    key: "getItemList",
    value: function getItemList(list) {
      var values = "";
      var items = list.sort(function (a, b) {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      });
      for (var index in items) {
        values += items[index].name;
        if (index < items.length - 1) values += ", ";
      }
      return values;
    }
  }]);

  return Profile;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Profile);