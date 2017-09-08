'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _players = require('./tables-manager/players');

var _players2 = _interopRequireDefault(_players);

var _tables = require('./tables-manager/tables');

var _tables2 = _interopRequireDefault(_tables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TablesManager = function (_React$Component) {
  _inherits(TablesManager, _React$Component);

  function TablesManager() {
    _classCallCheck(this, TablesManager);

    return _possibleConstructorReturn(this, (TablesManager.__proto__ || Object.getPrototypeOf(TablesManager)).apply(this, arguments));
  }

  _createClass(TablesManager, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.entity.playable === "to_launch" || this.props.entity.playable === "pause" && this.props.entity.rounds.length == 1 && this.props.entity.current_step == "waiting_players" ? null : _react2.default.createElement(
          'div',
          { style: { display: "flex", alignItems: "center", marginBottom: 15 } },
          _react2.default.createElement('i', { className: 'pe pe-7s-attention text-warning', style: { fontSize: "4em", marginRight: 10 } }),
          _react2.default.createElement(
            'div',
            { style: { display: "flex", justifyContent: "center", flexDirection: "column" } },
            _react2.default.createElement(
              'strong',
              { style: { fontSize: "1.2em" } },
              'Attention, partie en cours. N\'ajoutez pas de nouveaux joueurs !'
            ),
            _react2.default.createElement(
              'p',
              null,
              'La suppression d\'un joueur de la session entrainera la suppression de toutes les donn\xE9es associ\xE9es (scores, objectifs, etc.)'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'session-player-form-container' },
          _react2.default.createElement(_players2.default, { session: this.props.entity, onFinished: this.handleFinished.bind(this) })
        )
      );

      {/*,
                   <div className="session-table-form-container">
                     <Tables session={this.props.entity} players={this.getAvailablePlayers()} />
                   </div>*/}
    }
  }, {
    key: 'getAvailablePlayers',
    value: function getAvailablePlayers() {
      return this.props.entity.players;
    }
  }, {
    key: 'handleFinished',
    value: function handleFinished() {
      this.props.onFinished();
    }
  }]);

  return TablesManager;
}(_react2.default.Component);

exports.default = TablesManager;