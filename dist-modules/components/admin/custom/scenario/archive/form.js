'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scenario = require('clients/scenario');

var _scenario2 = _interopRequireDefault(_scenario);

var _form = require('components/utils/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArchiveForm = function (_React$Component) {
  _inherits(ArchiveForm, _React$Component);

  function ArchiveForm(props) {
    _classCallCheck(this, ArchiveForm);

    var _this = _possibleConstructorReturn(this, (ArchiveForm.__proto__ || Object.getPrototypeOf(ArchiveForm)).call(this, props));

    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(ArchiveForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_form2.default, { id: 'scenario-archive-form',
        entityId: this.props.scenario.id,
        fields: [{
          "name": "vts_archive",
          "label": "Export Scorm VTS",
          "type": "image-uploader",
          "showImage": false,
          "accept": ".zip"
        }],
        values: this.props.scenario,
        submitLabel: 'none',
        service: { client: _scenario2.default, func: "update" },
        onSubmitComplete: this.handleSubmitComplete,
        submitClass: "btn btn-accent"
      });
    }
  }, {
    key: 'handleSubmitComplete',
    value: function handleSubmitComplete(data) {}
  }]);

  return ArchiveForm;
}(_react2.default.Component);

exports.default = ArchiveForm;