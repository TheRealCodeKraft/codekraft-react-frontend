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

    _this.state = {
      loaded: false,
      raw: "",
      editorState: _draftJs.EditorState.createEmpty()
    };
    return _this;
  }

  _createClass(Wysiwyg, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.value && !this.state.raw) {
        this.setState({
          raw: props.value,
          editorState: _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(JSON.parse(props.value)))
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "editor-actions" },
          _react2.default.createElement(
            "a",
            { onClick: this._onBoldClick.bind(this) },
            _react2.default.createElement("i", { className: "fa fa-bold" })
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onItalicClick.bind(this) },
            _react2.default.createElement("i", { className: "fa fa-italic" })
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onH1Click.bind(this) },
            "H1"
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onH2Click.bind(this) },
            "H2"
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onH3Click.bind(this) },
            "H3"
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onH4Click.bind(this) },
            "H4"
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onH5Click.bind(this) },
            "H5"
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onH6Click.bind(this) },
            "H6"
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onUlClick.bind(this) },
            _react2.default.createElement("i", { className: "fa fa-list" })
          ),
          _react2.default.createElement(
            "a",
            { onClick: this._onOlClick.bind(this) },
            _react2.default.createElement("i", { className: "fa fa-list-ol" })
          )
        ),
        _react2.default.createElement(_draftJs.Editor, { editorState: this.state.editorState, onChange: this.onChange.bind(this) })
      );
    }
  }, {
    key: "onChange",
    value: function onChange(editorState) {
      this.setState({ editorState: editorState }, function () {
        if (this.props.onChange) this.props.onChange(editorState.getCurrentContent());
      });
    }
  }, {
    key: "_changeStyle",
    value: function _changeStyle(type) {
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, type));
    }
  }, {
    key: "_onBoldClick",
    value: function _onBoldClick(e) {
      e.preventDefault();
      this._changeStyle('BOLD');
    }
  }, {
    key: "_onItalicClick",
    value: function _onItalicClick(e) {
      e.preventDefault();
      this._changeStyle('ITALIC');
    }
  }, {
    key: "_onH1Click",
    value: function _onH1Click(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'header-one'));
    }
  }, {
    key: "_onH2Click",
    value: function _onH2Click(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'header-two'));
    }
  }, {
    key: "_onH3Click",
    value: function _onH3Click(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'header-three'));
    }
  }, {
    key: "_onH4Click",
    value: function _onH4Click(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'header-four'));
    }
  }, {
    key: "_onH5Click",
    value: function _onH5Click(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'header-five'));
    }
  }, {
    key: "_onH6Click",
    value: function _onH6Click(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'header-six'));
    }
  }, {
    key: "_onUlClick",
    value: function _onUlClick(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
    }
  }, {
    key: "_onOlClick",
    value: function _onOlClick(e) {
      e.preventDefault();
      this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
    }
  }]);

  return Wysiwyg;
}(_react2.default.Component);

exports.default = Wysiwyg;