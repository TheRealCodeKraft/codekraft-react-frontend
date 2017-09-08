'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _players = require('./final-room/players');

var _players2 = _interopRequireDefault(_players);

var _scores = require('./common/scores');

var _scores2 = _interopRequireDefault(_scores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinalRoom = function (_React$Component) {
  _inherits(FinalRoom, _React$Component);

  function FinalRoom() {
    _classCallCheck(this, FinalRoom);

    return _possibleConstructorReturn(this, (FinalRoom.__proto__ || Object.getPrototypeOf(FinalRoom)).apply(this, arguments));
  }

  _createClass(FinalRoom, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_scores2.default, { session: this.props.session, me: this.props.me }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_players2.default, { title: 'Classement provisoire', session: this.props.session, me: this.props.me })
      );
    }
  }]);

  return FinalRoom;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FinalRoom);