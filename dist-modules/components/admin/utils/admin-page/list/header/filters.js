"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _filter = require("./filter");

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filters = function (_React$Component) {
	_inherits(Filters, _React$Component);

	function Filters() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Filters);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filters.__proto__ || Object.getPrototypeOf(Filters)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._handleChange = function (target, value) {
			var state = _this.state;
			if (value == "" || !value) {
				if (state[target]) {
					delete state[target];
				}
			} else {
				state[target] = value;
			}
			_this.setState(state);
		}, _this._handleFilter = function () {
			_this.props.onApply(_this.state);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Filters, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ className: "admin-list-header-filters" },
				this.props.filters.map(function (filter) {
					return _react2.default.createElement(_filter2.default, {
						attribute: _this2.props.attributes.find(function (a) {
							return a.name == filter.name;
						}),
						filter: filter,
						onChange: _this2._handleChange
					});
				}),
				_react2.default.createElement(
					"button",
					{ onClick: this._handleFilter },
					"Apply"
				)
			);
		}
	}]);

	return Filters;
}(_react2.default.Component);

exports.default = Filters;