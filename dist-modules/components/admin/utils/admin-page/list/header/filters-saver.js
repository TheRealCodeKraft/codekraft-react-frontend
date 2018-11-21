"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _codekraftReactFrontend = require("codekraft-react-frontend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FiltersSaver = function (_React$Component) {
	_inherits(FiltersSaver, _React$Component);

	function FiltersSaver() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, FiltersSaver);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FiltersSaver.__proto__ || Object.getPrototypeOf(FiltersSaver)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			current: null
		}, _this.componentWillMount = function () {
			_this.setState({ current: _this.props.current });
		}, _this._handleSubmitComplete = function (data) {
			_this.props.onSaved(data);
		}, _this._handleSubmitError = function (error) {}, _this._handleCancel = function () {
			_this.setState({ current: null });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(FiltersSaver, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ className: "filters-saver" },
				this.state.current ? _react2.default.createElement(
					"div",
					{ className: "alter-message" },
					"Voulez-vous mettre \xE0 jour le filtre ",
					_react2.default.createElement(
						"strong",
						null,
						this.state.current.name
					),
					" en cours d'utilisation ?"
				) : null,
				_react2.default.createElement(_codekraftReactFrontend.Form, {
					fields: [{
						name: "name",
						label: "Nom du filtre",
						type: this.state.current ? "hidden" : "text"
					}, {
						name: "category",
						type: "hidden"
					}, {
						name: "content",
						type: "hidden"
					}],
					entityId: this.state.current ? this.state.current.id : undefined,
					onSubmitComplete: this._handleSubmitComplete,
					onSubmitError: this._handleSubmitError,
					onCancel: this._handleCancel,
					cancelButton: this.state.current !== null,
					submitLabel: this.state.current ? "Oui" : "Enregistrer",
					cancelLabel: "Non",
					values: {
						name: this.state.current ? this.state.current.name : "",
						category: this.props.category,
						content: JSON.stringify(this.props.filters)
					},
					service: { client: this.props.clients.FilterClient, func: this.state.current ? "update" : "create" }
				}),
				_react2.default.createElement(
					"div",
					{ className: "filters-description" },
					Object.keys(this.props.filters).map(function (key) {
						var value;
						var attr = _this2.props.attributes.find(function (a) {
							return a.name == key;
						});
						if (!attr && _this2.props.filters[key] instanceof Object) {
							return Object.keys(_this2.props.filters[key]).map(function (subkey) {
								attr = _this2.props.attributes.find(function (a) {
									return a.name == key + "[" + subkey + "]";
								});
								value = _this2.props.filters[key][subkey];
								if (_this2.props.namedFilters[attr.name]) {
									value = _this2.props.namedFilters[attr.name];
								}
								return _react2.default.createElement(
									"div",
									{ className: "filter-description" },
									_react2.default.createElement(
										"span",
										{ className: "filter-label" },
										attr.label
									),
									_react2.default.createElement(
										"span",
										{ className: "filter-value" },
										value == true ? "OUI" : value
									)
								);
							});
						} else {
							value = _this2.props.filters[key];
							if (_this2.props.namedFilters[attr.name]) {
								value = _this2.props.namedFilters[attr.name];
							}
							return _react2.default.createElement(
								"div",
								{ className: "filter-description" },
								attr.label,
								" ",
								attr.filterViewer ? attr.filterViewer(value) : value
							);
						}
					})
				)
			);
		}
	}]);

	return FiltersSaver;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		clients: state.bootstrap.clients
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FiltersSaver);