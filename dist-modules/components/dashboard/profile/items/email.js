"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _user = require("clients/user");

var _user2 = _interopRequireDefault(_user);

var _baseItem = require("../base-item");

var _baseItem2 = _interopRequireDefault(_baseItem);

var _form = require("components/utils/form");

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Email = function (_BaseItem) {
  _inherits(Email, _BaseItem);

  function Email(props) {
    _classCallCheck(this, Email);

    var _this = _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, props));

    _this.label = "Email";
    return _this;
  }

  _createClass(Email, [{
    key: "buildFullContent",
    value: function buildFullContent() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_form2.default, { id: "user-email-form",
          entityId: this.props.entity.id,
          fields: [{
            name: "email",
            label: "Modifier votre email",
            placeholder: "Email",
            type: "email",
            required: true,
            defaultValue: this.props.entity.email
          }],
          service: { client: _user2.default, func: "update" },
          onSubmitComplete: this.handleSubmitComplete,
          submitClass: "btn btn-accent"
        })
      );
    }
  }]);

  return Email;
}(_baseItem2.default);

exports.default = Email;