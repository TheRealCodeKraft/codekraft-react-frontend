"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var AdminPageListHeader = function (_React$Component) {
  _inherits(AdminPageListHeader, _React$Component);

  function AdminPageListHeader(props) {
    _classCallCheck(this, AdminPageListHeader);

    var _this = _possibleConstructorReturn(this, (AdminPageListHeader.__proto__ || Object.getPrototypeOf(AdminPageListHeader)).call(this, props));

    _this.tableRowStyles = {
      display: "table-row",
      color: "#ffffff"
    };

    _this.tableCellStyles = {
      padding: 5
    };

    _this.tableCellActionStyles = JSON.parse(JSON.stringify(_this.tableCellStyles));
    _this.tableCellActionStyles.textAlign = "right";

    return _this;
  }

  _createClass(AdminPageListHeader, [{
    key: "render",
    value: function render() {
      var header = [],
          label = undefined;
      for (var attrIndex in this.props.attributes) {
        label = this.props.attributes[attrIndex];
        if (label instanceof Object) {
          if (label.hidden) continue;
          label = label.label;
        }
        header.push(React.createElement(
          "div",
          { key: "header-row-attr-" + attrIndex, style: this.tableCellStyles },
          label
        ));
      }
      header.push(React.createElement("div", { key: "header-row-attr-actions", style: this.tableCellActionsStyles }));
      return React.createElement(
        "div",
        { className: "admin-list-header", style: this.tableRowStyles },
        header
      );
    }
  }]);

  return AdminPageListHeader;
}(React.Component);

exports.default = AdminPageListHeader;