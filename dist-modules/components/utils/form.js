"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _reactColor = require("react-color");

var _draftJsExportHtml = require("draft-js-export-html");

var _draftJs = require("draft-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");


var moment = require("moment");

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      errors: {},
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
      for (var index in this.props.fields) {
        field = this.props.fields[index];
        if (field.values && field.values.targetState !== undefined) {
          if (this.props.reduxState[field.values.targetState][field.values.targetValue]) {
            loadedData[field.name] = this.props.reduxState[field.values.targetState][field.values.targetValue];
          } else {
            this.props.clients[field.values.client][field.values.func]();
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
          if (props.reduxState[current.values.targetState][current.values.targetValue]) {
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

      for (var index in props.fields) {
        if (props.values) {
          if (props.fields[index].name.indexOf("[") !== -1) {
            var splitted = props.fields[index].name.split('[');
            if (props.values[splitted[0]]) {
              if (splitted.length === 2) {
                currentValue = props.values[splitted[0]][splitted[1].replace(']', '')];
              } else {
                currentValue = props.values[splitted[0]][splitted[1].replace(']', '')][splitted[2].replace(']', '')];
              }
            } else {
              currentValue = undefined;
            }
          } else if (props.fields[index].type == "wysiwyg") {
            currentValue = props.values[props.fields[index].name + "_raw"];
            if (currentValue && !(currentValue instanceof Object) && !(currentValue == "")) {
              currentValue = JSON.parse(currentValue);
            }
            currentHtmlValue = props.values[props.fields[index].name + "_html"];
          } else {
            currentValue = props.values[props.fields[index].name];
          }
          if (currentValue instanceof Array && !props.fields[index].component && props.fields[index].type !== "multiple-upload") {
            currentValue = currentValue.map(function (value) {
              return value.id;
            });
          }
        } else {
          currentValue = props.fields[index].defaultValue;
        }

        if (props.fields[index].type == "wysiwyg") {
          valuesState[props.fields[index].name + "_raw"] = currentValue;
          valuesState[props.fields[index].name + "_html"] = currentHtmlValue;
        } else {
          valuesState[props.fields[index].name] = currentValue;
        }
      }

      this.setState({ values: valuesState });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var submitButton = this.state.submitting ? React.createElement("div", { className: "loader-dots" }) : this.props.hideSubmit !== true ? [React.createElement(
        "button",
        { type: "submit", className: this.props.submitClass },
        this.props.submitLabel !== undefined ? this.props.submitLabel : "Enregistrer"
      ), this.props.cancelButton === true ? React.createElement(
        "button",
        { className: this.props.submitClass, onClick: this.handleCancelButton },
        "Ignorer"
      ) : null] : null;

      return React.createElement(
        "div",
        { className: "form-container " + (this.props.className ? this.props.className : "") },
        this.props.entityId ? this.buildImageUploaders() : null,
        React.createElement(
          "form",
          { encType: "multipart/form-data", id: this.props.id, onSubmit: this.handleFormSubmit },
          this.props.fields.map(function (field) {
            if (field.show === false) {
              return null;
            }
            if (field.type === "image-uploader") {
              return null;
            }

            if (field.displayIf && _this2.state.values[field.displayIf.name] !== field.displayIf.value) {
              return null;
            }

            return _this2.getInputs(field);
          }),
          this.state.submitError ? [React.createElement(
            "span",
            null,
            this.state.submitError
          ), React.createElement("br", null)] : null,
          this.props.submitLabel !== "none" ? React.createElement(
            "div",
            { className: "submit-container" },
            submitButton
          ) : null
        )
      );
    }
  }, {
    key: "buildImageUploaders",
    value: function buildImageUploaders() {
      var _this3 = this;

      return this.props.fields.filter(function (field) {
        return field.type === "image-uploader";
      }).map(function (field) {
        return React.createElement(
          "form",
          { encType: "multipart/form-data", className: "upload-form" },
          field.showImage === undefined || field.showImage ? React.createElement("img", { src: _this3.state.values[field.name], className: "img-rounded", style: { width: 100 }, alt: _this3.state.values[field.name] }) : null,
          _this3.state.uploading[field.name] ? React.createElement(
            "span",
            { className: "upload-file" },
            "T\xE9l\xE9chargement en cours"
          ) : React.createElement(
            "div",
            { className: "upload-file" },
            React.createElement(_reactFileInput2.default, { name: "sheet",
              accept: field.accept !== undefined ? field.accept : ".png",
              placeholder: "Cliquer ici pour choisir un fichier",
              className: "form-control",
              onChange: _this3.handleFileChange.bind(_this3, field) })
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
    value: function getInputs(field) {
      var inputs = null;
      if (field.type === "component") {
        /*
        inputs = []
         if (field.multiple) {
          var occurences = field.occurences
          if (occurences.indexOf("/") !== -1) {
            var splitted = occurences.split("/")
            var dividing = parseInt(splitted[0])
            var key = splitted[1].replace(' ', '')
            occurences = dividing / this.state.values[key]
          } else {
            occurences = this.state.values[field.occurences]
          }
           var input = null
          for (var i=0; i < occurences; i++) {
            input = []
            for (var j in field.components) {
              field.components[j].name = field.name + "[" + i + "][" + field.components[j].name + "]"
              field.components[j].parent = field
              input.push(this.getInput(field.components[j]))
            }
            input = <div className={field.name}>{input}</div>
            inputs.push(input)
          }
        } else {
          var input = []
          for (var i in field.components) {
            input.push(this.getInput(field.components[i]))
          }
          input = <div className={field.name}>{input}</div>
          inputs.push(input)
        }
        */
        /*
              inputs = []
              for (var i=0; i < occurences; i++) {
                for (var component in field.components) {
                inputs.push(this.getInput(
                }
              }
        */
      } else {
        inputs = this.getInput(field);
      }
      return inputs;
    }
  }, {
    key: "getInput",
    value: function getInput(field) {
      var _this4 = this;

      var input = null,
          value = this.state.values[field.name],
          options = [];
      var fieldName = field.name;

      if (field.name.indexOf('[') !== -1) {
        var splitted = field.name.split('[');
        if (this.state.values[splitted[0]]) {
          value = this.state.values[splitted[0]][splitted[1].replace(']', '')][splitted[2].replace(']', '')];
        }
      }

      switch (field.type) {
        case "checkbox":
          input = React.createElement("input", { id: field.name, className: field.inputClass, title: field.title, name: fieldName, type: field.type, value: value === true ? "on" : "off", placeholder: field.placeholder, onChange: this.handleInputChange.bind(this, field) });
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
            { className: "form-control", title: field.title, name: fieldName, onChange: this.handleInputChange.bind(this, field), value: value },
            field.placeholder ? React.createElement(
              "option",
              { value: "-1" },
              field.placeholder
            ) : null,
            options.map(function (val) {
              var properties = {};
              if (val[field.key] === value) {
                properties.selected = "selected";
              }
              return React.createElement(
                "option",
                _extends({ value: val[field.key] }, properties),
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
          input = React.createElement(_listSelector2.default, { className: "form-control", field: field, defaultValue: value, options: options, tags: field.tags ? field.tags : false, onChange: this.handleInputChange.bind(this, field) });
          break;
        case "textarea":
          if (value == null) value = "";
          input = React.createElement("textarea", { className: "form-control", title: field.title, name: fieldName, value: value, placeholder: field.placeholder, onChange: this.handleInputChange.bind(this, field), rows: 5 });
          break;
        case "wysiwyg":
          input = React.createElement(_wysiwyg2.default, { value: this.state.values[field.name + "_raw"], toolbar: field.toolbar, onChange: this.handleInputChange.bind(this, field), mentions: field.mentions });
          break;
        case "date":
          if (!value) value = "";else if (value !== "") {
            value = moment(value).format("DD/MM/YYYY");
          }
          input = React.createElement(_reactDatetime2.default, { value: value,
            dateFormat: "DD/MM/YYYY",
            onChange: this.handleInputChange.bind(this, field)
          });
          break;
        case "datehour":
          if (!value) value = "";else if (value !== "") {
            value = moment(value); //.format("DD/MM/YYYY HH:mm")
          }
          input = React.createElement(_dateHourPicker2.default, {
            value: value,
            onChange: this.handleInputChange.bind(this, field)
          });
          break;
        case "color":
          input = React.createElement(_reactColor.SketchPicker, { color: value, onChangeComplete: this.handleInputChange.bind(this, field) });
          break;
        case "multiple-upload":
          input = React.createElement(_multipleUpload2.default, { onChange: this.handleInputChange.bind(this, field), showZone: field.showZone, value: value, removeIcon: field.removeIcon, dropComponent: field.dropComponent });
          break;
        default:
          if (value == null) value = "";
          if (field.component) {
            input = React.createElement(field.component, { className: "form-control", field: field, name: fieldName, value: value, onChange: this.handleInputChange.bind(this, field) });
          } else {
            input = React.createElement("input", { className: "form-control", title: field.title, name: fieldName, type: field.type, value: value, placeholder: field.placeholder, onChange: this.handleInputChange.bind(this, field) });
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
          { className: "form-group", key: _this5.props.id + "-field-" + field.name },
          children
        );
      };
      if (field.wrapper) {
        wrapper = field.wrapper;
      } else if (this.props.fieldWrapper) {
        wrapper = this.props.fieldWrapper;
      }
      input = wrapper([field.label !== undefined && field.type !== "checkbox" && this.props.labels !== "off" ? React.createElement(
        "label",
        { className: "control-label", htmlFor: field.name },
        field.label
      ) : null, input, field.label !== undefined && field.type == "checkbox" ? React.createElement(
        "label",
        { className: "control-label", htmlFor: field.name },
        field.label
      ) : null, this.state.errors[field.name] !== undefined ? React.createElement(
        "span",
        { className: "form-error" },
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
        /*
        if (field.name.indexOf("[") !== -1) {
          var splitted = field.name.split("[")
          var parentFieldName = splitted[0]
          var index = splitted[1].replace(']', '')
          var fieldName = splitted[2].replace(']', '')
          values[parentFieldName][index][fieldName] = value
        } else {*/
        values[field.name] = value;
        //}

        //console.log(value)

        switch (field.type) {
          case "checkbox":
            values[field.name] = value === "on" ? false : true;
            break;
          case "radio":
            values[field.name] = value === "true" ? true : false;
            break;
          case "list-selector":
            console.log("VALUE");
            console.log(value);
            values[field.name] = value;
            break;
          case "color":
            values[field.name] = value.hex;
            break;
          case "wysiwyg":
            values[field.name + "_raw"] = (0, _draftJs.convertToRaw)(value);
            values[field.name + "_html"] = (0, _draftJsExportHtml.stateToHTML)(value);
          default:
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

      var errors = this.validate();
      this.setState({ errors: errors });
      if (Object.keys(errors).length === 0) {
        var currentValues = extraData;

        for (var fIndex in this.props.fields) {
          if (this.props.fields[fIndex].type !== "image-uploader" && this.props.fields[fIndex].show !== false) {
            if (this.props.fields[fIndex].name.indexOf('[') !== -1) {
              var splitted = this.props.fields[fIndex].name.split("[");
              if (splitted.length === 2) {
                if (!currentValues[splitted[0]]) {
                  currentValues[splitted[0]] = {};
                }
                currentValues[splitted[0]][splitted[1].replace(']', '')] = this.state.values[this.props.fields[fIndex].name];
              } else {
                if (!currentValues[splitted[0]]) {
                  currentValues[splitted[0]] = {};
                }
                if (!currentValues[splitted[0]][splitted[2]]) {
                  currentValues[splitted[0]][splitted[1].replace(']', '')] = {};
                }
                currentValues[splitted[0]][splitted[1]][splitted[2].replace(']', '')] = this.state.values[this.props.fields[fIndex].name];
              }
            } else {
              if (this.props.fields[fIndex].type == "wysiwyg") {
                currentValues[this.props.fields[fIndex].name + "_raw"] = this.state.values[this.props.fields[fIndex].name + "_raw"];
                currentValues[this.props.fields[fIndex].name + "_html"] = this.state.values[this.props.fields[fIndex].name + "_html"];
              } else {
                if (this.props.fields[fIndex].type == "datehour") {
                  currentValues[this.props.fields[fIndex].name] = moment(this.state.values[this.props.fields[fIndex].name]).format("DD/MM/YYYY HH:mm");
                } else {
                  if (this.props.fields[fIndex].type == "date") {
                    currentValues[this.props.fields[fIndex].name] = moment(this.state.values[this.props.fields[fIndex].name]).format("DD/MM/YYYY") + " 00:00";
                  } else {
                    currentValues[this.props.fields[fIndex].name] = this.state.values[this.props.fields[fIndex].name];
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
        if (this.props.onSubmit) this.props.onSubmit(currentValues);
      } else {
        this.props.onSubmitError({ error: true, message: "Validation failed" });
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
      for (var index in this.props.fields) {
        field = this.props.fields[index];
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
      for (var key in this.props.fields) {
        if (this.props.fields[key].type == "wysiwyg") {
          newValues[this.props.fields[key].name + "_raw"] = "RESET";
        } else if (this.props.fields[key].type == "multiple-upload") {
          newValues[this.props.fields[key].name] = "RESET";
        } else if (this.props.fields[key].defaultValue) {
          newValues[this.props.fields[key].name] = this.props.fields[key].defaultValue;
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