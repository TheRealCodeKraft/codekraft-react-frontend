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

var CluesList = function (_React$Component) {
  _inherits(CluesList, _React$Component);

  function CluesList() {
    _classCallCheck(this, CluesList);

    return _possibleConstructorReturn(this, (CluesList.__proto__ || Object.getPrototypeOf(CluesList)).apply(this, arguments));
  }

  _createClass(CluesList, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.Table,
        { className: "indices" },
        _react2.default.createElement(
          "thead",
          null,
          _react2.default.createElement(
            "tr",
            null,
            _react2.default.createElement(
              "th",
              null,
              "Type"
            ),
            _react2.default.createElement(
              "th",
              null,
              "D\xE9cideur"
            ),
            _react2.default.createElement(
              "th",
              null,
              "Indice"
            )
          )
        ),
        _react2.default.createElement(
          "tbody",
          null,
          this.props.clues.map(function (clue) {
            return _react2.default.createElement(
              "tr",
              null,
              _react2.default.createElement(
                "td",
                null,
                clue.i18nfamily
              ),
              _react2.default.createElement(
                "td",
                null,
                "Tous"
              ),
              _react2.default.createElement(
                "td",
                null,
                clue.description
              )
            );
          })
        )
      );
    }
  }]);

  return CluesList;
}(_react2.default.Component);

exports.default = CluesList;