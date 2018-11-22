"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _exportV = require("./export-v");

var _exportV2 = _interopRequireDefault(_exportV);

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileSaver = require('filesaver.js-npm');

var Export = function (_React$Component) {
	_inherits(Export, _React$Component);

	function Export() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Export);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Export.__proto__ || Object.getPrototypeOf(Export)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			attributes: []
		}, _this.componentWillMount = function () {
			_this.setState({ attributes: (0, _lodash.clone)(_this.props.attributes) });
		}, _this.componentWillReceiveProps = function (props) {
			_this.setState({ attributes: (0, _lodash.clone)(props.attributes) });
		}, _this._handleCheck = function (attr) {
			var attributes = _this.state.attributes;
			var index = attributes.map(function (a) {
				return a.name;
			}).indexOf(attr.name);
			if (index !== -1) {
				attributes.splice(index, 1);
			} else {
				attributes.push(attr);
			}

			attributes.sort(function (attr1, attr2) {
				return _this.props.attributes.map(function (a) {
					return a.name;
				}).indexOf(attr1.name) > _this.props.attributes.map(function (a) {
					return a.name;
				}).indexOf(attr2.name) ? 1 : -1;
			});
			_this.setState({ attributes: attributes });
		}, _this._buildCsv = function () {
			var header = _this.state.attributes.map(function (attr) {
				return attr.name;
			}).join(';') + '\n';
			var values = _this.props.items.map(function (item) {
				return _this.state.attributes.map(function (attr) {
					return attr.csvWrapper ? attr.csvWrapper(item[attr.name]) : attr.wrapper ? attr.wrapper(item[attr.name]) : item[attr.name];
				}).join(";");
			}).join('\n');

			return "" + header + values;
		}, _this._handleDownload = function () {
			FileSaver.saveAs(new Blob([_this._buildCsv()], { type: "csv" }), "export.csv");
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Export, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(_exportV2.default, {
				items: this.props.items,
				csv: this._buildCsv(),
				attributes: this.props.attributes,
				selectedAttributes: this.state.attributes,
				onCheck: this._handleCheck,
				onDownload: this._handleDownload
			});
		}
	}]);

	return Export;
}(_react2.default.Component);

exports.default = Export;