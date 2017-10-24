'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _game = require('clients/game');

var _game2 = _interopRequireDefault(_game);

var _game3 = require('./games/game');

var _game4 = _interopRequireDefault(_game3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Games = function (_React$Component) {
  _inherits(Games, _React$Component);

  function Games() {
    _classCallCheck(this, Games);

    return _possibleConstructorReturn(this, (Games.__proto__ || Object.getPrototypeOf(Games)).apply(this, arguments));
  }

  _createClass(Games, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _game2.default.games();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'games' },
        this.props.games.map(function (game) {
          return _react2.default.createElement(_game4.default, { key: "game-" + game.id, game: game });
        })
      );
    }
  }]);

  return Games;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    games: state.gameState.games || []
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Games);