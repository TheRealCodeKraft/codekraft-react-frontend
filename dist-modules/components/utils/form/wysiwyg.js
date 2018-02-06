"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJsPluginsEditor = require("draft-js-plugins-editor");

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJs = require("draft-js");

var _draftJsStaticToolbarPlugin = require("draft-js-static-toolbar-plugin");

var _draftJsStaticToolbarPlugin2 = _interopRequireDefault(_draftJsStaticToolbarPlugin);

var _draftJsLinkifyPlugin = require("draft-js-linkify-plugin");

var _draftJsLinkifyPlugin2 = _interopRequireDefault(_draftJsLinkifyPlugin);

var _draftJsMentionPlugin = require("draft-js-mention-plugin");

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

var _draftJsButtons = require("draft-js-buttons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var editorStyles = {
  editor: {
    boxSizing: "border-box",
    border: "1px solid #ddd",
    cursor: "text",
    padding: "16px",
    borderRadius: "2px",
    marginBottom: "2em",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB",
    background: "#fefefe",
    minHeight: "140px"
  },

  headlineButtonWrapper: {
    display: "inline-block"
  },

  headlineButton: {
    background: "#fbfbfb",
    color: "#888",
    fontSize: "18px",
    border: "0",
    paddingTop: "5px",
    verticalAlign: "bottom",
    height: "34px",
    width: "36px"
  }

  /*
  .headlineButton:hover,
  .headlineButton:focus {
    background: #f3f3f3;
  }
  */
};

var HeadlinesPicker = function (_React$Component) {
  _inherits(HeadlinesPicker, _React$Component);

  function HeadlinesPicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HeadlinesPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeadlinesPicker.__proto__ || Object.getPrototypeOf(HeadlinesPicker)).call.apply(_ref, [this].concat(args))), _this), _this.onWindowClick = function () {
      return (
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        _this.props.onOverrideContent(undefined)
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HeadlinesPicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        window.addEventListener('click', _this2.onWindowClick);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.onWindowClick);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var buttons = [_draftJsButtons.HeadlineOneButton, _draftJsButtons.HeadlineTwoButton, _draftJsButtons.HeadlineThreeButton];
      return _react2.default.createElement(
        "div",
        null,
        buttons.map(function (Button, i) {
          return (// eslint-disable-next-line
            _react2.default.createElement(Button, _extends({ key: i }, _this3.props))
          );
        })
      );
    }
  }]);

  return HeadlinesPicker;
}(_react2.default.Component);

var HeadlinesButton = function (_React$Component2) {
  _inherits(HeadlinesButton, _React$Component2);

  function HeadlinesButton() {
    var _ref2;

    var _temp2, _this4, _ret2;

    _classCallCheck(this, HeadlinesButton);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref2 = HeadlinesButton.__proto__ || Object.getPrototypeOf(HeadlinesButton)).call.apply(_ref2, [this].concat(args))), _this4), _this4.onClick = function () {
      return (
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        _this4.props.onOverrideContent(HeadlinesPicker)
      );
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  _createClass(HeadlinesButton, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { style: editorStyles.headlineButtonWrapper },
        _react2.default.createElement(
          "button",
          { onClick: this.onClick },
          "H"
        )
      );
    }
  }]);

  return HeadlinesButton;
}(_react2.default.Component);

var toolbarPlugin = (0, _draftJsStaticToolbarPlugin2.default)({
  structure: [_draftJsButtons.BoldButton, _draftJsButtons.ItalicButton, _draftJsButtons.UnderlineButton, _draftJsButtons.CodeButton, _draftJsStaticToolbarPlugin.Separator, HeadlinesButton, _draftJsButtons.UnorderedListButton, _draftJsButtons.OrderedListButton, _draftJsButtons.BlockquoteButton, _draftJsButtons.CodeBlockButton]
});
var Toolbar = toolbarPlugin.Toolbar;


var linkifyPlugin = (0, _draftJsLinkifyPlugin2.default)({
  target: '_blank' // default is '_self'
});

var mentionPlugin = (0, _draftJsMentionPlugin2.default)();
var MentionSuggestions = mentionPlugin.MentionSuggestions;


var plugins = [toolbarPlugin, linkifyPlugin, mentionPlugin];

var Wysiwyg = function (_React$Component3) {
  _inherits(Wysiwyg, _React$Component3);

  function Wysiwyg(props) {
    _classCallCheck(this, Wysiwyg);

    var _this5 = _possibleConstructorReturn(this, (Wysiwyg.__proto__ || Object.getPrototypeOf(Wysiwyg)).call(this, props));

    _this5.onSearchChange = function (_ref3) {
      var value = _ref3.value;

      _this5.setState({ suggestions: (0, _draftJsMentionPlugin.defaultSuggestionsFilter)(value, _this5.props.mentions) });
    };

    _this5.onAddMention = function () {
      if (_this5.props.onChange) _this5.props.onChange(_this5.state.editorState.getCurrentContent());
    };

    _this5.state = {
      loaded: false,
      raw: "",
      editorState: _draftJs.EditorState.createEmpty(),
      suggestions: null
    };
    return _this5;
  }

  _createClass(Wysiwyg, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.value && (!this.state.raw || props.value == "RESET")) {
        var editorState;
        if (props.value == "RESET") {
          editorState = _draftJs.EditorState.createEmpty();
        } else {
          editorState = _draftJs.EditorState.create({ currentContent: (0, _draftJs.convertFromRaw)(props.value), selection: this.state.editorState.getSelection() });
        }

        this.setState({
          raw: props.value,
          editorState: editorState
        });
      }
      if (props.mentions && !this.state.suggestions) {
        this.setState({ suggestions: props.mentions });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_draftJsPluginsEditor2.default, { editorState: this.state.editorState, onChange: this.onChange.bind(this), plugins: plugins }),
        this.props.toolbar && this.props.toolbar === false ? null : _react2.default.createElement(Toolbar, null),
        this.props.mentions && this.props.mentions.length > 0 ? _react2.default.createElement(MentionSuggestions, {
          onSearchChange: this.onSearchChange.bind(this),
          suggestions: this.state.suggestions,
          onAddMention: this.onAddMention.bind(this)
        }) : null
      );
    }
  }, {
    key: "onChange",
    value: function onChange(editorState) {
      this.setState({ editorState: editorState }, function () {
        if (this.props.onChange) this.props.onChange(editorState.getCurrentContent());
      });
    }
  }]);

  return Wysiwyg;
}(_react2.default.Component);

exports.default = Wysiwyg;