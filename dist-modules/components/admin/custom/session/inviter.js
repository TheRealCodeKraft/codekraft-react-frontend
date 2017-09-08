'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _session = require('clients/session');

var _session2 = _interopRequireDefault(_session);

var _reactBootstrap = require('react-bootstrap');

var _reactMoment = require('react-moment');

var _reactMoment2 = _interopRequireDefault(_reactMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inviter = function (_React$Component) {
  _inherits(Inviter, _React$Component);

  function Inviter() {
    _classCallCheck(this, Inviter);

    return _possibleConstructorReturn(this, (Inviter.__proto__ || Object.getPrototypeOf(Inviter)).apply(this, arguments));
  }

  _createClass(Inviter, [{
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
                    'Nom'
                  ),
                  _react2.default.createElement(
                    'th',
                    null,
                    'Dernier envoi'
                  ),
                  _react2.default.createElement('th', null)
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement('td', null),
                  _react2.default.createElement('td', null),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      _reactBootstrap.Button,
                      { onClick: this.sendInvitationToAll.bind(this) },
                      'Inviter tout le monde'
                    )
                  )
                ),
                this.getPlayers().map(function (player) {
                  return _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      null,
                      player.fullname
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        _reactMoment2.default,
                        { format: 'DD/MM/YYYY HH:mm:ss' },
                        _this2.getLastUpdate(player)
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        _reactBootstrap.Button,
                        { onClick: _this2.sendInvitation.bind(_this2, player) },
                        'Inviter'
                      )
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getPlayers',
    value: function getPlayers() {
      return this.props.entity.players.sort(function (a, b) {
        if (a.firstname === null) return 1;
        if (b.firstname === null) return -1;
        return a.firstname > b.firstname;
      });
    }
  }, {
    key: 'getLastUpdate',
    value: function getLastUpdate(player) {
      var filter = this.props.entity.invitations.filter(function (invit) {
        return invit.user_id == player.id;
      });
      if (filter.length === 1) return filter[0].updated_at;else return null;
    }
  }, {
    key: 'sendInvitation',
    value: function sendInvitation(player) {
      _session2.default.invite(this.props.entity, player);
    }
  }, {
    key: 'sendInvitationToAll',
    value: function sendInvitationToAll() {
      _session2.default.inviteAll(this.props.entity);
    }
  }]);

  return Inviter;
}(_react2.default.Component);

exports.default = Inviter;