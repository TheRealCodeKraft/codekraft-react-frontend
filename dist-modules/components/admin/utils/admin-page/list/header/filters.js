"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _filter = require("./filter");

var _filter2 = _interopRequireDefault(_filter);

var _reactRedux = require("react-redux");

var _codekraftReactFrontend = require("codekraft-react-frontend");

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filters.__proto__ || Object.getPrototypeOf(Filters)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			open: false,
			filters: {},
			current: null
		}, _this.componentWillMount = function () {
			if (_this.props.savable) {
				_this.props.clients.FilterClient.fetchAll({ category: _this.props.category });
			}
			if (_this.props.currentFilter) {
				_this.setState({ current: _this.props.currentFilter });
			}
		}, _this.componentWillReceiveProps = function (props) {
			if (props.currentFilter) {
				_this.setState({ current: props.currentFilter });
			}
		}, _this._handleFilter = function () {
			_this.refs.form.getWrappedInstance().submit({}, function (filters) {
				_this.setState({ filters: _this._clean(filters) }, function () {
					_this.props.onApply(_this.state.filters);
				});
			});
		}, _this._handleSave = function () {
			if (_this.props.onSave) {
				_this.refs.form.getWrappedInstance().submit({}, function (filters) {
					filters = _this._clean(filters);
					_this.props.onSave(filters, _this._getFilterLabels(filters), _this.state.current);
				});
			}
		}, _this._getFilterLabels = function (filters) {
			var labels = {},
			    attr;
			Object.keys(filters).forEach(function (key) {
				if (filters[key] instanceof Object) {
					Object.keys(filters[key]).forEach(function (subkey) {
						attr = _this.props.filters.find(function (f) {
							return f.name == key + "[" + subkey + "]";
						});
						if (attr && attr.values) {
							labels[attr.name] = _this.refs.form.getWrappedInstance().getLoadedData()[attr.name].find(function (v) {
								return v[attr.key] == filters[key][subkey];
							})[attr.value];
						}
					});
				} else {
					attr = _this.props.filters.find(function (f) {
						return f.name == key;
					});
					if (attr && attr.values) {
						labels[attr.name] = _this.refs.form.getWrappedInstance().getLoadedData()[attr.name].find(function (v) {
							return v[attr.key] == filters[key];
						})[attr.value];
					}
				}
			});
			return labels;
		}, _this._clean = function (filters) {
			var result = {};
			Object.keys(filters).forEach(function (key) {
				if (filters[key] instanceof Object) {
					result[key] = _this._clean(filters[key]);
					if (Object.keys(result[key]).length == 0) {
						delete result[key];
					}
				} else if (filters[key] !== undefined && filters[key] !== null && filters[key] !== -1 && filters[key] !== "" && filters[key] !== false && filters[key] !== -1 && filters[key] !== "-1") {
					result[key] = filters[key];
				}
			});
			return result;
		}, _this._handleFilterLoaded = function (e) {
			var filter = _this.props.availableFilters.find(function (f) {
				return f.id == e.target.value;
			});
			_this.setState({ current: filter, filters: filter ? filter.content : {}, force: guid() }, function () {
				if (filter) {
					_this.props.onApply(filter.content);
				}
			});
		}, _this._handleToggleFilters = function (e) {
			e.preventDefault();
			_this.setState({ open: !_this.state.open });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Filters, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "admin-list-header-filters" },
				_react2.default.createElement(
					"div",
					{ className: "filters-header" },
					_react2.default.createElement(
						"span",
						{ className: "filters-header-title" },
						"Filtres"
					),
					this.props.savable ? _react2.default.createElement(
						"select",
						{ onChange: this._handleFilterLoaded, value: this.state.current ? this.state.current.id : "-1" },
						_react2.default.createElement(
							"option",
							{ value: "-1" },
							"S\xE9lectionnez un filtre"
						),
						this.props.availableFilters.map(function (filter) {
							return _react2.default.createElement(
								"option",
								{ value: filter.id },
								filter.name
							);
						})
					) : null,
					_react2.default.createElement(
						"a",
						{ href: "javascript:void(0)", onClick: this._handleToggleFilters },
						"Toggle"
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "filters-content " + (this.state.open ? "open" : "") },
					_react2.default.createElement(_codekraftReactFrontend.Form, {
						ref: "form",
						fields: this.props.filters,
						forceReload: true,
						values: this.state.filters,
						hideSubmit: true
					}),
					_react2.default.createElement(
						"button",
						{ onClick: this._handleFilter },
						"Appliquer"
					),
					this.props.savable ? _react2.default.createElement(
						"button",
						{ onClick: this._handleSave },
						"Enregistrer"
					) : null
				)
			);
		}
	}]);

	return Filters;
}(_react2.default.Component);

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var mapStateToProps = function mapStateToProps(state) {
	return {
		clients: state.bootstrap.clients,
		availableFilters: state.filterState.filters || []
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Filters);