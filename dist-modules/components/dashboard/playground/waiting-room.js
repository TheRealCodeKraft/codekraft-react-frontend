'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _session = require('clients/session');

var _session2 = _interopRequireDefault(_session);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaitingRoom = function (_React$Component) {
  _inherits(WaitingRoom, _React$Component);

  function WaitingRoom(props) {
    _classCallCheck(this, WaitingRoom);

    var _this = _possibleConstructorReturn(this, (WaitingRoom.__proto__ || Object.getPrototypeOf(WaitingRoom)).call(this, props));

    _this.goToRoom = _this.goToRoom.bind(_this);

    return _this;
  }

  _createClass(WaitingRoom, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactBootstrap.Grid,
        { fluid: true },
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              'h2',
              null,
              _react2.default.createElement('i', { className: 'pe pe-7s-users text-warning' }),
              ' Joueurs ayant rejoint la session'
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              _reactBootstrap.Alert,
              { bsStyle: 'info' },
              _react2.default.createElement(
                'h4',
                null,
                'En attente'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Quand tous les joueurs seront pr\xEAts, vous pourrez cliquer sur le bouton "Pr\xEAts \xE0 jouer" qui appara\xEEtra.'
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              _reactBootstrap.Table,
              { responsive: true },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    null,
                    'Pseudo'
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    'Pr\xEAt'
                  )
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                this.props.session.players.map(function (player) {
                  /*if (player.id === this.props.me.id) return null*/
                  return _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      null,
                      player.shortname
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'statut' },
                      _this2.playerConnected(player) ? _react2.default.createElement('i', { className: 'pe pe-7s-check text-success' }) : null
                    )
                  );
                })
              )
            ),
            this.props.session.players.length === 1 || this.playersConnected() ? _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.goToRoom },
              'Pr\xEAts \xE0 jouer !'
            ) : null
          )
        )
      );
    }
  }, {
    key: 'playerConnected',
    value: function playerConnected(player) {
      return this.props.session.current_round.userStates.filter(function (state) {
        return state.user === player.id && state.connected;
      }).length > 0;
    }
  }, {
    key: 'playersConnected',
    value: function playersConnected() {
      return this.props.session.players.length === this.props.session.current_round.userStates.filter(function (state) {
        return state.connected;
      }).length;
    }
  }, {
    key: 'goToRoom',
    value: function goToRoom() {
      _session2.default.room(this.props.session.id);
    }
  }]);

  return WaitingRoom;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { SessionClient: _session2.default })(WaitingRoom);