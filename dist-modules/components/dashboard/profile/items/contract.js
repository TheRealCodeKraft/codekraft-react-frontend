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

var Contract = function (_BaseItem) {
  _inherits(Contract, _BaseItem);

  function Contract(props) {
    _classCallCheck(this, Contract);

    var _this = _possibleConstructorReturn(this, (Contract.__proto__ || Object.getPrototypeOf(Contract)).call(this, props));

    _this.label = "CDI Recherché";
    return _this;
  }

  _createClass(Contract, [{
    key: "buildFullContent",
    value: function buildFullContent() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_form2.default, { id: "user-contract-form",
          entityId: this.props.entity.id,
          fields: [{
            name: "contract",
            label: "Vous recherchez un CDI : ",
            type: "switch",
            values: [{ value: true, label: "Oui" }, { value: false, label: "Non" }],
            required: true,
            defaultValue: this.props.entity.contract
          }],
          service: { client: _user2.default, func: "update" },
          onSubmitComplete: this.handleSubmitComplete,
          submitClass: "btn btn-accent"
        })
      );
    }
  }, {
    key: "buildValue",
    value: function buildValue() {
      var value = this.props.entity.contract;
      if (value) value = _react2.default.createElement(
        "mark",
        { className: "mark-green" },
        "Oui"
      );else value = _react2.default.createElement(
        "mark",
        { className: "mark-red" },
        "Non"
      );
      return value;
    }
  }]);

  return Contract;
}(_baseItem2.default);

exports.default = Contract;