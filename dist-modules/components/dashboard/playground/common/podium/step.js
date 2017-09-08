"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PodiumStep = function (_React$Component) {
  _inherits(PodiumStep, _React$Component);

  function PodiumStep() {
    _classCallCheck(this, PodiumStep);

    return _possibleConstructorReturn(this, (PodiumStep.__proto__ || Object.getPrototypeOf(PodiumStep)).apply(this, arguments));
  }

  _createClass(PodiumStep, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "podium-box " + this.props.position },
        _react2.default.createElement(
          "div",
          { className: "podium-score" },
          this.props.state && this.props.state.score && (this.props.showTotals && this.props.state.score.total_ca || this.props.state.score.ca) ? this.props.state.player.firstname : "-"
        ),
        _react2.default.createElement(
          "div",
          { className: "podium-step" },
          _react2.default.createElement(
            "div",
            { className: "podium-ca" },
            this.props.state && this.props.state.score ?
            /*? (this.props.showTotals ? (this.props.state.score.total_ca === null ? "?" : this.props.state.score.total_ca) : this.props.state.score.ca) + "k€"*/
            this.props.showTotals ? (this.props.state.score.total_ca === null ? "?" : this.props.state.score.total_ca) + "k€" : this.props.state.score.ca ? this.props.state.score.ca + "k€" : "-" : "-"
          )
        )
      );
    }
  }]);

  return PodiumStep;
}(_react2.default.Component);

exports.default = PodiumStep;