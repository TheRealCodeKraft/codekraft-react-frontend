"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _filters = require("./list/header/filters");

var _filters2 = _interopRequireDefault(_filters);

var _header = require("./list/header");

var _header2 = _interopRequireDefault(_header);

var _row = require("./list/row");

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var AdminPageList = function (_React$Component) {
	_inherits(AdminPageList, _React$Component);

	function AdminPageList(props) {
		_classCallCheck(this, AdminPageList);

		var _this = _possibleConstructorReturn(this, (AdminPageList.__proto__ || Object.getPrototypeOf(AdminPageList)).call(this, props));

		_this.handleDelete = _this.handleDelete.bind(_this);
		_this.handleSee = _this.handleSee.bind(_this);
		_this.handleEdit = _this.handleEdit.bind(_this);
		_this.handleCustomAction = _this.handleCustomAction.bind(_this);
		return _this;
	}

	_createClass(AdminPageList, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var rows = null;
			if (this.props.loading) {
				rows = [];
				rows.push(React.createElement(
					"div",
					{ className: "admin-list-row" },
					React.createElement(
						"div",
						{ className: "admin-list-cell" },
						React.createElement("div", { className: "loader-dots" })
					)
				));
			} else if (this.props.items) {
				rows = this.props.items.map(function (item, index) {
					return React.createElement(_row2.default, {
						key: "admin-list-row-" + index,
						index: index,
						item: item,
						attributes: _this2.props.attributes,
						actions: _this2.props.actions,
						form: _this2.props.form,
						onDelete: _this2.handleDelete,
						onSee: _this2.handleSee,
						onEdit: _this2.handleEdit,
						onCustomAction: _this2.handleCustomAction,
						config: _this2.props.config
					});
				});
			}

			return React.createElement(
				"div",
				{ className: "admin-list" },
				this.props.filters ? React.createElement(_filters2.default, {
					filters: this.props.filters,
					attributes: this.props.attributes,
					onApply: this.props.onApplyFilters
				}) : null,
				React.createElement(_header2.default, {
					attributes: this.props.attributes,
					onSort: this.props.onSort
				}),
				React.createElement(
					"div",
					{ className: "admin-list-body" },
					rows
				)
			);
		}
	}, {
		key: "handleDelete",
		value: function handleDelete(id) {
			if (this.props.onDelete) this.props.onDelete(id);
		}
	}, {
		key: "handleSee",
		value: function handleSee(id) {
			if (this.props.onSee) this.props.onSee(id);
		}
	}, {
		key: "handleEdit",
		value: function handleEdit(id) {
			if (this.props.onEdit) this.props.onEdit(id);
		}
	}, {
		key: "handleCustomAction",
		value: function handleCustomAction(id, action) {
			if (this.props.onCustomAction) this.props.onCustomAction(id, action);
		}
	}]);

	return AdminPageList;
}(React.Component);

exports.default = AdminPageList;