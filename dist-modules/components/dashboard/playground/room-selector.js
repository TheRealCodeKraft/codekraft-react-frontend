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

var _qrScanner = require('components/utils/qr-scanner');

var _qrScanner2 = _interopRequireDefault(_qrScanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoomSelector = function (_React$Component) {
  _inherits(RoomSelector, _React$Component);

  function RoomSelector(props) {
    _classCallCheck(this, RoomSelector);

    var _this = _possibleConstructorReturn(this, (RoomSelector.__proto__ || Object.getPrototypeOf(RoomSelector)).call(this, props));

    _this.state = {
      checking: false,
      error: false,
      value: ""
    };

    _this.handleQrScan = _this.handleQrScan.bind(_this);
    _this.checkReturn = _this.checkReturn.bind(_this);

    _this.goToScenarii = _this.goToScenarii.bind(_this);

    return _this;
  }

  _createClass(RoomSelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.roomChosen()) {
        var currentUserState = this.currentUserState();
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
                ' Joueur ayant rejoint votre salle'
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
                  'Quand tous les joueurs auront rejoint la salle, vous pourrez continuer en cliquant sur "Pr\xEAts \xE0 jouer".'
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
                  this.props.session.players.filter(function (player) {
                    var state = _this2.getUserState(player);
                    return state.room && state.room.id === currentUserState.room.id;
                  }).map(function (player) {
                    var state = _this2.getUserState(player);
                    //if (player.id === this.props.me.id) return null
                    return _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'td',
                        null,
                        player.firstname
                      ),
                      _react2.default.createElement(
                        'td',
                        { className: 'statut' },
                        state.room ? _react2.default.createElement('i', { className: 'pe pe-7s-check text-success' }) : null
                      )
                    );
                  })
                )
              ),
              this.props.session.players.length === 1 || this.playersOk() ? _react2.default.createElement(
                _reactBootstrap.Button,
                { onClick: this.goToScenarii },
                'Pr\xEAts \xE0 jouer !'
              ) : null
            )
          )
        );
      } else {
        return _react2.default.createElement(_qrScanner2.default, {
          title: 'Flash ici ta carte salle',
          description: 'La carte salle est la carte que tu as obtenue par tirage au sort.',
          error: this.state.error,
          errorMessage: this.state.errorMessage,
          onScan: this.handleQrScan,
          searching: this.state.checking
        });
      }
    }
  }, {
    key: 'currentUserState',
    value: function currentUserState() {
      return this.getUserState(this.props.me);
    }
  }, {
    key: 'getUserState',
    value: function getUserState(user) {
      return this.props.session.current_round.userStates.filter(function (state) {
        return state.user === user.id;
      })[0];
    }
  }, {
    key: 'playersOk',
    value: function playersOk() {
      var _this3 = this;

      return this.props.session.players.length === this.props.session.players.filter(function (player) {
        return _this3.getUserState(player).room;
      }).length;
    }
  }, {
    key: 'roomChosen',
    value: function roomChosen() {
      return this.currentUserState().room !== null;
    }
  }, {
    key: 'handleQrScan',
    value: function handleQrScan(data) {
      this.setState({ checking: true, value: data }, function () {
        _session2.default.checkCode(this.props.session.id, data, this.checkReturn);
      });
    }
  }, {
    key: 'checkReturn',
    value: function checkReturn(data) {
      if (data.result === "success") {
        _session2.default.pushInState(data.session);
        this.setState({ error: false, checking: false });
      } else {
        this.setState({ error: true, errorMessage: /*data.message*/"Veuillez utiliser une carte SALLE", checking: false });
      }
    }
  }, {
    key: 'goToScenarii',
    value: function goToScenarii() {
      _session2.default.scenario(this.props.session.id);
    }
  }]);

  return RoomSelector;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(RoomSelector);