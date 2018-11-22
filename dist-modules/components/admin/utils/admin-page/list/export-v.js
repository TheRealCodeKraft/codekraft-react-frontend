"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var attributes = _ref.attributes,
	    selectedAttributes = _ref.selectedAttributes,
	    items = _ref.items,
	    csv = _ref.csv,
	    onCheck = _ref.onCheck,
	    onDownload = _ref.onDownload;
	return _react2.default.createElement(
		"div",
		{ className: "export" },
		_react2.default.createElement(
			"span",
			{ className: "title" },
			"S\xE9lectionner les colonnes \xE0 exporter"
		),
		_react2.default.createElement(
			"div",
			{ className: "checkers" },
			attributes.map(function (attr) {
				return _react2.default.createElement(
					"div",
					{ className: "attr-checker" },
					_react2.default.createElement("input", {
						type: "checkbox",
						name: attr.name,
						onChange: function onChange(e) {
							onCheck(attr);
						},
						defaultChecked: selectedAttributes.find(function (a) {
							return a.name == attr.name;
						})
					}),
					_react2.default.createElement(
						"label",
						{ key: "label-for-" + attr.name, className: "control-label", htmlFor: attr.name },
						attr.label
					)
				);
			})
		),
		_react2.default.createElement(
			"span",
			{ className: "title" },
			"Visualiser les r\xE9sultats"
		),
		_react2.default.createElement(
			"div",
			{ className: "data-container" },
			_react2.default.createElement(
				"div",
				{ className: "data-table" },
				items.length == 0 ? _react2.default.createElement(
					"div",
					{ className: "no-data" },
					"Aucune donn\xE9e"
				) : [_react2.default.createElement(
					"div",
					{ className: "row header" },
					selectedAttributes.map(function (attr) {
						return _react2.default.createElement(
							"div",
							{ className: "cell" },
							attr.label
						);
					})
				), items.map(function (item) {
					return _react2.default.createElement(
						"div",
						{ className: "row" },
						selectedAttributes.map(function (attr) {
							return _react2.default.createElement(
								"div",
								{ className: "cell" },
								attr.csvWrapper ? attr.csvWrapper(item[attr.name]) : attr.wrapper ? attr.wrapper(item[attr.name]) : item[attr.name]
							);
						})
					);
				})]
			)
		),
		_react2.default.createElement(
			"div",
			{ className: "export-container" },
			_react2.default.createElement(
				"div",
				{ className: "export-action" },
				_react2.default.createElement(
					"span",
					{ className: "title" },
					"Copier/Coller l'export"
				),
				_react2.default.createElement(
					"div",
					{ className: "csv-input-container" },
					_react2.default.createElement("textarea", { row: "10", value: csv, spellcheck: false })
				)
			),
			_react2.default.createElement(
				"div",
				{ className: "export-action" },
				_react2.default.createElement(
					"span",
					{ className: "title" },
					"T\xE9l\xE9charger un fichier"
				),
				_react2.default.createElement(
					"div",
					{ className: "actions" },
					_react2.default.createElement(
						"button",
						{ onClick: onDownload },
						"T\xE9l\xE9charger"
					)
				)
			)
		)
	);
};