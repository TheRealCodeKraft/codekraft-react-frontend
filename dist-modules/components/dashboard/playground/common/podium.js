'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _step = require('./podium/step');

var _step2 = _interopRequireDefault(_step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Podium = function (_React$Component) {
  _inherits(Podium, _React$Component);

  function Podium() {
    _classCallCheck(this, Podium);

    return _possibleConstructorReturn(this, (Podium.__proto__ || Object.getPrototypeOf(Podium)).apply(this, arguments));
  }

  _createClass(Podium, [{
    key: 'render',
    value: function render() {
      var states = this.getPlayersStates();
      var styles = {};
      if (this.props.tinyfy) {
        styles.fontSize = "0.4em";
        styles.height = 50;
      }
      return _react2.default.createElement(
        'div',
        { className: 'podium', style: styles },
        _react2.default.createElement(_step2.default, { state: states[1], showTotals: this.props.showTotals, position: 'second' }),
        _react2.default.createElement(_step2.default, { state: states[0], showTotals: this.props.showTotals, position: 'first' }),
        _react2.default.createElement(_step2.default, { state: states[2], showTotals: this.props.showTotals, position: 'third' })
      );
    }
  }, {
    key: 'getPlayersStates',
    value: function getPlayersStates() {
      var _this2 = this;

      var position = "position";
      var round = this.props.round;
      if (!round) {
        round = this.props.session.current_round;
        position = "total_position";
      } else {
        if (this.props.showTotals) {
          position = "total_position";
        }
      }

      var states = round.userStates;
      if (this.props.room) {
        states = states.filter(function (state) {
          return state.room.id === _this2.props.room.id;
        });
        position = "room_position";
        if (this.props.scenario) {
          states = states.filter(function (state) {
            return state.scenario.id === _this2.props.scenario.id;
          });
          position = "table_position";
        }
      }

      return states.sort(function (a, b) {
        if (a.score === null || a.score[position] === null) return 1;else if (b.score === null || b.score[position] === null) return -1;else return a.score[position] < b.score[position] ? -1 : 1;
      });
    }
  }]);

  return Podium;
}(_react2.default.Component);

exports.default = Podium;