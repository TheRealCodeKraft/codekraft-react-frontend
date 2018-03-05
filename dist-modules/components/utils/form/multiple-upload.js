"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultipleUpload = function (_React$Component) {
  _inherits(MultipleUpload, _React$Component);

  function MultipleUpload(props) {
    _classCallCheck(this, MultipleUpload);

    var _this = _possibleConstructorReturn(this, (MultipleUpload.__proto__ || Object.getPrototypeOf(MultipleUpload)).call(this, props));

    _this.state = {
      files: []
    };
    return _this;
  }

  _createClass(MultipleUpload, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.value) {
        if (props.value == "RESET") {
          this.setState({ files: [] });
        } else if (this.state.files.length == 0) {
          this.setState({ files: props.value });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "multiple-upload" },
        _react2.default.createElement(
          "div",
          { className: "files" },
          this.state.files.map(function (file, index) {
            return _react2.default.createElement(
              "div",
              { className: "file-thumbnail" },
              _react2.default.createElement(
                "a",
                { onClick: _this2.handleRemove.bind(_this2, index) },
                _this2.props.removeIcon ? _this2.props.removeIcon : _react2.default.createElement("i", { className: "fa fa-remove" })
              ),
              _react2.default.createElement("img", { src: file.preview ? file.preview : file.file_url })
            );
          })
        ),
        this.props.showZone == undefined || this.props.showZone === true ? _react2.default.createElement(
          _reactDropzone2.default,
          {
            onDrop: this.handleDrop.bind(this),
            className: "multiple-upload-zone",
            activeClassName: "active-zone"
          },
          _react2.default.createElement(
            "span",
            null,
            "D\xE9posez des fichiers ici"
          ),
          _react2.default.createElement(
            "span",
            null,
            "ou cliquez pour s\xE9lectionner des fichiers"
          )
        ) : null
      );
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(acceptedFiles, rejectedFiles) {
      var _this3 = this;

      var files = this.state.files;
      for (var i in acceptedFiles) {
        files.push(acceptedFiles[i]);
      }
      this.setState({ files: files }, function () {
        _this3.props.onChange(_this3.state.files);
      });
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(index, e) {
      e.preventDefault();
      var files = this.state.files;
      files.splice(index, 1);
      this.setState({ files: files });
    }
  }]);

  return MultipleUpload;
}(_react2.default.Component);

exports.default = MultipleUpload;