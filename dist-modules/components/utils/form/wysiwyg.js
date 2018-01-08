"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wysiwyg = function (_React$Component) {
  _inherits(Wysiwyg, _React$Component);

  function Wysiwyg(props) {
    _classCallCheck(this, Wysiwyg);

    var _this = _possibleConstructorReturn(this, (Wysiwyg.__proto__ || Object.getPrototypeOf(Wysiwyg)).call(this, props));

    _this.state = { editorState: _draftJs.EditorState.createEmpty() };
    return _this;
  }

  _createClass(Wysiwyg, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "a",
          { onClick: this._onBoldClick.bind(this) },
          "Bold"
        ),
        _react2.default.createElement(_draftJs.Editor, { editorState: this.state.editorState, onChange: this.onChange.bind(this) })
      );
    }
  }, {
    key: "onChange",
    value: function onChange(editorState) {
      this.setState({ editorState: editorState }, function () {
        console.log(this.state.editorState);
        console.log(editorState.getCurrentContent());
        console.log((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
        if (this.props.onChange) this.props.onChange("BLAPZ");
      });
    }
  }, {
    key: "_onBoldClick",
    value: function _onBoldClick(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
  }]);

  return Wysiwyg;
}(_react2.default.Component);

exports.default = Wysiwyg;