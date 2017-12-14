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

var _reactFileInput = require("react-file-input");

var _reactFileInput2 = _interopRequireDefault(_reactFileInput);

var _reactColor = require("react-color");

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
          loadingData = [];
      for (var index in this.props.fields) {
        field = this.props.fields[index];
        if (field.values && field.values.targetState !== undefined) {
          this.props.clients[field.values.client][field.values.func]();
          loadingData.push(field);
        }
      }

      if (loadingData.length > 0) {
        this.setState({ loadingData: loadingData });
      } else {
        this.loadValuesState();
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
        this.setState({ loadingData: loadingData, loadedData: loadedData }, function () {
          if (this.state.loadingData.length === 0) {
            this.loadValuesState();
          }
        });
      } else {
        this.loadValuesState();
      }
    }
  }, {
    key: "loadValuesState",
    value: function loadValuesState() {
      var valuesState = {};
      var currentValue = undefined;

      for (var index in this.props.fields) {
        if (this.props.values) {
          if (this.props.fields[index].name.indexOf("[") !== -1) {
            var splitted = this.props.fields[index].name.split('[');
            if (this.props.values[splitted[0]]) {
              if (splitted.length === 2) {
                currentValue = this.props.values[splitted[0]][splitted[1].replace(']', '')];
              } else {
                currentValue = this.props.values[splitted[0]][splitted[1].replace(']', '')][splitted[2].replace(']', '')];
              }
            } else {
              currentValue = undefined;
            }
          } else {
            currentValue = this.props.values[this.props.fields[index].name];
          }
          if (currentValue instanceof Array) {
            currentValue = currentValue.map(function (value) {
              return value.id;
            });
          }
        } else {
          currentValue = this.props.fields[index].defaultValue;
        }

        valuesState[this.props.fields[index].name] = currentValue;
      }
      console.log(valuesState);

      this.setState({ values: valuesState });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var submitButton = this.state.submitting ? React.createElement("div", { className: "loader-dots" }) : [React.createElement(
        "button",
        { type: "submit", className: this.props.submitClass },
        this.props.submitLabel ? this.props.submitLabel : "Enregistrer"
      ), this.props.cancelButton === true ? React.createElement(
        "button",
        { className: this.props.submitClass, onClick: this.handleCancelButton },
        "Ignorer"
      ) : null];

      return React.createElement(
        "div",
        { className: "form-container" },
        this.props.entityId ? this.buildImageUploaders() : null,
        React.createElement(
          "form",
          { id: this.props.id, onSubmit: this.handleFormSubmit },
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
          this.props.submitLabel !== "none" ? submitButton : null
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
    value: function handleFileChanged(field) {
      var uploading = this.state.uploading;
      uploading[field.name] = false;
      this.setState({ uploading: uploading });
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
          console.log(value);
          input = React.createElement(_reactBootstrapSwitch2.default, { title: field.title, name: fieldName, onChange: this.handleInputChange.bind(this, field, !this.state.values[field.name]), onText: "OUI", offText: "NON", value: value, defaultValue: field.defaultValue, bsSize: "mini" });
          break;
        case "select":
          if (field.values instanceof Array) {
            options = field.values;
          } else if (field.values instanceof Object) {
            options = this.state.loadedData[field.name] || [];
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
                properties.selecTed = "selected";
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
        case "date":
          if (!value) value = "";else if (value !== "") {
            value = moment(value).format("DD/MM/YYYY");
          }
          input = React.createElement(_reactDatetime2.default, { value: value,
            dateFormat: "DD/MM/YYYY",
            onChange: this.handleInputChange.bind(this, field)
          });
          break;
        case "color":
          input = React.createElement(_reactColor.SketchPicker, { color: value, onChangeComplete: this.handleInputChange.bind(this, field) });
          break;
        default:
          if (value == null) value = "";
          input = React.createElement("input", { className: "form-control", title: field.title, name: fieldName, type: field.type, value: value, placeholder: field.placeholder, onChange: this.handleInputChange.bind(this, field) });
          break;
      }

      return this.decorateInput(input, field);
    }
  }, {
    key: "decorateInput",
    value: function decorateInput(input, field) {
      input = React.createElement(
        "div",
        { className: "form-group", key: this.props.id + "-field-" + field.name },
        field.label !== undefined && field.type !== "checkbox" && this.props.labels !== "off" ? React.createElement(
          "label",
          { className: "control-label", htmlFor: field.name },
          field.label
        ) : null,
        input,
        field.label !== undefined && field.type == "checkbox" ? React.createElement(
          "label",
          { className: "control-label", htmlFor: field.name },
          field.label
        ) : null,
        this.state.errors[field.name] !== undefined ? React.createElement(
          "span",
          { className: "form-error" },
          this.state.errors[field.name]
        ) : null
      );

      return input;
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(field, e) {
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

      switch (field.type) {
        case "checkbox":
          values[field.name] = value === "on" ? false : true;
          break;
        case "radio":
          values[field.name] = value === "true" ? true : false;
          break;
        case "list-selector":
          values[field.name] = value;
          break;
        case "color":
          console.log(value.hex);
          values[field.name] = value.hex;
        default:
          break;
      }
      this.setState({ values: values });
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

      var errors = this.validate();
      this.setState({ errors: errors });
      if (Object.keys(errors).length === 0) {
        var currentValues = {};

        for (var fIndex in this.props.fields) {
          if (this.props.fields[fIndex].type !== "image-uploader" && this.props.fields[fIndex].show !== false) {
            if (this.props.fields[fIndex].name.indexOf('[') !== -1) {
              var splitted = this.props.fields[fIndex].name.split("[");
              if (splitted.length === 2) {
                currentValues[splitted[0] + "_" + splitted[1].replace(']', '')] = this.state.values[this.props.fields[fIndex].name];
              } else {
                currentValues[splitted[0]] = {};
                currentValues[splitted[0]][splitted[1].replace(']', '') + "_" + splitted[2].replace(']', '')] = this.state.values[this.props.fields[fIndex].name];
              }
            } else {
              currentValues[this.props.fields[fIndex].name] = this.state.values[this.props.fields[fIndex].name];
            }
          }
        }
        if (this.props.service !== undefined) {
          this.setState({ submitting: true, submitError: undefined }, function () {
            if (this.props.entityId !== undefined) {
              this.props.service.client[this.props.service.func](this.props.entityId, currentValues, this.handleFormSubmitted);
            } else {
              this.props.service.client[this.props.service.func](currentValues, this.handleFormSubmitted);
            }
          });
        }
        if (this.props.onSubmit) this.props.onSubmit(currentValues);
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
  }]);

  return Form;
}(React.Component);

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    reduxState: state
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Form);