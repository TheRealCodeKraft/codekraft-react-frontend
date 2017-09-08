"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseItem = function (_React$Component) {
  _inherits(BaseItem, _React$Component);

  function BaseItem(props) {
    _classCallCheck(this, BaseItem);

    var _this = _possibleConstructorReturn(this, (BaseItem.__proto__ || Object.getPrototypeOf(BaseItem)).call(this, props));

    _this.state = {
      open: false
    };

    _this.handleToggle = _this.handleToggle.bind(_this);
    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(BaseItem, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.Row,
        { className: "profile-field" },
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2.default.createElement(
            _reactBootstrap.Panel,
            { header: this.buildHeader(), collapsible: true, expanded: this.state.open, className: "panel-profile" + (this.state.open ? " panel-filled" : ""), bsStyle: "" },
            this.buildFullContent()
          )
        )
      );
    }
  }, {
    key: "buildHeader",
    value: function buildHeader() {
      var header = [];
      header.push(_react2.default.createElement(
        "div",
        { className: "panel-tools" },
        _react2.default.createElement(
          "a",
          { href: "#", className: "panel-toggle-profile", onClick: this.handleToggle },
          this.state.open ? _react2.default.createElement("i", { className: "fa fa-times text-warning" }) : _react2.default.createElement("i", { className: "fa fa-pencil text-warning" })
        )
      ));
      header.push(this.label);
      header.push(!this.state.opened ? _react2.default.createElement(
        "div",
        null,
        this.buildValue()
      ) : null);
      return header;
    }
  }, {
    key: "buildValue",
    value: function buildValue() {
      return this.props.value ? this.props.value : "Non renseigné";
    }
  }, {
    key: "buildFullContent",
    value: function buildFullContent() {
      return _react2.default.createElement(
        "span",
        null,
        "Full content not built"
      );
    }
  }, {
    key: "handleToggle",
    value: function handleToggle(e) {
      e.preventDefault();
      this.setState({ open: !this.state.open });
    }
  }, {
    key: "handleSubmitComplete",
    value: function handleSubmitComplete(data) {
      this.setState({ open: false });
    }
  }]);

  return BaseItem;
}(_react2.default.Component);

exports.default = BaseItem;