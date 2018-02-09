"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require("react-datetime");

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateHourPicker = function (_React$Component) {
  _inherits(DateHourPicker, _React$Component);

  function DateHourPicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateHourPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateHourPicker.__proto__ || Object.getPrototypeOf(DateHourPicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      date: (0, _moment2.default)(),
      minutes: 0,
      hours: 12
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateHourPicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.value) {
        console.log(props.value);
        console.log((0, _moment2.default)(props.value).format("HH"));
        this.setState({ date: props.value, hours: parseInt(props.value.format("HH")), minutes: parseInt(props.value.format("mm")) });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "date-hour-picker" },
        _react2.default.createElement(_reactDatetime2.default, { value: this.state.date.format("DD/MM/YYYY"),
          dateFormat: "DD/MM/YYYY",
          onChange: this.handleDateChange.bind(this)
        }),
        _react2.default.createElement("input", { className: "hours", ref: "hours", onChange: this.handleHoursChange.bind(this), value: this.state.hours.toString().padStart(2, "0") }),
        _react2.default.createElement(
          "span",
          { className: "hour-separator" },
          ":"
        ),
        _react2.default.createElement("input", { className: "minutes", ref: "minutes", onChange: this.handleMinutesChange.bind(this), value: this.state.minutes.toString().padStart(2, "0") })
      );
    }
  }, {
    key: "handleDateChange",
    value: function handleDateChange(date) {
      this.setState({ date: date }, this.onChange);
    }
  }, {
    key: "handleHoursChange",
    value: function handleHoursChange(e) {
      var value = e.target.value;
      if (value == "" || isNaN(value)) value = this.state.hours;
      value = parseInt(value);
      if (value < 0) value = 0;
      if (value > 23) value = 23;
      this.setState({ hours: value }, this.onChange);
    }
  }, {
    key: "handleMinutesChange",
    value: function handleMinutesChange(e) {
      var value = e.target.value;
      if (value == "" || isNaN(value)) value = this.state.minutes;
      value = parseInt(value);
      if (value < 0) value = 0;
      if (value > 59) value = 59;
      this.setState({ minutes: value }, this.onChange);
    }
  }, {
    key: "onChange",
    value: function onChange() {
      if (this.props.onChange) {
        this.props.onChange((0, _moment2.default)(this.state.date.format("MM/DD/YYYY") + " " + this.state.hours.toString().padStart(2, "0") + ":" + this.state.minutes.toString().padStart(2, "0")).format("MM/DD/YYYY HH:mm"));
      }
    }
  }]);

  return DateHourPicker;
}(_react2.default.Component);

exports.default = DateHourPicker;