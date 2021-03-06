"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _form = require("../../../utils/form");

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var CreateEditForm = function (_React$Component) {
  _inherits(CreateEditForm, _React$Component);

  function CreateEditForm(props) {
    _classCallCheck(this, CreateEditForm);

    var _this = _possibleConstructorReturn(this, (CreateEditForm.__proto__ || Object.getPrototypeOf(CreateEditForm)).call(this, props));

    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(CreateEditForm, [{
    key: "render",
    value: function render() {
      return React.createElement(_form2.default, { id: this.props.client.name + "-form",
        entityId: this.props.entity ? this.props.entity.id : undefined,
        fields: this.props.form.attributes,
        fieldWrapper: this.props.form.fieldWrapper,
        values: this.props.entity,
        submitLabel: this.props.form.submitLabel ? this.props.form.submitLabel : "Enregistrer",
        service: { client: this.props.client, func: this.props.mode === "edit" ? "update" : "create" },
        onSubmitComplete: this.handleSubmitComplete,
        submitClass: "btn btn-accent"
      });
    }
  }, {
    key: "handleSubmitComplete",
    value: function handleSubmitComplete(data) {
      if (this.props.onSubmitComplete) this.props.onSubmitComplete(data);
    }
  }]);

  return CreateEditForm;
}(React.Component);

exports.default = CreateEditForm;