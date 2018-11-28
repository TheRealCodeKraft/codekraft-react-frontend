"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var AdminPageListHeader = function (_React$Component) {
	_inherits(AdminPageListHeader, _React$Component);

	function AdminPageListHeader() {
		_classCallCheck(this, AdminPageListHeader);

		return _possibleConstructorReturn(this, (AdminPageListHeader.__proto__ || Object.getPrototypeOf(AdminPageListHeader)).apply(this, arguments));
	}

	_createClass(AdminPageListHeader, [{
		key: "render",
		value: function render() {
			var header = [],
			    attribute,
			    label = undefined,
			    name = undefined,
			    sortable = true;
			if (this.props.bulkable) {
				header.push(React.createElement(
					"div",
					null,
					React.createElement("input", { type: "checkbox", checked: this.props.allSelected, onChange: this.props.onSelectAll })
				));
			}
			for (var attrIndex in this.props.attributes) {
				attribute = this.props.attributes[attrIndex];
				if (attribute instanceof Object) {
					if (attribute.hidden) continue;
					name = attribute.name;
					sortable = attribute.sortable !== undefined ? attribute.sortable : true;
					label = attribute.label;
				} else {
					label = attribute;
				}

				header.push(React.createElement(
					"div",
					{ key: "header-row-attr-" + attrIndex },
					label,
					sortable ? React.createElement(
						"div",
						{ className: "sort-container" },
						React.createElement(
							"a",
							{ key: "sort-" + attrIndex + "-up", href: "javascript:void(0)", onClick: this._handleSort.bind(this, name, "up") },
							React.createElement("i", { className: "fa fa-sort-up" })
						),
						React.createElement(
							"a",
							{ key: "sort-" + attrIndex + "-down", href: "javascript:void(0)", onClick: this._handleSort.bind(this, name, "down") },
							React.createElement("i", { className: "fa fa-sort-down" })
						)
					) : null
				));
			}
			header.push(React.createElement("div", { key: "header-row-attr-actions admin-list-header-actions" }));

			return React.createElement(
				"div",
				{ className: "admin-list-header" },
				header
			);
		}
	}, {
		key: "_handleSort",
		value: function _handleSort(target, type) {
			if (this.props.onSort) this.props.onSort(target, type);
		}
	}]);

	return AdminPageListHeader;
}(React.Component);

exports.default = AdminPageListHeader;