"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require("react-redux");

var _reactBootstrapSwitch = require("react-bootstrap-switch");

var _reactBootstrapSwitch2 = _interopRequireDefault(_reactBootstrapSwitch);

var _reactDatetime = require("react-datetime");

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _listSelector = require("./form/list-selector");

var _listSelector2 = _interopRequireDefault(_listSelector);

var _wysiwyg = require("./form/wysiwyg");

var _wysiwyg2 = _interopRequireDefault(_wysiwyg);

var _reactFileInput = require("react-file-input");

var _reactFileInput2 = _interopRequireDefault(_reactFileInput);

var _multipleUpload = require("./form/multiple-upload");

var _multipleUpload2 = _interopRequireDefault(_multipleUpload);

var _dateHourPicker = require("./form/date-hour-picker");

var _dateHourPicker2 = _interopRequireDefault(_dateHourPicker);

var _rcSlider = require("rc-slider");

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _reactColor = require("react-color");

var _draftJsExportHtml = require("draft-js-export-html");

var _draftJs = require("draft-js");

var _reactLoaders = require("react-loaders");

var _reactLoaders2 = _interopRequireDefault(_reactLoaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");


var m = require("moment");
var moment = m.parseZone;

var Form = function (_React$Component) {
	_inherits(Form, _React$Component);

	function Form(props) {
		_classCallCheck(this, Form);

		var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

		_this._getFields = function (fields) {
			if (!fields) fields = _this.props.fields;
			var fields = _this.props.fields.filter(function (f) {
				return !f.group;
			});
			_this.props.fields.filter(function (f) {
				return f.group;
			}).forEach(function (group) {
				fields = fields.concat(group.items);
			});
			return fields;
		};

		_this.getValues = function () {
			return _this.state.values;
		};

		_this.getLoadedData = function () {
			return _this.state.loadedData;
		};

		_this.state = {
			errors: _this.props.errors || {},
			submitting: false,
			submitError: undefined,
			submitClass: {},
			values: {},
			loadingData: [],
			loadedData: {},
			uploading: {}
		};

		_this.handleCancelButton = _this.handleCancelButton.bind(_this);
		_this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
		_this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
		_this.handleFormSubmitted = _this.handleFormSubmitted.bind(_this);
		return _this;
	}

	_createClass(Form, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			var field = undefined,
			    loadingData = [],
			    loadedData = [];
			var fields = this._getFields();
			for (var index in fields) {
				field = fields[index];
				if (field.values && field.values.targetState !== undefined) {
					// Hook to reload data if paginated data already loaded
					if (this.props.reduxState[field.values.targetState][field.values.targetValue] && !this.props.reduxState[field.values.targetState][field.values.targetValue].pagination) {
						loadedData[field.name] = this.props.reduxState[field.values.targetState][field.values.targetValue];
					} else {
						this.props.clients[field.values.client][field.values.func](field.values.func == "fetchAll" ? { all: true } : {}, null, field.values.offline || false);
						loadingData.push(field);
					}
				}
			}

			if (loadingData.length > 0) {
				this.setState({ loadingData: loadingData, loadedData: loadedData });
			} else {
				if (this.props.onLoaded) this.props.onLoaded();
				this.setState({ loadedData: loadedData }, function () {
					this.loadValuesState();
				});
			}

			var self = this;
			window.onbeforeunload = function () {
				if (self.state.uploading) {
					var uploading = false;
					for (var index in self.state.uploading) {
						if (self.state.uploading[index] === true) {
							uploading = true;
						}
					}
					if (uploading) {
						return "Un upload de fichier est en cours. Êtes-vous sûr de vouloir quitter cette fenêtre ?";
					}
				}
			};
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(props) {
			if (this.state.loadingData.length > 0) {
				var loadingData = [],
				    loadedData = this.state.loadedData;
				var current = undefined;
				for (var index in this.state.loadingData) {
					current = this.state.loadingData[index];
					if (props.reduxState[current.values.targetState][current.values.targetValue] && !props.reduxState[current.values.targetState][current.values.targetValue].pagination) {
						loadedData[current.name] = props.reduxState[current.values.targetState][current.values.targetValue];
					} else {
						loadingData.push(current);
					}
				}
				if (loadingData.length === 0) {
					if (this.props.onLoaded) this.props.onLoaded();
				}
				this.setState({ loadingData: loadingData, loadedData: loadedData }, function () {
					if (this.state.loadingData.length === 0) {
						this.loadValuesState();
					}
				});
			} else if (this.props.entityId !== props.entityId || props.forceReload) {
				this.loadValuesState(props);
			}
		}
	}, {
		key: "loadValuesState",
		value: function loadValuesState() {
			var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

			if (!props) props = this.props;
			var valuesState = {};
			var currentValue = undefined,
			    currentHtmlValue = undefined;

			var fields = this._getFields(props.fields);

			for (var index in fields) {
				if (props.values) {
					if (fields[index].name.indexOf("[") !== -1) {
						var splitted = fields[index].name.split('[');
						if (props.values[splitted[0]]) {
							if (splitted.length === 2) {
								currentValue = props.values[splitted[0]][splitted[1].replace(']', '')];
							} else {
								currentValue = props.values[splitted[0]][splitted[1].replace(']', '')][splitted[2].replace(']', '')];
							}
						} else {
							currentValue = undefined;
						}
					} else if (fields[index].type == "wysiwyg") {
						currentValue = props.values[fields[index].name + "_raw"];
						if (currentValue && !(currentValue instanceof Object) && !(currentValue == "")) {
							currentValue = JSON.parse(currentValue);
						}
						currentHtmlValue = props.values[fields[index].name + "_html"];
					} else {
						currentValue = props.values[fields[index].name];
					}
					if (currentValue instanceof Array && !fields[index].component && fields[index].type !== "multiple-upload") {
						currentValue = currentValue.map(function (value) {
							return value.id;
						});
					}
				} else {
					currentValue = fields[index].defaultValue;
				}

				if (fields[index].type == "checkbox" && !currentValue) {
					currentValue = false;
				}

				if (fields[index].type == "wysiwyg") {
					valuesState[fields[index].name + "_raw"] = currentValue;
					valuesState[fields[index].name + "_html"] = currentHtmlValue;
				} else {
					valuesState[fields[index].name] = currentValue;
				}
			}

			this.setState({ values: valuesState });
		}
	}, {
		key: "render",
		value: function render() {
			var wrapper = this.props.wrapper || function (children) {
				return children;
			};
			var submitButton = this.state.submitting ? React.createElement("div", { className: "loader-dots" }) : this.props.hideSubmit !== true ? [React.createElement(
				"button",
				{ key: this.props.id + "-button", type: "submit", className: this.props.submitClass },
				this.props.submitLabel !== undefined ? this.props.submitLabel : "Enregistrer"
			), this.props.cancelButton === true ? React.createElement(
				"button",
				{ key: this.props.id + "-cancel", className: this.props.cancelClass || this.props.submitClass, onClick: this.handleCancelButton },
				this.props.cancelLabel || "Ignorer"
			) : null] : null;

			return React.createElement(
				"div",
				{ className: "form-container " + (this.props.className ? this.props.className : "") },
				this.props.entityId ? this.buildImageUploaders() : null,
				React.createElement(
					"form",
					{ encType: "multipart/form-data", id: this.props.id, onSubmit: this.handleFormSubmit, className: this.props.className },
					wrapper(this.getInputs(this.props.fields)),
					this.state.submitError ? [React.createElement(
						"span",
						{ className: "submit-error" },
						this.state.submitError
					), React.createElement("br", null)] : null,
					this.props.submitLabel !== "none" ? React.createElement(
						"div",
						{ className: "submit-container" },
						submitButton
					) : null,
					this.props.children
				),
				this.state.loadingData.length > 0 ? React.createElement(
					"div",
					{ className: "form-loader" },
					this.props.loadingComponent ? React.createElement(this.props.loadingComponent, null) : React.createElement(_reactLoaders2.default, { type: "ball-pulse" })
				) : null
			);
		}
	}, {
		key: "buildImageUploaders",
		value: function buildImageUploaders() {
			var _this2 = this;

			return this._getFields().filter(function (field) {
				return field.type === "image-uploader";
			}).map(function (field) {
				return React.createElement(
					"form",
					{ key: _this2.props.id + "-" + field.name + "-image-uploader", encType: "multipart/form-data", className: "upload-form" },
					field.label ? React.createElement(
						"span",
						null,
						field.label
					) : null,
					field.showImage === undefined || field.showImage ? React.createElement("img", { src: _this2.state.values[field.name], className: "img-rounded", style: { width: 100 }, alt: _this2.state.values[field.name] }) : null,
					field.showFileName && field.fileNameKey ? React.createElement(
						"span",
						null,
						_this2.state.values[field.fileNameKey] ? _this2.state.values[field.fileNameKey] : "Aucun fichier"
					) : null,
					_this2.state.uploading[field.name] ? React.createElement(
						"span",
						_defineProperty({ className: "upload-file-name" }, "className", "uploading-file"),
						"T\xE9l\xE9chargement en cours"
					) : React.createElement(
						"div",
						{ className: "upload-file" },
						React.createElement(_reactFileInput2.default, { name: "sheet",
							accept: field.accept !== undefined ? field.accept : ".png",
							placeholder: "Cliquer ici pour choisir un fichier",
							className: "form-control",
							onChange: _this2.handleFileChange.bind(_this2, field) })
					)
				);
			});
		}
	}, {
		key: "handleFileChange",
		value: function handleFileChange(field, e) {
			var file = e.target.files[0];
			var uploading = this.state.uploading;
			uploading[field.name] = true;
			this.setState({ uploading: uploading }, function () {
				this.props.service.client.upload(this.props.entityId, field.name, file, this.handleFileChanged.bind(this, field));
			});
		}
	}, {
		key: "handleFileChanged",
		value: function handleFileChanged(field, data) {
			var uploading = this.state.uploading;
			uploading[field.name] = false;
			this.setState({ uploading: uploading }, function () {
				if (this.props.onUploadFinished) this.props.onUploadFinished(field, data);
			});
		}
	}, {
		key: "getInputs",
		value: function getInputs(fields) {
			var _this3 = this;

			var groups = fields.filter(function (f) {
				return f.group;
			}).map(function (group) {
				return React.createElement(
					"div",
					{ className: "form-group" },
					React.createElement(
						"span",
						{ className: "form-group-title" },
						group.label
					),
					React.createElement(
						"div",
						{ className: "form-group-items" },
						_this3.getInputs(group.items)
					)
				);
			});
			var singles = fields.filter(function (f) {
				return !f.group;
			}).map(function (field) {
				return _this3.getInput(field);
			});
			return groups.concat(singles);
		}
	}, {
		key: "getInput",
		value: function getInput(field) {
			var _this4 = this;

			if (field.show === false) {
				return null;
			}
			if (field.type === "image-uploader") {
				return null;
			}

			if (field.displayIf && this.state.values[field.displayIf.name] !== field.displayIf.value) {
				return null;
			}

			var input = null,
			    value = this.state.values[field.name],
			    options = [];
			var fieldName = field.name;

			switch (field.type) {
				case "checkbox":
					input = React.createElement("input", { key: this.props.id + "-checkbox-" + fieldName, id: field.name, className: field.inputClass, title: field.title, name: fieldName, type: field.type, defaultChecked: value, placeholder: field.placeholder, onChange: this.handleInputChange.bind(this, field) });
					break;
				case "radio":
					var radios = [];
					if (field.values) {
						var val = undefined;
						var radioId = undefined;
						for (var index in field.values) {
							val = field.values[index];
							radioId = this.props.id + "-" + field.name + "-" + index;
							radios.push(React.createElement("input", { key: radioId, id: radioId, title: field.title, name: fieldName, type: field.type, value: val.value, onChange: this.handleInputChange.bind(this, field), checked: value === val.value ? "checked" : "" }));
							radios.push(React.createElement(
								"label",
								{ key: radioId + "_label", htmlFor: radioId },
								val.label
							));
						}
					}
					input = radios;
					break;
				case "switch":
					input = React.createElement(_reactBootstrapSwitch2.default, { title: field.title, name: fieldName, onChange: this.handleInputChange.bind(this, field, !this.state.values[field.name]), onText: "OUI", offText: "NON", value: value, defaultValue: field.defaultValue, bsSize: "mini" });
					break;
				case "slider":
					input = field.range ? React.createElement(_rcSlider.Range, { onChange: this.handleInputChange.bind(this, field) }) : React.createElement(_rcSlider2.default, { step: field.step, onChange: this.handleInputChange.bind(this, field), value: this.state.values[field.name] });
					if (field.subComponent) {
						input = React.createElement(
							"div",
							{ key: this.props.id + "-slider-" + fieldName, className: "slider-with-component" },
							input,
							React.createElement(field.subComponent, { value: this.state.values[field.name] })
						);
					}
					break;
				case "select":
					if (field.values instanceof Array) {
						options = field.values;
					} else if (field.values instanceof Object) {
						options = this.state.loadedData[field.name] || [];
					}

					if (field.dependant) {
						options = options.filter(function (o) {
							return o[field.dependant] == _this4.state.values[field.dependant];
						});
					}

					input = React.createElement(
						"select",
						{ key: this.props.id + "-select-" + fieldName, className: "form-control", title: field.title, name: fieldName, onChange: this.handleInputChange.bind(this, field), value: value || '' },
						field.placeholder ? React.createElement(
							"option",
							{ value: "-1" },
							field.placeholder
						) : null,
						options.map(function (val, index) {
							return React.createElement(
								"option",
								{ key: "select-option-for-" + field.name + "-" + index, value: val[field.key] },
								val[field.value]
							);
						})
					);
					break;
				case "list-selector":
					if (field.values instanceof Array) {
						options = field.values;
					} else if (field.values instanceof Object) {
						options = this.state.loadedData[field.name] || [];
					}
					input = React.createElement(_listSelector2.default, { key: this.props.id + "-list-selector-" + field.name, className: "form-control", field: field, defaultValue: value, options: options, tags: field.tags ? field.tags : false, onChange: this.handleInputChange.bind(this, field) });
					break;
				case "textarea":
					if (value == null) value = "";
					input = React.createElement("textarea", { key: this.props.id + "-textarea-" + field.name, className: "form-control", title: field.title, name: fieldName, value: value, placeholder: field.placeholder, onChange: this.handleInputChange.bind(this, field), rows: 5 });
					break;
				case "wysiwyg":
					input = React.createElement(_wysiwyg2.default, { key: this.props.id + "-wysiwyg-" + field.name, value: this.state.values[field.name + "_raw"], toolbar: field.toolbar, onChange: this.handleInputChange.bind(this, field), mentions: field.mentions, emoji: field.emoji });
					break;
				case "date":
					if (!value) value = "";else if (value !== "") {
						value = moment(value).format("DD/MM/YYYY");
					}
					input = React.createElement(_reactDatetime2.default, { key: this.props.id + "-date-" + field.name,
						value: value,
						dateFormat: "DD/MM/YYYY",
						onChange: this.handleInputChange.bind(this, field)
					});
					break;
				case "datehour":
					if (!value) value = "";else if (value !== "") {
						value = moment(value); //.format("DD/MM/YYYY HH:mm")
					}
					input = React.createElement(_dateHourPicker2.default, { key: this.props.id + "-date-hour-" + field.name,
						value: value,
						onlyHours: field.onlyHours,
						onChange: this.handleInputChange.bind(this, field)
					});
					break;
				case "color":
					input = React.createElement(_reactColor.SketchPicker, { color: value, onChangeComplete: this.handleInputChange.bind(this, field) });
					break;
				case "multiple-upload":
					input = React.createElement(_multipleUpload2.default, { key: this.props.id + "-multiple-upload-" + field.name, onChange: this.handleInputChange.bind(this, field), showZone: field.showZone, value: value, removeIcon: field.removeIcon, dropComponent: field.dropComponent, mode: field.mode });
					break;
				default:
					if (value == null) value = "";
					if (field.component) {
						input = React.createElement(field.component, { key: this.props.id + "-{field.component.name}-{field.name}", className: "form-control", field: field, name: fieldName, value: value, entity: this.state.values, onChange: this.handleInputChange.bind(this, field) });
					} else {
						input = React.createElement("input", { key: this.props.id + "-input-default-" + fieldName, className: "form-control", title: field.title, name: fieldName, id: fieldName, type: field.type, value: value, placeholder: field.placeholder, onChange: this.handleInputChange.bind(this, field) });
					}
					break;
			}

			return this.decorateInput(input, field);
		}
	}, {
		key: "decorateInput",
		value: function decorateInput(input, field) {
			var _this5 = this;

			var wrapper = function wrapper(children) {
				return React.createElement(
					"div",
					{ className: "form-group", key: _this5.props.id + "-field-" + field.name, style: field.inlineStyle },
					children
				);
			};
			if (field.wrapper) {
				wrapper = function wrapper(children) {
					return field.wrapper(children, field, _this5);
				};
			} else if (this.props.fieldWrapper) {
				wrapper = function wrapper(children) {
					return _this5.props.fieldWrapper(children, field, _this5);
				};
			}
			input = wrapper([field.label !== undefined && field.type !== "checkbox" && this.props.labels !== "off" && field.type !== "hidden" ? React.createElement(
				"label",
				{ key: "label-for-" + field.name, className: "control-label " + field.labelClassName, htmlFor: field.name },
				field.label
			) : null, input, field.label !== undefined && field.type == "checkbox" ? React.createElement(
				"label",
				{ key: "label-for-" + field.name, className: "control-label " + field.labelClassName, htmlFor: field.name },
				field.label
			) : null, this.state.errors[field.name] !== undefined ? React.createElement(
				"span",
				{ key: "error-for-" + field.name, className: "form-error" },
				this.state.errors[field.name].includes("_required") ? field.label + " est obligatoire" : this.state.errors[field.name]
			) : null]);

			return input;
		}
	}, {
		key: "handleInputChange",
		value: function handleInputChange(field, e) {
			var _this6 = this;

			if (Object.keys(this.state.values).length > 0) {
				var values = this.state.values;
				var value = e.target ? e.target.value : e;
				// if (field.name.indexOf("[") !== -1) {
				// 	var splitted = field.name.split("[")
				// 	var parentFieldName = splitted[0]
				// 	var index = splitted[1].replace(']', '')
				// 	var fieldName = splitted[2].replace(']', '')
				// 	values[parentFieldName][index][fieldName] = value
				// } else {
				// 	values[field.name] = value
				// }

				if (field.type !== "checkbox") {
					values[field.name] = value;
				}

				switch (field.type) {
					case "checkbox":
						values[field.name] = !values[field.name];
						break;
					case "radio":
						values[field.name] = value === "true" ? true : false;
						break;
					case "list-selector":
						values[field.name] = value;
						break;
					case "color":
						values[field.name] = value.hex;
						break;
					case "wysiwyg":
						values[field.name + "_raw"] = (0, _draftJs.convertToRaw)(value);
						values[field.name + "_html"] = (0, _draftJsExportHtml.stateToHTML)(value);
						break;
				}

				this.setState({ values: values }, function () {
					if (_this6.props.onInputChange) _this6.props.onInputChange(values);
				});
			}
		}
	}, {
		key: "handleCancelButton",
		value: function handleCancelButton() {
			if (this.props.onCancel) this.props.onCancel();
		}
	}, {
		key: "handleFormSubmit",
		value: function handleFormSubmit(e) {
			e.preventDefault();
			this.submit();
		}
	}, {
		key: "submit",
		value: function submit() {
			var extraData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var callback = arguments[1];

			var fields = this._getFields();
			var errors = this.validate();
			this.setState({ errors: errors });
			if (Object.keys(errors).length === 0) {
				var currentValues = extraData;

				for (var fIndex in fields) {
					if (fields[fIndex].type !== "image-uploader" && fields[fIndex].show !== false) {
						if (fields[fIndex].name.indexOf('[') !== -1) {
							var splitted = fields[fIndex].name.split("[");
							if (splitted.length === 2) {
								if (!currentValues[splitted[0]]) {
									currentValues[splitted[0]] = {};
								}
								currentValues[splitted[0]][splitted[1].replace(']', '')] = this.state.values[fields[fIndex].name];
							} else {
								if (!currentValues[splitted[0]]) {
									currentValues[splitted[0]] = {};
								}
								if (!currentValues[splitted[0]][splitted[2]]) {
									currentValues[splitted[0]][splitted[1].replace(']', '')] = {};
								}
								currentValues[splitted[0]][splitted[1]][splitted[2].replace(']', '')] = this.state.values[fields[fIndex].name];
							}
						} else {
							if (fields[fIndex].type == "wysiwyg") {
								currentValues[fields[fIndex].name + "_raw"] = this.state.values[fields[fIndex].name + "_raw"];
								currentValues[fields[fIndex].name + "_html"] = this.state.values[fields[fIndex].name + "_html"];
							} else {
								if (fields[fIndex].type == "datehour") {
									currentValues[fields[fIndex].name] = moment(this.state.values[fields[fIndex].name]).format("DD/MM/YYYY HH:mm");
								} else {
									if (fields[fIndex].type == "date") {
										currentValues[fields[fIndex].name] = moment(this.state.values[fields[fIndex].name]).format("DD/MM/YYYY") + " 00:00";
									} else {
										currentValues[fields[fIndex].name] = this.state.values[fields[fIndex].name];
									}
								}
							}
						}
					}
				}
				if (this.props.service !== undefined) {
					this.setState({ submitting: true, submitError: undefined }, function () {
						if (this.props.entityId !== undefined) {
							this.props.service.client[this.props.service.func](this.props.entityId, currentValues, this.handleFormSubmitted);
						} else {
							this.props.service.client[this.props.service.func](currentValues, this.handleFormSubmitted, this.props.offlineMode);
						}
					});
				}
				if (callback) {
					callback(currentValues);
				} else if (this.props.onSubmit) {
					this.props.onSubmit(currentValues);
				}
			} else {
				this.props.onSubmitError({ error: true, message: "Validation failed", errors: errors });
			}
		}
	}, {
		key: "handleFormSubmitted",
		value: function handleFormSubmitted(data) {
			if (!data.error) {
				this.setState({ submitError: undefined, submitting: false });
				if (this.props.onSubmitComplete) this.props.onSubmitComplete(data);
			} else {
				this.setState({ submitError: data.message !== undefined ? data.message : data.error, submitting: false });
				if (this.props.onSubmitError) this.props.onSubmitError(data);
			}
		}
	}, {
		key: "validate",
		value: function validate() {
			var textTypes = ["text", "password", "email"];
			var field = undefined,
			    errors = {};
			var fields = this._getFields();
			for (var index in fields) {
				field = fields[index];
				if (field.required && field.show !== false) {
					if (!field.displayIf || this.state.values[field.displayIf["name"]] == field.displayIf["value"]) {
						if (textTypes.indexOf(field.type) >= 0 && (this.state.values[field.name] === "" || this.state.values[field.name] === undefined)) {
							errors[field.name] = field.name + "_required";
						}
						if (field.type === "select" && (this.state.values[field.name] === -1 || this.state.values[field.name] === "-1")) {
							errors[field.name] = field.name + "_required";
						}
						if (field.type === "wysiwyg") {
							//&& this.state.values[field.name + "_html"] === undefined) {
							if (!this.state.values[field.name + "_raw"] || !(0, _draftJs.convertFromRaw)(this.state.values[field.name + "_raw"]).hasText()) {
								errors[field.name] = field.name + "_required";
							}
						}
					}
				}

				if (!errors[field.name]) {
					if (field.confirmFor) {
						if (this.state.values[field.name] !== this.state.values[field.confirmFor]) {
							errors[field.name] = field.name + "_does_not_match";
						}
					}
				}

				if (!errors[field.name]) {
					if (field.wanted) {
						if (this.state.values[field.name] !== field.wanted) {
							errors[field.name] = field.name + "_waiting_for_" + field.wanted;
						}
					}
				}
			}
			return errors;
		}
	}, {
		key: "getValue",
		value: function getValue(fieldName) {
			return this.state.values[fieldName];
		}
	}, {
		key: "reset",
		value: function reset() {
			var newValues = {};
			var fields = this._getFields();
			for (var key in fields) {
				if (fields[key].type == "wysiwyg") {
					newValues[fields[key].name + "_raw"] = "RESET";
				} else if (fields[key].type == "multiple-upload") {
					newValues[fields[key].name] = "RESET";
				} else if (fields[key].defaultValue) {
					newValues[fields[key].name] = fields[key].defaultValue;
				}
			}
			this.setState({ values: newValues });
		}
	}]);

	return Form;
}(React.Component);

function mapStateToProps(state) {
	return {
		clients: state.bootstrap.clients,
		reduxState: state
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, null, null, { withRef: true })(Form);