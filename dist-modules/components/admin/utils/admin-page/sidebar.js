"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSidebar = require("react-sidebar");

var _reactSidebar2 = _interopRequireDefault(_reactSidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminSidebar = function (_React$Component) {
  _inherits(AdminSidebar, _React$Component);

  function AdminSidebar(props) {
    _classCallCheck(this, AdminSidebar);

    var _this = _possibleConstructorReturn(this, (AdminSidebar.__proto__ || Object.getPrototypeOf(AdminSidebar)).call(this, props));

    _this.state = {
      sidebarOpen: false
    };

    _this.handleSetSidebarOpen = _this.handleSetSidebarOpen.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  _createClass(AdminSidebar, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _reactSidebar2.default,
        { sidebar: this.getSidebarContent(),
          open: this.state.sidebarOpen,
          onSetOpen: this.handleSetSidebarOpen,
          rootClassName: "admin-sidebar",
          sidebarClassName: "admin-sidebar-container" + (this.props.tinify ? " tiny-sidebar" : ""),
          overlayClassName: "admin-sidebar-overlay",
          pullRight: true },
        _react2.default.createElement("span", null)
      );
    }
  }, {
    key: "getSidebarContent",
    value: function getSidebarContent() {
      return _react2.default.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", height: "100%" } },
        _react2.default.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, background: "#b53c3c", marginBottom: 20 } },
          _react2.default.createElement(
            "h3",
            { style: { textTransform: "uppercase" } },
            this.props.title
          ),
          _react2.default.createElement(
            "a",
            { href: "#", onClick: this.handleClose },
            _react2.default.createElement("i", { className: "fa fa-times text-warning", style: { color: "#ffffff", fontSize: "2em" } })
          )
        ),
        _react2.default.createElement(
          "div",
          { style: { flex: 1, height: "100%", overflow: "auto", padding: 20 } },
          this.props.children
        )
      );
    }
  }, {
    key: "open",
    value: function open() {
      this.setState({ sidebarOpen: true });
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({ sidebarOpen: false }, function () {
        if (this.props.onClose) this.props.onClose();
      });
    }
  }, {
    key: "handleSetSidebarOpen",
    value: function handleSetSidebarOpen(open) {
      if (!open) this.close();else this.open();
    }
  }, {
    key: "handleClose",
    value: function handleClose(e) {
      e.preventDefault();
      this.close();
    }
  }]);

  return AdminSidebar;
}(_react2.default.Component);

exports.default = AdminSidebar;