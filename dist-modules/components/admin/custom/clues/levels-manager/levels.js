'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clue = require('clients/clue');

var _clue2 = _interopRequireDefault(_clue);

var _level = require('./levels/level.js');

var _level2 = _interopRequireDefault(_level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Levels = function (_React$Component) {
  _inherits(Levels, _React$Component);

  function Levels(props) {
    _classCallCheck(this, Levels);

    var _this = _possibleConstructorReturn(this, (Levels.__proto__ || Object.getPrototypeOf(Levels)).call(this, props));

    _this.state = {
      sorting: false
    };

    _this.onUp = _this.onUp.bind(_this);
    _this.onDown = _this.onDown.bind(_this);
    _this.onSorted = _this.onSorted.bind(_this);
    return _this;
  }

  _createClass(Levels, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'clue-levels-list-container' },
        this.props.clue.levels.map(function (level, index) {
          return _react2.default.createElement(_level2.default, { level: level,
            index: index + 1,
            last: index === _this2.props.clue.levels.length - 1,
            sorting: _this2.state.sorting,
            onUp: _this2.onUp,
            onDown: _this2.onDown });
        })
      );
    }
  }, {
    key: 'onUp',
    value: function onUp(level_id) {
      this.setState({ sorting: true }, function () {
        _clue2.default.sortLevels(this.props.clue.id, level_id, "up", this.onSorted);
      });
    }
  }, {
    key: 'onDown',
    value: function onDown(level_id) {
      this.setState({ sorting: true }, function () {
        _clue2.default.sortLevels(this.props.clue.id, level_id, "down", this.onSorted);
      });
    }
  }, {
    key: 'onSorted',
    value: function onSorted() {
      this.setState({ sorting: false });
    }
  }]);

  return Levels;
}(_react2.default.Component);

exports.default = Levels;