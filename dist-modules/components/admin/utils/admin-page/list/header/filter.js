"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
	_inherits(Filter, _React$Component);

	function Filter() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Filter);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), _this), _this._buildComponent = function () {
			var component = _react2.default.createElement("input", { type: _this.props.filter.type, onChange: _this._handleChange });
			switch (_this.props.filter.type) {
				case "select":
					console.log(_this.props.filter.values);
					component = _react2.default.createElement(
						"select",
						{ onChange: _this._handleChange },
						_react2.default.createElement(
							"option",
							{ value: -1 },
							_this.props.filter.placeholder
						),
						_this.props.filter.values.map(function (v) {
							return _react2.default.createElement(
								"option",
								{ value: v[_this.props.filter.key] },
								v[_this.props.filter.value]
							);
						})
					);
			}
			return component;
		}, _this._handleChange = function (e) {
			_this.props.onChange(_this.props.filter, e.target.value);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Filter, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "admin-list-filter-container" },
				_react2.default.createElement(
					"span",
					{ className: "filter-identifier" },
					this.props.filter.label || this.props.attribute.label
				),
				this._buildComponent()
			);
		}
	}]);

	return Filter;
}(_react2.default.Component);

exports.default = Filter;