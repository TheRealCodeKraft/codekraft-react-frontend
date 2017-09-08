"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _clue = require("clients/clue");

var _clue2 = _interopRequireDefault(_clue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Level = function (_React$Component) {
  _inherits(Level, _React$Component);

  function Level(props) {
    _classCallCheck(this, Level);

    var _this = _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).call(this, props));

    _this.state = {
      destroying: false
    };

    _this.goUp = _this.goUp.bind(_this);
    _this.goDown = _this.goDown.bind(_this);
    _this.onConfirmDestroy = _this.onConfirmDestroy.bind(_this);
    _this.onCancelDestroy = _this.onCancelDestroy.bind(_this);
    _this.onDestroy = _this.onDestroy.bind(_this);
    return _this;
  }

  _createClass(Level, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "clue-levels-level" },
        _react2.default.createElement(
          "div",
          { className: "up-and-down" },
          this.props.index !== 1 ? _react2.default.createElement(
            "a",
            { href: "#", onClick: this.goUp },
            _react2.default.createElement("span", { className: "pe-7s-angle-up" })
          ) : _react2.default.createElement("span", null),
          _react2.default.createElement(
            "span",
            { className: "level-level" },
            this.props.index
          ),
          this.props.last ? _react2.default.createElement("span", null) : _react2.default.createElement(
            "a",
            { href: "#", onClick: this.goDown },
            _react2.default.createElement("span", { className: "pe-7s-angle-down" })
          )
        ),
        _react2.default.createElement(
          "span",
          { className: "level-description", style: { display: "flex", alignItems: "center" } },
          this.props.level.description
        ),
        _react2.default.createElement(
          "div",
          { className: "level-actions", style: { display: "flex", alignItems: "center" } },
          this.state.destroying ? [_react2.default.createElement(
            "span",
            null,
            "S\xFBr ?"
          ), _react2.default.createElement("a", { className: "admin-action-button pe pe-7s-close-circle", href: "#", onClick: this.onCancelDestroy }), _react2.default.createElement("a", { className: "admin-action-button pe pe-7s-check", href: "#", onClick: this.onDestroy })] : _react2.default.createElement("a", { className: "admin-action-button pe pe-7s-junk", href: "#", alt: "Supprimer", title: "Supprimer", onClick: this.onConfirmDestroy })
        )
      );
    }
  }, {
    key: "goUp",
    value: function goUp(e) {
      e.preventDefault();
      if (!this.props.sorting && this.props.onUp) this.props.onUp(this.props.level.id);
    }
  }, {
    key: "goDown",
    value: function goDown(e) {
      e.preventDefault();
      if (!this.props.sorting && this.props.onDown) this.props.onDown(this.props.level.id);
    }
  }, {
    key: "onConfirmDestroy",
    value: function onConfirmDestroy(e) {
      e.preventDefault();
      this.setState({ destroying: true });
    }
  }, {
    key: "onCancelDestroy",
    value: function onCancelDestroy(e) {
      e.preventDefault();
      this.setState({ destroying: false });
    }
  }, {
    key: "onDestroy",
    value: function onDestroy(e) {
      e.preventDefault();
      var self = this;
      _clue2.default.destroyLevel(this.props.level.id, function (data) {
        self.setState({ destroying: false });
      });
    }
  }]);

  return Level;
}(_react2.default.Component);

exports.default = Level;